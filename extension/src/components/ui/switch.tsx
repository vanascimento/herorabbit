import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & { className?: string }
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'ext-peer ext-inline-flex ext-h-5 ext-w-9 ext-shrink-0 ext-cursor-pointer ext-items-center ext-rounded-full ext-border-2 ext-border-transparent ext-shadow-sm ext-transition-colors focus-visible:ext-outline-none focus-visible:ext-ring-2 focus-visible:ext-ring-ring focus-visible:ext-ring-offset-2 focus-visible:ext-ring-offset-background disabled:ext-cursor-not-allowed disabled:ext-opacity-50 data-[state=checked]:ext-bg-primary data-[state=unchecked]:ext-bg-input',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'ext-pointer-events-none ext-block ext-h-4 ext-w-4 ext-rounded-full ext-bg-background ext-shadow-lg ext-ring-0 ext-transition-transform data-[state=checked]:ext-translate-x-4 data-[state=unchecked]:ext-translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
