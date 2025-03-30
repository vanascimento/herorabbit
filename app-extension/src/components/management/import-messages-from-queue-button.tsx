import { UploadCloudIcon } from 'lucide-react';
import useCurrentRabbitmqCredentials from '@/hooks/useCurrentRabbitmqCredentials';
import { useRef } from 'react';

interface ImportMessagesToQueueButtonProps {
  QueueName: string;
}
export default function ImportMessagesToQueueButton({ QueueName }: ImportMessagesToQueueButtonProps) {
  const { currentCredentials } = useCurrentRabbitmqCredentials();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Arquivo selecionado:', file.name);
    }
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="ext-hidden" />
      <UploadCloudIcon className="hover:ext-cursor-pointer" onClick={handleClick} size={16} />{' '}
    </div>
  );
}
