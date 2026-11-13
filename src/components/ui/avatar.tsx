"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const avatarSizeClasses = {
  xs: "size-6",
  sm: "size-8",
  default: "size-10",
  lg: "size-12",
  xl: "size-14",
} as const

type AvatarStatus = "loading" | "loaded" | "error"
type AvatarContextValue = {
  setStatus: React.Dispatch<React.SetStateAction<AvatarStatus>>
  status: AvatarStatus
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null)

function useAvatar() {
  const context = React.useContext(AvatarContext)
  if (!context) throw new Error("AvatarImage and AvatarFallback must be used within Avatar")
  return context
}

function Avatar({
  className,
  size = "sm",
  ...props
}: React.ComponentProps<"span"> & {
  size?: keyof typeof avatarSizeClasses
}) {
  const [status, setStatus] = React.useState<AvatarStatus>("loading")

  return (
    <AvatarContext.Provider value={{ setStatus, status }}>
      <span
        data-slot="avatar"
        data-size={size}
        className={cn(
          "group/avatar relative grid shrink-0 rounded-full bg-background select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken [&>*]:col-start-1 [&>*]:row-start-1 dark:after:mix-blend-lighten",
          avatarSizeClasses[size],
          className,
        )}
        {...props}
      />
    </AvatarContext.Provider>
  )
}

function AvatarImage({
  className,
  onError,
  onLoad,
  ...props
}: React.ComponentProps<"img">) {
  const { setStatus, status } = useAvatar()
  const imageRef = React.useRef<HTMLImageElement>(null)
  const [failedSource, setFailedSource] = React.useState<{ src?: string | Blob; srcSet?: string }>()
  const hasFailedSource = Boolean(
    failedSource && failedSource.src === props.src && failedSource.srcSet === props.srcSet,
  )

  React.useEffect(() => {
    if (!props.src && !props.srcSet) {
      setStatus("loading")
      return
    }

    const image = imageRef.current

    if (!image) return
    if (!image.complete) {
      setStatus("loading")
      return
    }

    if (image.naturalWidth > 0) {
      setStatus("loaded")
    } else {
      setFailedSource({ src: props.src, srcSet: props.srcSet })
      setStatus("error")
    }
  }, [props.src, props.srcSet, setStatus])

  if (!props.src && !props.srcSet) return null
  if (status === "error" && hasFailedSource) return null

  return (
    <img
      ref={imageRef}
      {...props}
      data-slot="avatar-image"
      className={cn("aspect-square size-full rounded-full object-cover", className)}
      onLoad={(event) => {
        setStatus("loaded")
        onLoad?.(event)
      }}
      onError={(event) => {
        setFailedSource({ src: props.src, srcSet: props.srcSet })
        setStatus("error")
        onError?.(event)
      }}
    />
  )
}

const avatarFallbackClasses = {
  default: {
    solid: "",
    soft: "",
  },
  primary: {
    solid: "bg-primary text-primary-foreground",
    soft: "bg-primary/10 text-primary",
  },
  success: {
    solid: "bg-success text-success-foreground",
    soft: "bg-success-soft text-success",
  },
  warning: {
    solid: "bg-warning text-warning-foreground",
    soft: "bg-warning-soft text-warning",
  },
  destructive: {
    solid: "bg-destructive text-destructive-foreground",
    soft: "bg-destructive-soft text-destructive",
  },
} as const

function AvatarFallback({
  className,
  color = "default",
  variant = "solid",
  ...props
}: React.ComponentProps<"span"> & {
  color?: keyof typeof avatarFallbackClasses
  variant?: "solid" | "soft"
}) {
  const { status } = useAvatar()
  if (status === "loaded") return null

  return (
    <span
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=xs]/avatar:text-xs",
        avatarFallbackClasses[color][variant],
        className,
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute top-0 right-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background select-none",
        "group-data-[size=xs]/avatar:size-1.5 group-data-[size=xs]/avatar:[&>svg]:hidden",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        "group-data-[size=xl]/avatar:size-3.5 group-data-[size=xl]/avatar:[&>svg]:size-2.5",
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarBadge }
