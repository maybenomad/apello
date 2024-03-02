import csx from "../lib/csx";

const ButtonVariant = {
  Standard: "standard",
  Outline: "outline",
};

export default function Button({
  variant = ButtonVariant.Standard,
  onClick = (e: any) => {},
  children,
}) {
  return (
    <button
      className={csx(
        "relative flex items-center justify-center gap-x-4",
        "px-[1.4em] py-[0.6em]",
        "rounded-xl",
        "border-2 border-apello",
        "tracking-wider",
        "duration-200",
        "hover:brightness-[0.8]",
        "active:brightness-[1.2]",
        variant === ButtonVariant.Standard && "bg-apello",
        variant === ButtonVariant.Outline ? "text-apello" : "text-fauxblack"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
