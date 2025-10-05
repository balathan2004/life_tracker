import { ReactNode } from "react";
import { Button, ButtonProps, useTheme } from "react-native-paper";

type Props = ButtonProps & {
  children: ReactNode;
};

export function PrimaryButton({ children, ...props }: Props) {
  const { colors } = useTheme();
  return (
    <Button
      mode="contained"
      style={{
        borderRadius: 10,
      }}
      contentStyle={{
        height: 48,
      }}
      labelStyle={{
        color: colors.onBackground,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
