import { useEffect, useRef, useState } from "react";
import type { Location } from "./locations";
import LocationDisplay, { Fetcher } from "./locations";

function App() {
  const [locations, setLocations] = useState<Location[]>([]);

  const fetcher = useRef(new Fetcher((locations) => setLocations(locations)));
  useEffect(() => fetcher.current.start(), []);

  return (
    <div
      style={{
        display: "flex",
        height: "stretch",
        padding: 50,
        justifyContent: "center",
      }}
    >
      <LocationDisplay locations={locations} />
    </div>
  );
}

export default App;
