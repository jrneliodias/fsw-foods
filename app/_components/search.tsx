import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Search() {
  return (
    <div className="flex gap-4 ">
      <Input placeholder="Buscar restaurantes" className="border-none" />
      <Button size={"icon"}>
        <SearchIcon size={18} />
      </Button>
    </div>
  );
}
