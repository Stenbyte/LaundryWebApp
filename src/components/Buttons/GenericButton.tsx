import { Button } from "@mui/material";

interface GenericButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
}

export function GenericButton({
  onClick,
  children,
  className,
  type,
}: GenericButtonProps) {
  return (
    <Button className={className} onClick={onClick} type={type}>
      {children}
    </Button>
  );
}
