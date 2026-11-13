"use client"

import * as React from "react"
import { Dialog as AriaDialog, Heading } from "react-aria-components/Dialog"
import { Modal, ModalOverlay } from "react-aria-components/Modal"
import { Text } from "react-aria-components/Text"
import { X as IconX } from "lucide-react";

import { Button } from "@/components/ui/button"
import { Root as SlotRoot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

type DialogChangeHandler = (open: boolean) => void
type DialogPortalContainer = Element | DocumentFragment | null

type DialogContextValue = {
  close: () => void
  isOpen: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const DialogContext = React.createContext<DialogContextValue | null>(null)
const DialogPortalContext = React.createContext<DialogPortalContainer | undefined>(undefined)

function useDialogContext() {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error("Dialog components must be used within Dialog")
  return context
}

function Dialog({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  modal: _modal,
}: {
  children?: React.ReactNode
  defaultOpen?: boolean
  modal?: boolean
  open?: boolean
  onOpenChange?: DialogChangeHandler
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isOpen = open ?? uncontrolledOpen
  const setOpen = React.useCallback((nextOpen: boolean) => {
    if (open === undefined) setUncontrolledOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }, [onOpenChange, open])

  const context = React.useMemo<DialogContextValue>(() => ({
    close: () => setOpen(false),
    isOpen,
    setOpen,
    toggle: () => setOpen(!isOpen),
  }), [isOpen, setOpen])

  return <DialogContext.Provider value={context}>{children}</DialogContext.Provider>
}

function DialogTrigger({
  asChild = false,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { isOpen, toggle } = useDialogContext()
  const Component = asChild ? SlotRoot : "button"

  return (
    <Component
      data-slot="dialog-trigger"
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      {...(asChild ? {} : { type: "button" as const })}
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) toggle()
      }}
    >
      {children}
    </Component>
  )
}

function DialogPortal({
  children,
  container,
}: {
  children?: React.ReactNode
  container?: DialogPortalContainer
}) {
  return (
    <DialogPortalContext.Provider value={container}>
      {children}
    </DialogPortalContext.Provider>
  )
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-overlay duration-200 supports-backdrop-filter:backdrop-blur-xs entering:animate-in entering:fade-in-0 exiting:animate-out exiting:fade-out-0 motion-reduce:!animate-none motion-reduce:!transition-none",
        className
      )}
      {...props}
    />
  )
}

type CloseEvent = Event & { preventDefault: () => void }

function createCloseEvent(type: string, originalEvent: Event) {
  const event = new Event(type, { cancelable: true })
  Object.defineProperty(event, "originalEvent", { value: originalEvent })
  return event
}

