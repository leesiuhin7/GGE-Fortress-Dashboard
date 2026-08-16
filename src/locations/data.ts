import { serializeId } from "./id";

export interface Location {
  x: number;
  y: number;
  kingdomId: number;
  time: number;
}

export function deserialize(data: string): Location[] | undefined {
  let obj;
  try {
    obj = JSON.parse(data);
  } catch {
    return undefined;
  }
  if (!Array.isArray(obj)) {
    return undefined;
  }

  return obj
    .filter(Array.isArray)
    .map(([x, y, kingdomId, time]): Location | undefined => {
      if (
        typeof x === "number" &&
        typeof y === "number" &&
        typeof kingdomId === "number" &&
        typeof time === "number"
      ) {
        return {
          x,
          y,
          kingdomId,
          time,
        };
      }
    })
    .filter((value) => value !== undefined);
}

function padNumber(num: number, digits: number): string {
  return String(num).padStart(digits, "0");
}

function formatDuration(duration: number): string | undefined {
  if (duration < 0) {
    return undefined;
  }

  const h = padNumber(Math.floor(duration / 3600) % 24, 2);
  const m = padNumber(Math.floor(duration / 60) % 60, 2);
  const s = padNumber(Math.floor(duration) % 60, 2);

  if (duration < 86400) {
    return `${h}:${m}:${s}`;
  } else {
    const d = Math.floor(duration / 86400);
    return `${d}:${h}:${m}:${s}`;
  }
}

function formatDate(date: Date): string {
  const month = padNumber(date.getMonth(), 2);
  const day = padNumber(date.getDay(), 2);
  const hours = padNumber(date.getHours(), 2);
  const minutes = padNumber(date.getMinutes(), 2);
  const seconds = padNumber(date.getSeconds(), 2);
  return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const kingdomIdMap: Readonly<Record<number, string | undefined>> = {
  0: "The Great Empire",
  1: "The Burning Sands",
  2: "The Everwinter Glacier",
  3: "The Fire Peaks",
  4: "The Storm Islands",
};

export function stringifyKingdomId(kingdomId: number): string {
  return kingdomIdMap[kingdomId] ?? "Unknown";
}

export function formatPosition(x: number, y: number): string {
  return `${x}:${y}`;
}

export interface Item {
  id: string;
  time: string;
  cooldown: string;
  kingdom: string;
  position: string;
}

export interface PriorityItem {
  id: string;
  age: string;
  kingdom: string;
  position: string;
}

export function stringifyLocations(
  locations: Location[],
): [PriorityItem[], Item[]] {
  const currentTime = Date.now() / 1000; // Convert to seconds

  const priorityItems: PriorityItem[] = locations
    .filter(({ time }) => time < currentTime)
    .sort((location1, location2) => {
      return (
        location1.kingdomId - location2.kingdomId ||
        // Distance from the center of the map
        Math.hypot(location1.x - 643, location1.y - 643) -
          Math.hypot(location2.x - 643, location2.y - 643)
      );
    })
    .map(({ x, y, kingdomId, time }) => ({
      id: serializeId({ kingdomId, x, y }),
      age: formatDuration(currentTime - time)!,
      kingdom: stringifyKingdomId(kingdomId),
      position: formatPosition(x, y),
    }));

  const items: Item[] = locations
    .filter(({ time }) => time >= currentTime)
    .sort(({ time: a }, { time: b }) => a - b)
    .map(({ x, y, kingdomId, time }) => ({
      id: serializeId({ kingdomId, x, y }),
      time: formatDate(new Date(time * 1000)),
      cooldown: formatDuration(time - currentTime)!,
      kingdom: stringifyKingdomId(kingdomId),
      position: formatPosition(x, y),
    }));

  return [priorityItems, items];
}
