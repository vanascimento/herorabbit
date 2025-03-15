import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "ext-flex ext-h-9 ext-w-full ext-items-center ext-justify-between ext-whitespace-nowrap ext-rounded-md ext-border ext-border-input ext-bg-transparent ext-px-3 ext-py-2 ext-text-sm ext-shadow-sm ext-ring-offset-background data-[placeholder]:ext-text-muted-foreground focus:ext-outline-none focus:ext-ring-1 focus:ext-ring-ring disabled:ext-cursor-not-allowed disabled:ext-opacity-50 [&>span]:ext-line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="ext-h-4 ext-w-4 ext-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "ext-flex ext-cursor-default ext-items-center ext-justify-center ext-py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="ext-h-4 ext-w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "ext-flex ext-cursor-default ext-items-center ext-justify-center ext-py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="ext-h-4 ext-w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "ext-relative ext-z-50 ext-max-h-[--radix-select-content-available-height] ext-min-w-[8rem] ext-overflow-y-auto ext-overflow-x-hidden ext-rounded-md ext-border ext-bg-popover ext-text-popover-foreground ext-shadow-md data-[state=open]:ext-animate-in data-[state=closed]:ext-animate-out data-[state=closed]:ext-fade-out-0 data-[state=open]:ext-fade-in-0 data-[state=closed]:ext-zoom-out-95 data-[state=open]:ext-zoom-in-95 data-[side=bottom]:ext-slide-in-from-top-2 data-[side=left]:ext-slide-in-from-right-2 data-[side=right]:ext-slide-in-from-left-2 data-[side=top]:ext-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:ext-translate-y-1 data-[side=left]:ext--translate-x-1 data-[side=right]:ext-translate-x-1 data-[side=top]:ext--translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "ext-p-1",
          position === "popper" &&
            "ext-h-[var(--radix-select-trigger-height)] ext-w-full ext-min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("ext-px-2 ext-py-1.5 ext-text-sm ext-font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "ext-relative ext-flex ext-w-full ext-cursor-default ext-select-none ext-items-center ext-rounded-sm ext-py-1.5 ext-pl-2 ext-pr-8 ext-text-sm ext-outline-none focus:ext-bg-accent focus:ext-text-accent-foreground data-[disabled]:ext-pointer-events-none data-[disabled]:ext-opacity-50",
      className
    )}
    {...props}
  >
    <span className="ext-absolute ext-right-2 ext-flex ext-h-3.5 ext-w-3.5 ext-items-center ext-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="ext-h-4 ext-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("ext--mx-1 ext-my-1 ext-h-px ext-bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
