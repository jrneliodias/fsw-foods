import { Lock } from "lucide-react";

interface HeaderProps {
  label: string;
}

const AuthHeader = ({ label }: HeaderProps) => {
  return (
    <header className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className="flex items-center gap-2 text-3xl font-bold">
        {" "}
        <Lock /> Auth
      </h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </header>
  );
};

export default AuthHeader;
