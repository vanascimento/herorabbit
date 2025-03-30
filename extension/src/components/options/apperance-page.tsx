import CardSwitch from '../ui/card-switch';

interface AppearancePageOptionProps {
  darkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
}
export default function AppearancePageOption({ darkTheme, setDarkTheme }: AppearancePageOptionProps) {
  return (
    <CardSwitch
      title={'Dark Mode'}
      checked={darkTheme}
      onChecked={setDarkTheme}
      subtitle={'Enable dark mode for the extension.'}
    />
  );
}
