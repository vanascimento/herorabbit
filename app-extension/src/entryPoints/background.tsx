import { CHROME_ACTION } from '@/lib/chrome-actions';
import { GENERAL_SETTINGS_KEY, MESSAGE_TYPES } from '@/lib/types.ts';

/** Fired when the extension is first installed,
 *  when the extension is updated to a new version,
 *  and when Chrome is updated to a new version. */
chrome.runtime.onInstalled.addListener((details) => {
  console.log('[background.js] onInstalled', details);
});

chrome.runtime.onConnect.addListener((port) => {
  console.log('[background.js] onConnect', port);
});

chrome.runtime.onStartup.addListener(() => {
  console.log('[background.js] onStartup');
});

/**
 *  Sent to the event page just before it is unloaded.
 *  This gives the extension opportunity to do some clean up.
 *  Note that since the page is unloading,
 *  any asynchronous operations started while handling this event
 *  are not guaranteed to complete.
 *  If more activity for the event page occurs before it gets
 *  unloaded the onSuspendCanceled event will
 *  be sent and the page won't be unloaded. */
chrome.runtime.onSuspend.addListener(() => {
  console.log('[background.js] onSuspend');
});

chrome.runtime.onMessage.addListener((message) => {
  console.log('[background.js] onMessage: ', message);

  if (message?.type === MESSAGE_TYPES.OPEN_OPTIONS) {
    chrome.runtime.openOptionsPage();
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') {
    if (changes[GENERAL_SETTINGS_KEY]) {
      const message = { type: MESSAGE_TYPES.GENERAL_SETTINGS_UPDATED, data: changes[GENERAL_SETTINGS_KEY].newValue };

      // Send to popup and options page
      chrome.runtime.sendMessage(message);

      // Send to all tabs content
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          if (tab.id) {
            chrome.tabs.sendMessage(tab.id, message);
          }
        });
      });
    }
  }
});

// chrome.webRequest.onBeforeRequest.addListener(
//   (details) => {
//     console.log('[background.js] onBeforeRequest', details);
//     return { cancel: true };
//   },
//   {
//     urls: ['<all_urls>'],
//   },
// );

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.action === CHROME_ACTION.GET_ACTIVE_TAB_URL) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        sendResponse({ url: tabs[0].url });
      } else {
        sendResponse({ url: null });
      }
    });
    return true; // Mantém o canal de resposta aberto para `sendResponse`
  }
});

export {};
