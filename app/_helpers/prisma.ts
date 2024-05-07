export const prismaDecimalParse = (value: any) => {
  return JSON.parse(JSON.stringify(value));
};
