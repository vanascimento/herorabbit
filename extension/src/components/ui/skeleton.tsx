import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("ext-animate-pulse ext-rounded-md ext-bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
