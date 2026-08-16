export default class IgnoreManager {
  private idMap: Map<string, number> = new Map();

  public updateDuration(id: string, duration: number) {
    const timestamp = Date.now() + duration;
    this.idMap.set(id, timestamp);
  }

  public isIgnored(id: string): boolean {
    return (this.idMap.get(id) ?? Number.MIN_VALUE) > Date.now();
  }

  public save() {
    localStorage.setItem(
      "ignoreIdMap",
      JSON.stringify([...this.idMap.entries()]),
    );
  }

  public load(): boolean {
    const value = localStorage.getItem("ignoreIdMap");
    if (value === null) {
      return false;
    }
    try {
      const entries = JSON.parse(value);
      if (!(entries instanceof Array)) {
        return false;
      }
      entries.forEach((entry) => {
        if (entry instanceof Array) {
          const [id, timestamp] = entry;
          if (typeof id === "string" && typeof timestamp === "number") {
            this.idMap.set(id, timestamp);
          }
        }
      });
      return true;
    } catch {
      return false;
    }
  }

  public clone() {
    const clone = new IgnoreManager();
    clone.idMap = this.idMap;
    return clone;
  }
}
