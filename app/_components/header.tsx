"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "./ui/separator";
import Search from "./search";

interface HeaderProps {
  haveSearchbar: boolean;
}
export const Header = ({ haveSearchbar }: HeaderProps) => {
  const { data } = useSession();

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();
  return (
    <div className="flex items-center justify-between bg-white px-5 py-5 pt-6 md:px-20 lg:px-32">
      <Link href={"/"}>
        <Image
          src={"/fsw-foods.svg"}
          width={0}
          height={0}
          sizes="100%"
          alt="FSW Foods"
          className=" h-8 w-auto sm:h-12"
        />
      </Link>
      {haveSearchbar && (
        <div className="hidden w-1/2 md:block">
          <Search />
        </div>
      )}

      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          {data?.user ? (
            <div className="flex flex-col gap-5">
              <div className="mt-6 flex justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string | undefined}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.split(" ")[0][0]}
                      {data?.user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{data.user.name}</h3>
                    <p className=" text-xs text-muted-foreground">
                      {data.user.email}
                    </p>
                  </div>
                </div>
              </div>
              <Separator className="bg-[#cfcdcd]" />
              <div>
                <div className="space-y-2">
                  <Button
                    variant={"ghost"}
                    className="flex w-full justify-start gap-3 rounded-full px-5 text-sm font-normal"
                    asChild
                  >
                    <Link href={"/"}>
                      <HomeIcon size={16} />
                      <p>Início</p>
                    </Link>
                  </Button>

                  <Button
                    variant={"ghost"}
                    className="flex w-full justify-start gap-3 rounded-full px-5 text-sm font-normal"
                    asChild
                  >
                    <Link href={"/my-orders"}>
                      <ScrollTextIcon size={16} />
                      <p>Meus Pedidos</p>
                    </Link>
                  </Button>

                  <Button
                    variant={"ghost"}
                    className="flex w-full justify-start gap-3 rounded-full px-5 text-sm font-normal"
                    asChild
                  >
                    <Link href={"/favorites-restaurants"}>
                      <HeartIcon size={16} />
                      <p>Restaurantes Favoritos</p>
                    </Link>
                  </Button>
                </div>
                <Separator className="my-6 bg-[#cfcdcd]" />
                <Button
                  variant={"ghost"}
                  className="flex w-full justify-start gap-3 rounded-full px-5 text-sm font-normal"
                  onClick={handleSignOutClick}
                >
                  <LogOutIcon size={16} />
                  <p>Sair da conta</p>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Faça seu Login</h2>
                <Button size={"icon"} onClick={handleSignInClick}>
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
