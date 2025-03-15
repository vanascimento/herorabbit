export const waitForElement = (selector: string, callback: (el: HTMLElement) => void) => {
  const observer = new MutationObserver(() => {
    const el = document.querySelector(selector);
    if (el) {
      observer.disconnect();
      callback(el as HTMLElement);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
};
