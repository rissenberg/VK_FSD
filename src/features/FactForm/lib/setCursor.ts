export const setTextareaCursor = (textarea: HTMLTextAreaElement | null) => {
  if (textarea) {
    const startPos = textarea.value.indexOf(' ');
    if (startPos !== -1) {
      textarea.focus();
      textarea.setSelectionRange(startPos, startPos);
    }
  }
}