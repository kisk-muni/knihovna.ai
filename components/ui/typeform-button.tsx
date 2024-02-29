"use client";
import { PopupButton } from "@typeform/embed-react";
import { ReactNode } from "react";

export default function TypeformButton({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <PopupButton as="div" id={id}>
      {children}
    </PopupButton>
  );
}
