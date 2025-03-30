import { useEffect, useState } from 'react';
import { Message } from '@/lib/types.ts';

export default function useMessage() {
  const [messageData, setMessageData] = useState<Message | null>(null);

  if (!chrome?.runtime) {
    return messageData;
  }

  useEffect(() => {
    const messageListener = (message: Message) => {
      setMessageData(message);
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return messageData;
}
