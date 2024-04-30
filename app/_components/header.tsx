import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Image src={"/fsw-foods.svg"} width={100} height={30} alt="FSW Foods" />
      <Button
        size={"icon"}
        variant={"outline"}
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};
