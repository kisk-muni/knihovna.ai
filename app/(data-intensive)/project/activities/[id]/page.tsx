"use client";
import DashboardTodoView from "@/components/dashboard-todo-view";
import { Suspense } from "react";

export default function TodoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardTodoView id={id} />
      </Suspense>
    </>
  );
}
