import { Button } from "@mui/material";

interface GenericButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

export function GenericButton({
  onClick,
  children,
  className,
  type,
  disabled,
}: GenericButtonProps) {
  return (
    <Button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
