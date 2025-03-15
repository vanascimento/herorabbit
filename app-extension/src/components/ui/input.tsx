import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "ext-flex ext-h-9 ext-w-full ext-rounded-md ext-border ext-border-input ext-bg-transparent ext-px-3 ext-py-1 ext-text-base ext-shadow-sm ext-transition-colors file:ext-border-0 file:ext-bg-transparent file:ext-text-sm file:ext-font-medium file:ext-text-foreground placeholder:ext-text-muted-foreground focus-visible:ext-outline-none focus-visible:ext-ring-1 focus-visible:ext-ring-ring disabled:ext-cursor-not-allowed disabled:ext-opacity-50 md:ext-text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
