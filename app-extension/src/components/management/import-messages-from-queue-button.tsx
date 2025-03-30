import { UploadCloudIcon } from 'lucide-react';
import useCurrentRabbitmqCredentials from '@/hooks/useCurrentRabbitmqCredentials';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface ImportMessagesToQueueButtonProps {
  QueueName: string;
}
export default function ImportMessagesToQueueButton({ QueueName }: ImportMessagesToQueueButtonProps) {
  const { currentCredentials } = useCurrentRabbitmqCredentials();
  return (
    <button>
      <UploadCloudIcon size={16} />{' '}
    </button>
  );
}
