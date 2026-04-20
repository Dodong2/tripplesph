// components/ui/Button.tsx
type ButtonProps = {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = ({
  variant = "primary",
  children,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const base = "px-4 py-2 rounded font-medium transition";

  const styles = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-white text-blue-600 border border-blue-600",
  };

  const disabledStyle = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant]} ${
        disabled ? disabledStyle : ""
      }`}
    >
      {children}
    </button>
  );
};