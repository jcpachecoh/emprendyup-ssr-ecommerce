export function insertAtCursor(textarea: HTMLTextAreaElement, syntax: string) {
  const { selectionStart, selectionEnd, value } = textarea;
  const newValue = value.substring(0, selectionStart) + syntax + value.substring(selectionEnd);
  return newValue;
}
