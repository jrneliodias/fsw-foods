"use client";

import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}
const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button
      asChild
      variant={"link"}
      className="font-normal text-muted-foreground hover:text-primary"
    >
      <Link href={href} className="flex items-center gap-2" aria-label={label}>
        {label}
      </Link>
    </Button>
  );
};

export default BackButton;
