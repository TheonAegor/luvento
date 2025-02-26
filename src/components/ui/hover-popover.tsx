"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"

interface HoverPopoverProps {
  children: React.ReactNode
  content: React.ReactNode
  openDelay?: number
  closeDelay?: number
}

export function HoverPopover({ children, content, openDelay = 0, closeDelay = 150 }: HoverPopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const openTimeout = React.useRef<NodeJS.Timeout | null>(null)
  const closeTimeout = React.useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout.current!)
    openTimeout.current = setTimeout(() => setIsOpen(true), openDelay)
  }

  const handleMouseLeave = () => {
    clearTimeout(openTimeout.current!)
    closeTimeout.current = setTimeout(() => setIsOpen(false), closeDelay)
  }

  return (
    <PopoverPrimitive.Root open={isOpen}>
      <PopoverPrimitive.Trigger
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
        asChild
      >
        {children}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "z-50 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
            "data-[side=top]:slide-in-from-bottom-2"
          )}
          sideOffset={5}
        >
          {content}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
} 