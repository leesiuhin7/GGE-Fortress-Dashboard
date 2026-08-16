import { useState } from "react";
import { formatPosition, stringifyKingdomId } from "./data";
import { deserializeId } from "./id";

export default function IgnoreSettings({
  id,
  onUpdate,
}: {
  id: string;
  onUpdate: (id: string, duration: number) => void;
}) {
  const [duration, setDuration] = useState(0);
  const { kingdomId, x, y } = deserializeId(id);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 50,
        borderStyle: "solid",
        borderWidth: 2,
        padding: 10,
      }}
    >
      <span style={{ display: "flex", gap: 20, fontSize: 32 }}>
        <span>{stringifyKingdomId(kingdomId)}</span>
        <span>{formatPosition(x, y)}</span>
      </span>
      <span>
        <input
          type="number"
          value={duration}
          onChange={(event) =>
            setDuration(Math.max(Number(event.target.value), 0))
          }
          style={{ width: "4em", fontSize: 20 }}
        ></input>
        <span style={{ paddingLeft: 5, paddingRight: 20 }}>hours</span>
        <button
          onClick={() => onUpdate(id, duration * 3600000)}
          style={{ fontSize: 20 }}
        >
          Set ignore duration
        </button>
      </span>
    </div>
  );
}
