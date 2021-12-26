import React, { useEffect } from "react";
import { useGetTweetsQuery } from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import Tweet from "./Tweet";

const TweetPages: React.FC<{
  commentTo?: number;
  username?: string;
  page: number;
  hasNextCallback: (num: number, next: boolean) => void;
}> = ({ page, hasNextCallback, commentTo, username }) => {
  const [{ data, fetching }] = useGetTweetsQuery({
    pause: isServer(),
    variables: {
      excludeComment: commentTo === undefined,
      timeline: commentTo === undefined,
      username: username,
      first: 10,
      offset: (page - 1) * 10,
      commentToPk: commentTo,
    },
  });
  useEffect(() => {
    hasNextCallback(page, data?.tweets?.pageInfo.hasNextPage || false);
  }, [data?.tweets?.pageInfo.hasNextPage, hasNextCallback, page]);
  return (
    <>
      {data?.tweets?.edges.map((tw, idx) => (
        <Tweet key={idx} tweet={tw?.node as any} />
      ))}
    </>
  );
};

export default TweetPages;
