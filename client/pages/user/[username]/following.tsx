import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import useUser from "../../../src/components/auth/useUser";
import FollowHeader from "../../../src/components/follow/FollowHeader";
import FollowList from "../../../src/components/follow/FollowList";
import Head from "../../../src/components/main-ui/Head";
import MessagesBar from "../../../src/components/main-ui/MessagesBar";
import RightBar from "../../../src/components/main-ui/rightbar/RightBar";
import {
  useFollowingQuery,
  useUserQuery,
} from "../../../src/generated/graphql";
import { User } from "../../../src/redux/slices/userSlice";
import { createUrqlClient } from "../../../src/utils/createUrqlClient";
import { isServer } from "../../../src/utils/isServer";
interface Props {
  username: string;
}

const Following = ({ username }: any) => {
  const { user } = useUser();
  const [{ data }] = useUserQuery({ variables: { username } });
  const [{ data: followingData }] = useFollowingQuery({
    pause: isServer(),
    variables: { username },
  });
  const [followingList, setFollowingList] = useState<User[]>([]);
  useEffect(() => {
    if (followingData?.following?.edges) {
      setFollowingList(
        followingData?.following?.edges.map((edge) => edge?.node as User) || []
      );
    }
  }, [followingData?.following?.edges]);
  return (
    <>
      <Head
        title={`People followed by ${data?.user?.displayName} (@${data?.user?.username}) | Twitter Clone`}
        description={`People followed by ${data?.user?.displayName} (@${data?.user?.username}). ${data?.user?.bio}`}
      ></Head>
      <div className="flex min-h-screen justify-center">
        {/* <LeftBar /> */}
        <div className="max-w-[598px] flex-grow">
          <FollowHeader user={data?.user as User} />
          <FollowList
            followLists={followingList}
            setFollowLists={setFollowingList}
          />
        </div>
        <RightBar />
        <MessagesBar />
      </div>
    </>
  );
};
Following.getInitialProps = (ctx: any) => {
  return { username: ctx.query.username } as Props;
};
export default withUrqlClient(createUrqlClient, { ssr: false })(
  Following as any
);
