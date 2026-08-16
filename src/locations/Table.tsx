import type { Item } from "./data";
import type IgnoreManager from "./ignore";

export default function Table({
  items,
  ignoreManager,
  onSelect,
}: {
  items: Item[];
  ignoreManager: IgnoreManager;
  onSelect: (id: string) => void;
}) {
  return (
    <table
      style={{
        textAlign: "center",
        fontSize: 24,
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
          }}
        >
          <th style={{ paddingRight: 50, paddingLeft: 50 }}>Time</th>
          <th style={{ paddingRight: 50 }}>Cooldown</th>
          <th style={{ paddingRight: 50 }}>Kingdom</th>
          <th style={{ paddingRight: 50 }}>Position</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ id, time, cooldown, kingdom, position }) => (
          <tr
            key={id}
            onClick={() => onSelect(id)}
            style={{
              backgroundColor:
                ignoreManager.isIgnored(id) ? "rgb(192, 192, 192)" : undefined,
            }}
          >
            <td style={{ paddingRight: 50, paddingLeft: 50 }}>{time}</td>
            <td style={{ paddingRight: 50 }}>{cooldown}</td>
            <td style={{ paddingRight: 50 }}>{kingdom}</td>
            <td style={{ paddingRight: 50 }}>{position}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
