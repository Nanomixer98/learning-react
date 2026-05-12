export const currendyFormatter = (value: number) => {
  return value.toLocaleString("en-En", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};
