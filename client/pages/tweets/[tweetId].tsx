import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import useUser from "../../src/components/auth/useUser";
import Head from "../../src/components/main-ui/Head";
import LeftBar from "../../src/components/main-ui/LeftBar";
import MessagesBar from "../../src/components/main-ui/MessagesBar";
import RightBar from "../../src/components/main-ui/rightbar/RightBar";
import TweetDetail from "../../src/components/main-ui/tweet/TweetDetail";
import {
  useRefetchDataMutation,
  useTweetDetailQuery,
} from "../../src/generated/graphql";
import { createUrqlClient } from "../../src/utils/createUrqlClient";
interface Props {
  tweetId: string;
}
const TweetDetailPage: NextPage<Props> = ({ tweetId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useUser(false);
  const [{ data, fetching }] = useTweetDetailQuery({
    variables: { id: parseInt(tweetId) },
  });
  const [, refetch] = useRefetchDataMutation();

  useEffect(() => {
    if (data?.tweet?.user?.private) {
      refetch({
        data: JSON.stringify({ query: "tweet", id: parseInt(tweetId) }),
      });
    }
  }, [data?.tweet?.user?.private, refetch, tweetId]);
  return (
    <div>
      <Head
        title={`${data?.tweet?.user?.username || "Tweet"} | Twitter Clone`}
        description={`${data?.tweet?.text || "Tweet text"}`}
        imageURL={data?.tweet?.user?.photo || undefined}
      ></Head>
      <div className="flex min-h-screen justify-center">
        <LeftBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <TweetDetail data={data} />
        <RightBar />
        <MessagesBar />
      </div>
    </div>
  );
};

TweetDetailPage.getInitialProps = (ctx) => {
  return { tweetId: ctx.query.tweetId } as Props;
};
export default withUrqlClient(createUrqlClient, { ssr: true })(
  TweetDetailPage as any
);
