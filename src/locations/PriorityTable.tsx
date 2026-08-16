import type { PriorityItem } from "./data";
import type IgnoreManager from "./ignore";

export default function PriorityTable({
  priorityItems: priorityItems,
  ignoreManager,
  onSelect,
}: {
  priorityItems: PriorityItem[];
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
            zIndex: 1,
          }}
        >
          <th style={{ paddingRight: 50, paddingLeft: 50 }}>Kingdom</th>
          <th style={{ paddingRight: 50 }}>Position</th>
          {priorityItems.length === 0 ?
            <th></th>
          : <th style={{ paddingRight: 50 }}></th>}
        </tr>
      </thead>
      <tbody>
        {priorityItems.map(({ id, kingdom, position }) => (
          <tr
            key={id}
            onClick={() => onSelect(id)}
            style={{
              backgroundColor:
                ignoreManager.isIgnored(id) ? "rgb(192, 192, 192)" : undefined,
            }}
          >
            <td style={{ paddingBlock: 15, paddingRight: 50, paddingLeft: 50 }}>
              {kingdom}
            </td>
            <td style={{ paddingBlock: 15, paddingRight: 50 }}>{position}</td>
            <td style={{ paddingRight: 50 }}>
              <input
                type="checkbox"
                onClick={(event) => event.stopPropagation()}
                style={{ transform: "scale(1.5)" }}
              ></input>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
