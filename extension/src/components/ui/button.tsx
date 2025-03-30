import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "ext-inline-flex ext-items-center ext-justify-center ext-gap-2 ext-whitespace-nowrap ext-rounded-md ext-text-sm ext-font-medium ext-transition-colors focus-visible:ext-outline-none focus-visible:ext-ring-1 focus-visible:ext-ring-ring disabled:ext-pointer-events-none disabled:ext-opacity-50 [&_svg]:ext-pointer-events-none [&_svg]:ext-size-4 [&_svg]:ext-shrink-0",
  {
    variants: {
      variant: {
        default:
          "ext-bg-primary ext-text-primary-foreground ext-shadow hover:ext-bg-primary/90",
        destructive:
          "ext-bg-destructive ext-text-destructive-foreground ext-shadow-sm hover:ext-bg-destructive/90",
        outline:
          "ext-border ext-border-input ext-bg-background ext-shadow-sm hover:ext-bg-accent hover:ext-text-accent-foreground",
        secondary:
          "ext-bg-secondary ext-text-secondary-foreground ext-shadow-sm hover:ext-bg-secondary/80",
        ghost: "hover:ext-bg-accent hover:ext-text-accent-foreground",
        link: "ext-text-primary ext-underline-offset-4 hover:ext-underline",
      },
      size: {
        default: "ext-h-9 ext-px-4 ext-py-2",
        sm: "ext-h-8 ext-rounded-md ext-px-3 ext-text-xs",
        lg: "ext-h-10 ext-rounded-md ext-px-8",
        icon: "ext-h-9 ext-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
