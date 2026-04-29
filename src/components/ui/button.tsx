import { cva, type VariantProps } from "class-variance-authority"
import {
  Button as AriaButton,
  composeRenderProps,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition",
    /* Hover / Pressed / Disabled */
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "data-[pressed]:scale-[0.97]",
    /* Focus Visible */
    "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2",
    /* Resets */
    "focus-visible:outline-none",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground data-[hovered]:bg-primary/90 data-[pressed]:bg-primary/75",
        destructive:
          "bg-destructive text-destructive-foreground data-[hovered]:bg-destructive/90 data-[pressed]:bg-destructive/75",
        outline:
          "border border-input bg-background data-[hovered]:bg-accent data-[hovered]:text-accent-foreground data-[pressed]:bg-accent data-[pressed]:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground data-[hovered]:bg-secondary/80 data-[pressed]:bg-secondary/60",
        ghost:
          "data-[hovered]:bg-accent data-[hovered]:text-accent-foreground data-[pressed]:bg-accent data-[pressed]:text-accent-foreground",
        soft:
          "[background-color:var(--brand-a3)] [color:var(--brand-a11)] [border:1px_solid_var(--brand-a7)] data-[hovered]:[background-color:var(--brand-a4)] data-[pressed]:[background-color:var(--brand-a5)]",
        link: "text-primary underline-offset-4 data-[hovered]:underline data-[pressed]:opacity-70",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends AriaButtonProps,
    VariantProps<typeof buttonVariants> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <AriaButton
      className={composeRenderProps(className, (className) =>
        cn(
          buttonVariants({
            variant,
            size,
            className,
          })
        )
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
