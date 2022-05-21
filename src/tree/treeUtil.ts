export const getNextPath = (splitedPath: number[]) => {
  const nextPath = Array.from(splitedPath);
  nextPath[nextPath.length - 1]++;
  return nextPath;
};

export const setCaretToEnd = (element: HTMLElement) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
  element.focus();
};
