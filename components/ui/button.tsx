import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { cn } from "@/lib/utils";
import { TextClassContext } from "@/components/ui/text";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "@/lib/useColorScheme";

const buttonVariants = cva(
  "group flex flex-row gap-2 items-center justify-center rounded-full overflow-hidden active:scale-95 transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary",
        destructive: "bg-destructive",
        outline: "border border-input bg-background",
        secondary: "bg-secondary",
        ghost: "bg-accent",
        link: "!px-0",
      },
      size: {
        default: "h-10 px-4 py-2 native:h-14 native:px-5 native:py-3",
        sm: "h-9 px-3",
        lg: "h-11 px-8 native:h-14",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva(
  "whitespace-nowrap font-extrabold text-foreground",
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        destructive: "text-destructive-foreground",
        outline: "group-active:text-accent-foreground",
        secondary:
          "text-secondary-foreground group-active:text-secondary-foreground",
        ghost: "group-active:text-accent-foreground",
        link: "text-sm text-primary ",
      },
      size: {
        default: "",
        sm: "",
        lg: "native:text-lg",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    isGradient?: boolean;
  };

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      children,
      isGradient,
      isLoading,
      disabled,
      ...props
    },
    ref
  ) => {
    const { colors } = useColorScheme();

    const isDisabled = disabled || isLoading;

    return (
      <TextClassContext.Provider
        value={buttonTextVariants({
          variant,
          size,
        })}
      >
        <Pressable
          className={cn(
            isDisabled && "opacity-50",
            buttonVariants({ variant, size, className })
          )}
          ref={ref}
          role="button"
          disabled={isDisabled}
          {...props}
        >
          {isGradient && <Gradient />}

          {isLoading ? (
            <ActivityIndicator color={colors.foreground} />
          ) : (
            typeof children !== "function" && children
          )}
        </Pressable>
      </TextClassContext.Provider>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };

const Gradient = () => {
  const { colors } = useColorScheme();

  return (
    <View className="absolute inset-0">
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="h-full w-full"
      />
    </View>
  );
};
