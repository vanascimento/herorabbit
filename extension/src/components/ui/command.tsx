import * as React from 'react';
import { forwardRef } from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Command = forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive> & { className?: string }
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'ext-flex ext-h-full ext-w-full ext-flex-col ext-overflow-hidden ext-rounded-md ext-bg-popover ext-text-popover-foreground',
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="ext-overflow-hidden ext-p-0">
        <Command className="[&_[cmdk-group-heading]]:ext-px-2 [&_[cmdk-group-heading]]:ext-font-medium [&_[cmdk-group-heading]]:ext-text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:ext-pt-0 [&_[cmdk-group]]:ext-px-2 [&_[cmdk-input-wrapper]_svg]:ext-h-5 [&_[cmdk-input-wrapper]_svg]:ext-w-5 [&_[cmdk-input]]:ext-h-12 [&_[cmdk-item]]:ext-px-2 [&_[cmdk-item]]:ext-py-3 [&_[cmdk-item]_svg]:ext-h-5 [&_[cmdk-item]_svg]:ext-w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & { className?: string }
>(({ className, ...props }, ref) => (
  <div className="ext-flex ext-items-center ext-border-b ext-px-3">
    <Search className="ext-mr-2 ext-h-4 ext-w-4 ext-shrink-0 ext-opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'ext-flex ext-h-10 ext-w-full ext-rounded-md ext-bg-transparent ext-py-3 ext-text-sm ext-outline-none placeholder:ext-text-muted-foreground disabled:ext-cursor-not-allowed disabled:ext-opacity-50',
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> & { className?: string }
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('ext-max-h-[300px] ext-overflow-y-auto ext-overflow-x-hidden', className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} className="ext-py-6 ext-text-center ext-text-sm" {...props} />);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> & { className?: string }
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'ext-overflow-hidden ext-p-1 ext-text-foreground [&_[cmdk-group-heading]]:ext-px-2 [&_[cmdk-group-heading]]:ext-py-1.5 [&_[cmdk-group-heading]]:ext-text-xs [&_[cmdk-group-heading]]:ext-font-medium [&_[cmdk-group-heading]]:ext-text-muted-foreground',
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> & { className?: string }
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn('ext--mx-1 ext-h-px ext-bg-border', className)} {...props} />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & { className?: string }
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'ext-relative ext-flex ext-cursor-default ext-gap-2 ext-select-none ext-items-center ext-rounded-sm ext-px-2 ext-py-1.5 ext-text-sm ext-outline-none data-[disabled=true]:ext-pointer-events-none data-[selected=true]:ext-bg-accent data-[selected=true]:ext-text-accent-foreground data-[disabled=true]:ext-opacity-50 [&_svg]:ext-pointer-events-none [&_svg]:ext-size-4 [&_svg]:ext-shrink-0',
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ext-ml-auto ext-text-xs ext-tracking-widest ext-text-muted-foreground', className)}
      {...props}
    />
  );
};
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
