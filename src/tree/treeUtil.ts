export const getNextPath = (splitedPath: number[]) => {
  const nextPath = Array.from(splitedPath);
  nextPath[nextPath.length - 1]++;
  return nextPath;
};
