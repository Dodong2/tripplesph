interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  children: React.ReactNode;
}

export default function Button({ variant = "primary", children, className = "", ...rest }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full font-['Poppins'] font-medium cursor-pointer transition-opacity hover:opacity-90 px-6 h-10 text-base";
  const styles: Record<string, string> = {
    primary: "bg-[#197996] text-white border-none",
    outline: "border-2 border-[#0092b8] text-[#0092b8] bg-transparent",
    ghost: "border border-[#0092b8] text-[#0092b8] bg-transparent",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
