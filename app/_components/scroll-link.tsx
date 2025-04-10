"use client";

import useQueryString from "@/hooks/useQueryString";
import { useLenis } from "lenis/react";
import Link from "next/link";
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
  const createQueryString = useQueryString();

  return (
    <Link
      className={className}
      href={href + createQueryString(params?.name, params?.value)}
      onClick={() => lenis?.scrollTo(scrollTo)}
    >
      {children}
    </Link>
  );
}
