import { useEffect, useState } from "react";
import { stringifyLocations, type Location } from "./data";
import IgnoreManager from "./ignore";
import IgnoreSettings from "./IgnoreSettings";
import styles from "./LocationDisplay.module.css";
import PriorityTable from "./PriorityTable";
import Table from "./Table";

export default function LocationDisplay({
  locations,
}: {
  locations: Location[];
}) {
  const [, setTick] = useState(0);
  const [ignoreManager, setIgnoreManager] = useState(() => {
    const manager = new IgnoreManager();
    manager.load();
    return manager;
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [priorityItems, items] = stringifyLocations(locations);

  // Tick every second to update timers
  useEffect(() => {
    const id = setInterval(() => {
      setTick((tick) => tick + 1);
    }, 1000);
    return () => clearInterval(id);
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        height: "stretch",
      }}
    >
      {selectedId !== null && (
        <IgnoreSettings
          id={selectedId}
          onUpdate={(id, duration) => {
            const manager = ignoreManager.clone();
            manager.updateDuration(id, duration);
            manager.save();
            setIgnoreManager(manager);
          }}
        />
      )}
      <div
        style={{ display: "flex", gap: 50, minHeight: 0, height: "stretch" }}
      >
        <div className={styles.container}>
          <span style={{ fontSize: 32 }}>Active</span>
          <div style={{ overflowY: "auto" }}>
            <PriorityTable
              priorityItems={priorityItems}
              ignoreManager={ignoreManager}
              onSelect={setSelectedId}
            />
          </div>
        </div>
        <div className={styles.container} style={{ minHeight: 0 }}>
          <span style={{ fontSize: 32 }}>Pending</span>
          <div style={{ overflowY: "auto", height: "stretch" }}>
            <Table
              items={items}
              ignoreManager={ignoreManager}
              onSelect={setSelectedId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
