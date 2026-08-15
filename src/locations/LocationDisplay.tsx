import { useEffect, useState } from "react";
import { stringifyLocations, type Location } from "./data";
import PriorityTable from "./PriorityTable";
import Table from "./Table";

export default function LocationDisplay({
  locations,
}: {
  locations: Location[];
}) {
  const [, setTick] = useState(0);
  const [priorityItems, items] = stringifyLocations(locations);

  // Tick every second to update timers
  useEffect(() => {
    const id = setInterval(() => {
      setTick((tick) => tick + 1);
    }, 1000);
    return () => clearInterval(id);
  });

  return (
    <div style={{ display: "flex", gap: 50 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          maxHeight: "min-content",
          borderStyle: "solid",
          borderWidth: 2,
          padding: 10,
        }}
      >
        <span style={{ fontSize: 32 }}>Active</span>
        <div style={{ overflowY: "auto" }}>
          <PriorityTable priorityItems={priorityItems} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          minHeight: 0,
          maxHeight: "min-content",
          borderStyle: "solid",
          borderWidth: 2,
          padding: 10,
        }}
      >
        <span style={{ fontSize: 32 }}>Pending</span>
        <div style={{ overflowY: "auto", height: "stretch" }}>
          <Table items={items} />
        </div>
      </div>
    </div>
  );
}
