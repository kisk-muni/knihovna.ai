import { getMembers } from "@/app/actions";
import { User } from "@/db/schema";
import { cache } from "react";
import Avatar from "./ui/avatar";

const loadMembers = cache(async () => {
  return await getMembers();
});

const MemberRow = ({ user }: { user: User }) => {
  return (
    <div>
      <div className="px-6 border-b bg-white border-neutral-200 flex items-center space-x-2 py-2.5">
        <Avatar
          src={user.avatar}
          name={user.name}
          href={`/project/members/${user.id}`}
        />
        <span className="grow text-sm text-text">{user.name}</span>
      </div>
    </div>
  );
};

export default async function DashboardMembersList({}: {}) {
  const data = await loadMembers();

  return (
    <div>
      {data.map((user, t) => (
        <MemberRow user={user} key={t} />
      ))}
    </div>
  );
}
