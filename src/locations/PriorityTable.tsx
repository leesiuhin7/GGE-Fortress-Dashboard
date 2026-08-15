import type { PriorityItem } from "./data";

export default function PriorityTable({
  priorityItems: priorityItems,
}: {
  priorityItems: PriorityItem[];
}) {
  return (
    <table
      style={{
        textAlign: "center",
        fontSize: 24,
        borderSpacing: "50px 0px",
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
          <th>Kingdom</th>
          <th>Position</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {priorityItems.map(({ kingdom, position }) => (
          <tr key={`${kingdom}-${position}`}>
            <td style={{ paddingBlock: 15 }}>{kingdom}</td>
            <td style={{ paddingBlock: 15 }}>{position}</td>
            <td>
              <input type="checkbox" style={{ transform: "scale(2)" }}></input>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
