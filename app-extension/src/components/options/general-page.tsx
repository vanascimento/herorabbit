import CardSwitch from '../ui/card-switch';

interface GeneralPageOptionProps {
  floatingButton: boolean;
  setFloatingButton: (value: boolean) => void;
}
export default function GeneralPageOption({ floatingButton, setFloatingButton }: GeneralPageOptionProps) {
  return (
    <CardSwitch
      title={'Hide Floating Button'}
      checked={floatingButton}
      onChecked={() => setFloatingButton(!floatingButton)}
      subtitle={'Hide Floating Button in all content page.'}
    />
  );
}
