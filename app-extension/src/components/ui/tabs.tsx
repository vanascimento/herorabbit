import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "ext-inline-flex ext-h-9 ext-items-center ext-justify-center ext-rounded-lg ext-bg-muted ext-p-1 ext-text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "ext-inline-flex ext-items-center ext-justify-center ext-whitespace-nowrap ext-rounded-md ext-px-3 ext-py-1 ext-text-sm ext-font-medium ext-ring-offset-background ext-transition-all focus-visible:ext-outline-none focus-visible:ext-ring-2 focus-visible:ext-ring-ring focus-visible:ext-ring-offset-2 disabled:ext-pointer-events-none disabled:ext-opacity-50 data-[state=active]:ext-bg-background data-[state=active]:ext-text-foreground data-[state=active]:ext-shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "ext-mt-2 ext-ring-offset-background focus-visible:ext-outline-none focus-visible:ext-ring-2 focus-visible:ext-ring-ring focus-visible:ext-ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
