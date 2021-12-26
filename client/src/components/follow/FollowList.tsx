import Link from "next/link";
import React, { useState } from "react";
import { useFollowMutation } from "../../generated/graphql";
import { User } from "../../redux/slices/userSlice";
import Private from "../icons/Private";
import Verified from "../icons/Verified";
import ProfilePic from "../main-ui/ProfilePic";
interface Props {
  followLists: User[];
  setFollowLists: React.Dispatch<React.SetStateAction<User[]>>;
}

export const FollowButton: React.FC<{
  isSelf?: boolean;
  isFollowed?: boolean;
  isRequested?: boolean;
  followCallback: () => void;
}> = ({ isSelf, isFollowed, followCallback, isRequested }) => {
  const [isHover, setIsHover] = useState(false);
  if (isSelf) return null;
  return (
    <button
      className={`font-semibold rounded-full px-4 border border-blue-500 ${
        isFollowed
          ? "bg-blue-500 dark:bg-black text-white hover:bg-red-700 hover:border-red-700 dark:hover:border-red-700 dark:border-trueGray-600 dark:hover:text-red-700"
          : "text-blue-500 dark:text-black dark:hover:bg-opacity-80 dark:bg-white hover:bg-blue-100"
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={followCallback}
    >
      {isFollowed
        ? isHover
          ? "Unfollow"
          : "Following"
        : isRequested
        ? "Cancel"
        : "Follow"}
    </button>
  );
};

const FollowList: React.FC<Props> = ({ followLists, setFollowLists }) => {
  const [, follow] = useFollowMutation();
  const followCallback = (userId?: number) => {
    if (userId) {
      follow({ userId }).then((res) => {
        if (res.data?.follow?.success) {
          setFollowLists((fs) =>
            fs.map((f) =>
              f.pk === userId ? { ...f, isFollowed: !f.isFollowed } : f
            )
          );
        }
      });
    }
  };
  return (
    <div className="w-full flex flex-col">
      {followLists.map((f) => (
        <div key={f.pk} className="flex p-2 space-x-4 main-border">
          <div className="flex-shrink-0">
            <ProfilePic src={f.photo} username={f.username} />
          </div>
          <div className="flex flex-grow flex-col">
            <div className="flex justify-between">
              <div className="leading-none">
                <div className="flex">
                  <Link href={`/user/${f.username}`}>
                    <a className="font-bold hover:underline">{f.displayName}</a>
                  </Link>
                  {f.private && <Private />}
                  {f.verified && <Verified />}
                </div>
                <span className="text-gray-600 dark:text-trueGray-500">
                  @{f.username}
                </span>
              </div>
              {
                <FollowButton
                  isSelf={f.isSelf}
                  isFollowed={f.isFollowed}
                  isRequested={f.isRequested}
                  followCallback={() => followCallback(f.pk)}
                />
              }
            </div>
            <p className="mt-1 text-gray-700">{f.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowList;
