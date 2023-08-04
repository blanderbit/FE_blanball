const unsecuredCopyToClipboard = (text) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  // Add a slight delay before removing the textarea
  setTimeout(() => {
    document.body.removeChild(textArea);
  }, 100);
};

/**
 * Copies the text passed as param to the system clipboard
 * Check if using HTTPS and navigator.clipboard is available
 * Then uses standard clipboard API, otherwise uses fallback
 */
export const copyToClipboard = (content) => {
  if (window.isSecureContext && navigator.clipboard) {
    navigator.clipboard.writeText(content);
  } else {
    unsecuredCopyToClipboard(content);
  }
};
