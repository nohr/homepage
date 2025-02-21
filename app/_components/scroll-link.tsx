"use client";

import useQueryString from "@/hooks/useQueryString";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ScrollLink({
  children,
  href,
  scrollTo,
  className = "",
  params = undefined,
}: {
  children: React.ReactNode;
  href: string;
  scrollTo: string | number | HTMLElement;
  className?: string;
  params?: { name: string; value: string };
}) {
  const lenis = useLenis();
  const searchParams = useSearchParams();
  const createQueryString = useQueryString();

  const genParams = () => {
    if (params?.name && params?.value) {
      return createQueryString(params.name, params.value);
    } else {
      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.delete("t");
      return nextSearchParams;
    }
  };

  return (
    <Link
      className={className}
      href={href + genParams()}
      onClick={() => lenis?.scrollTo(scrollTo)}
    >
      {children}
    </Link>
  );
}
