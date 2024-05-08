"use client";
/* eslint-disable react/display-name */
import React from "react";
import classNames from "classnames";
import * as Accordion from "@radix-ui/react-accordion";
import { IconCaretRight } from "./icons";

export const AccordionRoot = Accordion.Root;

export const AccordionItem = React.forwardRef(
  (
    {
      children,
      className,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
    } & Accordion.AccordionItemProps,
    forwardedRef: React.ForwardedRef<HTMLDivElement> | undefined
  ) => (
    <Accordion.Item
      className={classNames(
        "focus-within:shadow-primary mt-px overflow-hidden first:mt-0 first:rounded-t-xl last:rounded-b-xl focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  )
);

export const AccordionTrigger = React.forwardRef(
  (
    { children, className, ...props }: Accordion.AccordionTriggerProps,
    forwardedRef: React.Ref<HTMLButtonElement> | undefined
  ) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={classNames(
          "text-text font-medium shadow-neutral-100 hover:bg-primary-50 group flex h-16 flex-1 cursor-default items-center justify-between shadow-[0_1px_0] bg-white px-8  leading-none outline-none",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <IconCaretRight
          className="text-text-700 w-5 h-5 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 rotate-90 group-data-[state=open]:-rotate-90"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

export const AccordionContent = React.forwardRef(
  (
    { children, className, ...props }: Accordion.AccordionContentProps,
    forwardedRef: React.Ref<HTMLDivElement> | undefined
  ) => (
    <Accordion.Content
      className={classNames(
        "text-text-000 bg-muted data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden ",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="py-6 px-8">{children}</div>
    </Accordion.Content>
  )
);
