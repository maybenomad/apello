import { useMemo } from "react";

class Thread {
  intervalID: number;
  interval: number;

  constructor(interval = 50) {
    this.interval = interval;
    this.intervalID = null;
  }

  run(f) {
    if (this.intervalID) {
      this.kill();
    }

    return new Promise((resolve, reject) => {
      this.intervalID = window.setInterval(() => {
        let result;

        try {
          result = f();
          console.log(this.intervalID, result);
        } catch (e) {
          reject(e);
        }

        if (result) {
          this.kill();
          resolve(result);
        }
      }, 50);
    });
  }

  kill() {
    window.clearInterval(this.intervalID);
    this.intervalID = null;
  }
}

export default function useThread() {
  const thread = useMemo(() => new Thread(), []);
  return thread;
}
