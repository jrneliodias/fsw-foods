import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href={"/"}>
        <Image src={"/fsw-foods.svg"} width={100} height={30} alt="FSW Foods" />
      </Link>
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
