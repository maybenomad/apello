export default function waitFor(f) {
  return new Promise((resolve, reject) => {
    function poll() {
      const result = f();
      if (result) {
        return resolve(result);
      }
      setTimeout(poll, 30);
    }

    poll();
  });
}
