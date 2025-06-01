import { Button } from "@mui/material";

interface GenericButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  testid?: string;
}

export function GenericButton({
  onClick,
  children,
  className,
  type,
  disabled,
  testid,
}: GenericButtonProps) {
  return (
    <Button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      data-testid={testid}
    >
      {children}
    </Button>
  );
}
