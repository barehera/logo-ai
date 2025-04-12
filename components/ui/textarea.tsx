import * as React from "react";
import { TextInput, View, type TextInputProps } from "react-native";
import { cn } from "@/lib/utils";
import { useColorScheme } from "@/lib/useColorScheme";
import { Text } from "./text";

const Textarea = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps
>(
  (
    {
      className,
      multiline = true,
      numberOfLines = 6,
      placeholderClassName,
      ...props
    },
    ref
  ) => {
    const { colors } = useColorScheme();

    return (
      <View>
        <TextInput
          ref={ref}
          className={cn(
            "min-h-[175px] w-full rounded-2xl bg-input p-3 native:text-lg native:leading-[1.25] text-foreground border border-transparent focus:border-foreground caret-foreground",
            props.editable === false && "opacity-50",
            className
          )}
          placeholderTextColor={colors.mutedForeground}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical="top"
          {...props}
        />

        {props.maxLength && (
          <MaxLengthCounter
            value={props.value?.length ?? 0}
            maxLength={props.maxLength}
          />
        )}
      </View>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };

const MaxLengthCounter = ({
  value,
  maxLength,
}: {
  value: number;
  maxLength: number;
}) => {
  return (
    <View className="absolute bottom-4 left-3">
      <Text className="text-muted-foreground text-xs">
        {value}/{maxLength}
      </Text>
    </View>
  );
};
