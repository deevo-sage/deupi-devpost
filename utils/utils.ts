export const debounce = (fn: any, ms: number) => {
  let temp: any = undefined;
  return (val: any) => {
    clearTimeout(temp);
    temp = setTimeout(() => fn(val), ms);
  };
};

export const shrinkAddress = (s: string) =>
  s.substring(0, 6) + "..." + s.substring(s.length - 4);

export const chainToName = (chain: any) => {
  if (chain === "matic") return "Polygon";
  else if (chain === "maticmum") return "Polygon Mumbai";
  else if (chain === "homestead") return "Ethereum";
};
