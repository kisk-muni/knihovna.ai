import DashboardMembersList from "@/components/dashboard-members-list";
import { Suspense } from "react";

export default async function MembersPage() {
  return (
    <>
      <div className="bg-white">
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardMembersList />
        </Suspense>
      </div>
    </>
  );
}
