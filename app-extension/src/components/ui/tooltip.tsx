import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "ext-z-50 ext-overflow-hidden ext-rounded-md ext-bg-primary ext-px-3 ext-py-1.5 ext-text-xs ext-text-primary-foreground ext-animate-in ext-fade-in-0 ext-zoom-in-95 data-[state=closed]:ext-animate-out data-[state=closed]:ext-fade-out-0 data-[state=closed]:ext-zoom-out-95 data-[side=bottom]:ext-slide-in-from-top-2 data-[side=left]:ext-slide-in-from-right-2 data-[side=right]:ext-slide-in-from-left-2 data-[side=top]:ext-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
