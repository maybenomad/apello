export default function mapping<A>(
  key: string,
  list: Array<A>,
  keyTransform: (a: string) => string = (a) => a,
): { [key: string]: A } {
  return list.reduce((xs, x) => {
    xs[keyTransform(x[key])] = x;
    return xs;
  }, {});
}
