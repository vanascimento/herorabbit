import { DownloadCloudIcon } from 'lucide-react';
import { saveAs } from 'file-saver';
import useCurrentRabbitmqCredentials from '@/hooks/useCurrentRabbitmqCredentials';

interface DownloadMessagesFromQueueButtonProps {
  QueueName: string;
}
export default function DownloadMessagesFromQueueButton({ QueueName }: DownloadMessagesFromQueueButtonProps) {
  const { currentCredentials } = useCurrentRabbitmqCredentials();
  const downloadAllMessagesFromQueue = async () => {
    if (!currentCredentials) return;
    const base64Credentials = btoa(`${currentCredentials?.username}:${currentCredentials?.password}`);
    let response = await fetch(`/api/queues/%2f/${QueueName}/get`, {
      method: 'POST',
      body: JSON.stringify({ count: 50, ackmode: 'reject_requeue_true', encoding: 'auto', truncate: 50000 }),
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    });

    let data = await response.json();

    const textData = JSON.stringify(data);
    const blob = new Blob([textData], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${QueueName}_${new Date().getTime()}.txt`);
  };
  return (
    <button onClick={downloadAllMessagesFromQueue}>
      <DownloadCloudIcon size={16} />{' '}
    </button>
  );
}
