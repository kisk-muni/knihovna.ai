"use client";
/* eslint-disable @next/next/no-img-element */
import { User } from "@/db/schema";
import classNames from "classnames";
import { Tooltip, TooltipTrigger } from "./tooltip";
import { Button, Dialog, DialogTrigger, Popover } from "react-aria-components";
import Avatar from "./avatar";
import { ListBox, ListBoxItem } from "./list-box";

export default function UserList({
  users,
  className,
}: {
  users: { user: User }[];
  className?: string;
}) {
  const maxUsers = 3;
  const displayedUsers = users.slice(0, maxUsers);
  const remainingUsers = users.slice(maxUsers);
  return (
    <div
      className={classNames(
        "flex flex-wrap -ml-1.5 relative items-center",
        className
      )}
    >
      {(remainingUsers.length === 1 ? users : displayedUsers)?.map(
        ({ user }, i) => (
          <TooltipTrigger key={i} delay={0}>
            <Avatar
              href={`/project/members/${user.id}`}
              src={user.avatar}
              name={user.name}
            />
            <Tooltip>{user.name}</Tooltip>
          </TooltipTrigger>
        )
      )}
      {remainingUsers.length > 1 && (
        <DialogTrigger>
          <Button
            className={
              "block text-text rounded-full h-6 w-6 hover:bg-neutral-100 ring-white text-[13px] ml-0.5 -mr-1 outline-0"
            }
          >
            +{remainingUsers.length}
          </Button>
          <Popover aria-label={`Zbylí uživatelé ${remainingUsers.length}`}>
            <Dialog
              className={
                "outline-0 bg-white shadow-lg overflow-hidden rounded-lg"
              }
            >
              <ListBox
                orientation="vertical"
                aria-label="Zbývající uživatelé"
                autoFocus
                className="p-0"
              >
                {users.slice(maxUsers).map(({ user }, i) => (
                  <ListBoxItem key={i} href={`/project/members/${user.id}`}>
                    <div className="block h-5 w-5 -ml-0.5 bg-hover rounded-full ring-1 ring-white overflow-hidden">
                      {user.avatar && (
                        <Avatar
                          name={user.name}
                          src={user.avatar}
                          href={`/project/members/${user.id}`}
                        />
                      )}
                    </div>{" "}
                    <span className="text-text-700 text-sm">{user.name}</span>
                  </ListBoxItem>
                ))}
              </ListBox>
            </Dialog>
          </Popover>
        </DialogTrigger>
      )}
    </div>
  );
}
