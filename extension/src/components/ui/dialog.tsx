'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & { className?: string }
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'ext-fixed ext-inset-0 ext-z-50 ext-bg-black/80 ext- data-[state=open]:ext-animate-in data-[state=closed]:ext-animate-out data-[state=closed]:ext-fade-out-0 data-[state=open]:ext-fade-in-0',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'ext-fixed ext-left-[50%] ext-top-[50%] ext-z-50 ext-grid ext-w-full ext-max-w-lg ext-translate-x-[-50%] ext-translate-y-[-50%] ext-gap-4 ext-border ext-bg-background ext-p-6 ext-shadow-lg ext-duration-200 data-[state=open]:ext-animate-in data-[state=closed]:ext-animate-out data-[state=closed]:ext-fade-out-0 data-[state=open]:ext-fade-in-0 data-[state=closed]:ext-zoom-out-95 data-[state=open]:ext-zoom-in-95 data-[state=closed]:ext-slide-out-to-left-1/2 data-[state=closed]:ext-slide-out-to-top-[48%] data-[state=open]:ext-slide-in-from-left-1/2 data-[state=open]:ext-slide-in-from-top-[48%] sm:ext-rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="ext-absolute ext-right-4 ext-top-4 ext-rounded-sm ext-opacity-70 ext-ring-offset-background ext-transition-opacity hover:ext-opacity-100 focus:ext-outline-none focus:ext-ring-2 focus:ext-ring-ring focus:ext-ring-offset-2 disabled:ext-pointer-events-none data-[state=open]:ext-bg-accent data-[state=open]:ext-text-muted-foreground">
        <X className="ext-h-4 ext-w-4" />
        <span className="ext-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('ext-flex ext-flex-col ext-space-y-1.5 ext-text-center sm:ext-text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('ext-flex ext-flex-col-reverse sm:ext-flex-row sm:ext-justify-end sm:ext-space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & { className?: string }
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('ext-text-lg ext-font-semibold ext-leading-none ext-tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & { className?: string }
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('ext-text-sm ext-text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
