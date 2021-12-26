import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import useUser from "../../../src/components/auth/useUser";
import FollowHeader from "../../../src/components/follow/FollowHeader";
import FollowList from "../../../src/components/follow/FollowList";
import Head from "../../../src/components/main-ui/Head";
import MessagesBar from "../../../src/components/main-ui/MessagesBar";
import RightBar from "../../../src/components/main-ui/rightbar/RightBar";
import {
  useFollowersQuery,
  useUserQuery,
} from "../../../src/generated/graphql";
import { User } from "../../../src/redux/slices/userSlice";
import { createUrqlClient } from "../../../src/utils/createUrqlClient";
import { isServer } from "../../../src/utils/isServer";
interface Props {
  username: string;
}

const Followers = ({ username }: any) => {
  const { user } = useUser();
  const [{ data, fetching }] = useUserQuery({ variables: { username } });
  const [{ data: followersData }] = useFollowersQuery({
    pause: isServer(),
    variables: { username },
  });
  const [followersList, setFollowersList] = useState<User[]>([]);
  useEffect(() => {
    if (followersData?.followers?.edges) {
      setFollowersList(
        followersData?.followers?.edges.map((edge) => edge?.node as User) || []
      );
    }
  }, [followersData?.followers?.edges]);
  return (
    <>
      <Head
        title={`People following ${data?.user?.displayName} (@${data?.user?.username}) | Twitter Clone`}
        description={`People following ${data?.user?.displayName} (@${data?.user?.username}). ${data?.user?.bio}`}
      ></Head>
      <div className="flex min-h-screen justify-center">
        {/* <LeftBar /> */}
        <div className="max-w-[598px] flex-grow">
          <FollowHeader user={data?.user as User} />
          <FollowList
            followLists={followersList}
            setFollowLists={setFollowersList}
          />
        </div>
        <RightBar />
        <MessagesBar />
      </div>
    </>
  );
};
Followers.getInitialProps = (ctx: any) => {
  return { username: ctx.query.username } as Props;
};
export default withUrqlClient(createUrqlClient, { ssr: false })(
  Followers as any
);
