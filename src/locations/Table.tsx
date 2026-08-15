import type { Item } from "./data";

export default function Table({ items }: { items: Item[] }) {
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
          <th>Time</th>
          <th>Cooldown</th>
          <th>Kingdom</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ time, cooldown, kingdom, position }) => (
          <tr key={`${kingdom}-${position}`}>
            <td>{time}</td>
            <td>{cooldown}</td>
            <td>{kingdom}</td>
            <td>{position}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
