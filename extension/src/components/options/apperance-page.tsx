import { useSettings } from '@/hooks/useSettings';
import CardSwitch from '../ui/card-switch';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';

interface AppearancePageOptionProps {
  darkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
}
export default function AppearancePageOption({ darkTheme, setDarkTheme }: AppearancePageOptionProps) {
  const { settings, setSettings } = useSettings();
  const handleLanguageChange = (value: 'en' | 'pt_br') => {
    setSettings({ ...settings, language: value });
    toast.success('Language changed successfully');
  };
  return (
    <div className="ext-flex ext-flex-col ext-space-y-4">
      <CardSwitch
        title={'Dark Mode'}
        checked={darkTheme}
        onChecked={setDarkTheme}
        subtitle={'Enable dark mode for the extension.'}
      />
      <div>
        <Select value={settings.language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="ext-rounded-sm">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent className="ext-rounded-sm">
            <SelectGroup>
              <SelectLabel>Languages</SelectLabel>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="pt_br">Português Brasileiro</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
