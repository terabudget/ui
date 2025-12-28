import "./LogoText.css";

interface Props {
  className?: string;
}

export const LogoText = ({ className }: Props) => {
  return (
    <div className={`flex h-full font-extrabold text-primary ${className}`}>
      <div className="m-auto ml-0">Terabudget</div>
    </div>
  );
};
