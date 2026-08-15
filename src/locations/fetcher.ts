import { deserialize, type Location } from "./data";

export default class Fetcher {
  private intervalId: number | undefined = undefined;
  private readonly handler: (locations: Location[]) => void;

  constructor(handler: (locations: Location[]) => void) {
    this.handler = handler;
  }

  public start() {
    this.fetchData();
    this.intervalId = setInterval(() => this.fetchData(), 60000);
  }

  public stop() {
    clearInterval(this.intervalId);
  }

  private async fetchData() {
    const response = await fetch(import.meta.env.VITE_DATA_URL);
    const text = await response.text();
    const locations = deserialize(text);
    if (locations !== undefined) {
      this.handler(locations);
    }
  }
}
