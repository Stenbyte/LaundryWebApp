import { Button } from "@mui/material";

interface GenericButtonProps {
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  variant?: "text" | "outlined" | "contained";
  onClick?: () => void;
  children: React.ReactNode;
}

export function GenericButton({
  onClick,
  children,
  color,
  variant,
}: GenericButtonProps) {
  return (
    <Button color={color} variant={variant} onClick={onClick}>
      {children}
    </Button>
  );
}
