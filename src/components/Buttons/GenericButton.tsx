import { Button } from "@mui/material";

interface GenericButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export function GenericButton({
  onClick,
  children,
  className,
}: GenericButtonProps) {
  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  );
}
