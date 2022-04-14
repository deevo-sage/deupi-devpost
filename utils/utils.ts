export const debounce = (fn: any, ms: number) => {
  let temp: any = undefined;
  return (val: any) => {
    clearTimeout(temp);
    temp = setTimeout(() => fn(val), ms);
  };
};

export const shrinkAddress = (s: string) =>
  s.substring(0, 6) + "..." + s.substring(s.length - 4);
