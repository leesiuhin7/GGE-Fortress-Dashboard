export interface LocationId {
  kingdomId: number;
  x: number;
  y: number;
}

export function serializeId({ kingdomId, x, y }: LocationId): string {
  return JSON.stringify([kingdomId, x, y]);
}

export function deserializeId(stringId: string): LocationId {
  const [kingdomId, x, y] = JSON.parse(stringId);
  return { kingdomId, x, y };
}