type DialogContentProps = Omit<React.ComponentProps<"section">, "children" | "role"> & {
  children?: React.ReactNode
  closeLabel?: string
  dismissible?: boolean
  disableEscapeClose?: boolean
  onCloseAutoFocus?: (event: Event) => void
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onInteractOutside?: (event: CloseEvent) => void
  onOpenAutoFocus?: (event: Event) => void
  onPointerDownOutside?: (event: CloseEvent) => void
  overlayClassName?: string
  portalContainer?: DialogPortalContainer
  role?: "dialog" | "alertdialog"
  showCloseButton?: boolean
  showOverlay?: boolean
  size?: "sm" | "md" | "lg" | "xl"
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  showOverlay = true,
  dismissible = true,
  disableEscapeClose = false,
  size,
  closeLabel = "Close dialog",
  overlayClassName,
  onEscapeKeyDown,
  onInteractOutside,
  onPointerDownOutside,
  onOpenAutoFocus,
  onCloseAutoFocus,
  portalContainer,
  ...props
}: DialogContentProps) {
  const { isOpen, setOpen } = useDialogContext()
  const portalContainerFromContext = React.useContext(DialogPortalContext)
  const resolvedPortalContainer = portalContainer ?? portalContainerFromContext
  const wasOpen = React.useRef(isOpen)

  React.useEffect(() => {
    if (wasOpen.current === isOpen) return
    wasOpen.current = isOpen
    if (isOpen) onOpenAutoFocus?.(new Event("openautofocus"))
    else onCloseAutoFocus?.(new Event("closeautofocus"))
  }, [isOpen, onCloseAutoFocus, onOpenAutoFocus])

  return (
    <ModalOverlay
      data-slot="dialog-overlay"
      isOpen={isOpen}
      onOpenChange={setOpen}
      isDismissable={dismissible}
      isKeyboardDismissDisabled={disableEscapeClose}
      // React Aria's runtime accepts DocumentFragment through createPortal even though its prop type is narrower.
      UNSTABLE_portalContainer={resolvedPortalContainer === null ? undefined : resolvedPortalContainer as Element | undefined}
      shouldCloseOnInteractOutside={(element) => {
        const event = createCloseEvent("interactoutside", new Event("interactoutside"))
        onInteractOutside?.(event)
        const pointerEvent = createCloseEvent("pointerdownoutside", new Event("pointerdownoutside"))
        onPointerDownOutside?.(pointerEvent)
        return dismissible && !event.defaultPrevented && !pointerEvent.defaultPrevented && element instanceof Element
      }}
      className={cn(
        "fixed inset-0 z-50 duration-200 entering:animate-in entering:fade-in-0 exiting:animate-out exiting:fade-out-0 motion-reduce:!animate-none motion-reduce:!transition-none",
        showOverlay ? "bg-overlay supports-backdrop-filter:backdrop-blur-xs" : "bg-transparent",
        overlayClassName,
      )}
    >
      <div
        className="contents"
        onKeyDownCapture={(event) => {
          if (event.key !== "Escape") return
          onEscapeKeyDown?.(event.nativeEvent)
          if (event.nativeEvent.defaultPrevented || disableEscapeClose) {
            event.preventDefault()
            event.stopPropagation()
          }
        }}
      >
        <Modal
        data-slot="dialog-content"
        data-size={size ?? "default"}
        className={cn(
          "fixed top-1/2 left-1/2 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-[var(--radius)] border border-border bg-background p-4 text-sm text-foreground shadow-lg duration-200 ease-out outline-none data-[size=default]:sm:max-w-sm data-[size=sm]:sm:max-w-[400px] data-[size=md]:sm:max-w-[480px] data-[size=lg]:sm:max-w-[640px] data-[size=xl]:sm:max-w-[800px] entering:animate-in entering:fade-in-0 entering:zoom-in-95 exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95 motion-reduce:!animate-none motion-reduce:!transition-none",
          className
        )}
      >
        <AriaDialog {...props}>
          {children}
          {showCloseButton && (
            <DialogClose asChild>
              <button
                type="button"
                aria-label={closeLabel}
                className="absolute end-3 top-3 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <IconX className="size-4" />
              </button>
            </DialogClose>
          )}
        </AriaDialog>
        </Modal>
      </div>
    </ModalOverlay>
  )
}

function DialogClose({
  asChild = false,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { close } = useDialogContext()
  const Component = asChild ? SlotRoot : "button"

  return (
    <Component
      data-slot="dialog-close"
      {...(asChild ? {} : { type: "button" as const })}
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) close()
      }}
    >
      {children}
    </Component>
  )
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("min-h-0 flex-1 overflow-y-auto", className)}
      {...props}
    />
  )
}

function ModalComponent({ size = "md", ...props }: React.ComponentProps<typeof DialogContent>) {
  return <DialogContent size={size} {...props} />
}

function ModalHeader({
  title,
  description,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  title?: React.ReactNode
  description?: React.ReactNode
}) {
  return (
    <DialogHeader className={className} {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {description && <DialogDescription>{description}</DialogDescription>}
      {children}
    </DialogHeader>
  )
}

function ModalFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end [&>button]:w-full sm:[&>button]:w-auto",
        className
      )}
      {...props}
    />
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <Heading
      slot="title"
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <Text
      slot="description"
      elementType="p"
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogTrigger as ModalTrigger,
  ModalComponent as Modal,
  DialogBody as ModalBody,
  ModalFooter,
  ModalHeader,
}
