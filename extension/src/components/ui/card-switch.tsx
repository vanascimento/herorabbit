import { Switch } from '@/components/ui/switch.tsx';

type CardSwitchProps = {
  title: string;
  subtitle?: string;
  checked: boolean;
  onChecked: (checked: boolean) => void;
};

export default function CardSwitch({ title, subtitle, checked, onChecked }: CardSwitchProps) {
  return (
    <div className="ext-w-full ext-border  ext-rounded-sm ext-flex-row ext-gap-1 ext-px-6 ext-py-4">
      <div className="ext-flex ext-flex-row ext-justify-between ext-items-center">
        <p className="ext-font-semibold ext-text ext-text-sm">{title}</p>
        <Switch id="airplane-mode" checked={checked} onCheckedChange={onChecked} />
      </div>
      {subtitle && <p className="ext-text-xs ext-py-2">{subtitle}</p>}
    </div>
  );
}
