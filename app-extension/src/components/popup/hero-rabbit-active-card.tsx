import { useSettings } from '@/hooks/useSettings';
import { Button } from '../ui/button';
import { Card, CardFooter, CardHeader } from '../ui/card';
import { useEffect, useState } from 'react';

export default function HeroRabbitActiveComponent() {
  const { settings, setSettings } = useSettings();
  const [currentOrigin, setCurrentOrigin] = useState<string | undefined>(undefined);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let originPage = new URL(tabs[0].url!).origin;
      setCurrentOrigin(originPage);
    });
  }, []);
  const handleLogout = () => {
    let newCredentials = settings.credentials.filter((cred) => cred.host != currentOrigin);
    setSettings({ ...settings, credentials: newCredentials });
  };
  return (
    <Card className="ext-shadow-none">
      <CardHeader>Welcome</CardHeader>

      <CardFooter>
        <Button className="ext-w-full" onClick={handleLogout}>
          LogOut
        </Button>
      </CardFooter>
    </Card>
  );
}
