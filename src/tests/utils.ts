export const stripForTest = (obj: any): any => {
  const newObj = { ...obj };
  delete newObj.createdAt;
  delete newObj.updatedAt;

  return newObj;
};
