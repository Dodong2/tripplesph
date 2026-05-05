interface BadgeProps {
  children: React.ReactNode;
  variant?: "light" | "dark";
}

export default function Badge({ children, variant = "light" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center h-9 px-3.5 rounded-full border border-[#a3f4fd] font-['Poppins'] font-bold text-[11px] text-[#0088bf] mb-4 ${
        variant === "dark" ? "bg-white" : "bg-gradient-to-r from-[#ccfbf1] via-[#cffafe] to-[#a5f3fc]"
      }`}
    >
      {children}
    </span>
  );
}
