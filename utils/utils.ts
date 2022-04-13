export const debounce = (fn: any, ms: number) => {
  let temp: any = undefined;
  return (val: any) => {
    clearTimeout(temp);
    temp = setTimeout(() => fn(val), ms);
  };
};
