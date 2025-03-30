import { Github, Linkedin } from 'lucide-react';
import NativeCard from '../ui/native-card';

export default function ContactUsPage() {
  return (
    <NativeCard title="Catact Me">
      <p className="ext-flex ext-flex-row ext-items-center ext-my-4 ext-text-pretty ext-space-x-4">
        <Linkedin className="ext-text-blue-500 " />
        <a href="https://www.linkedin.com/in/nascimva/">https://www.linkedin.com/in/nascimva/</a>
      </p>
      <p className="ext-flex ext-flex-row ext-items-center ext-my-4 ext-text-pretty ext-space-x-4">
        <Github />
        <a href="https://github.com/vanascimento/herorabbit">https://github.com/vanascimento/herorabbit</a>
      </p>
    </NativeCard>
  );
}
