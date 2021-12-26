import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TweetDetailQuery } from "../../../generated/graphql";
import { User } from "../../../redux/slices/userSlice";
import { isServer } from "../../../utils/isServer";
import useUser from "../../auth/useUser";
import ReplyInput from "./ReplyInput";
import Tweet from "./Tweet";
import TweetPages from "./TweetPages";

interface Props {
  data?: TweetDetailQuery;
}

const TweetDetail: React.FC<Props> = ({ data }) => {
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const { user } = useUser(false);

  const hasNextCallback = (num: number, next: boolean) => {
    if (num == page) {
      setHasNext(next);
    }
  };
  return (
    <div className="bg-gray-100 dark:bg-black dark:border dark:border-gray_dark max-w-[600px] flex-grow min-h-screen main-border">
      {data?.tweet && (
        <>
          <Tweet tweet={data.tweet as any} />
          {user.isAuthenticated ? (
            <ReplyInput
              tweetUser={data.tweet.user as User}
              tweetId={data.tweet.pk as number}
            />
          ) : (
            <h4 className="text-center bg-white mx-1 text-gray-400 p-2">
              Login to reply
            </h4>
          )}
          {!isServer() && (
            <InfiniteScroll
              dataLength={page} //This is important field to render the next data
              next={() => setPage(page + 1)}
              hasMore={hasNext}
              loader={<h4 className="text-center my-2">Loading...</h4>}
            >
              {Array(page)
                .fill(0)
                .map((val, index) => (
                  <TweetPages
                    page={index + 1}
                    key={index}
                    hasNextCallback={hasNextCallback}
                    commentTo={data.tweet?.pk || undefined}
                  />
                ))}
            </InfiniteScroll>
          )}
        </>
      )}
    </div>
  );
};

export default TweetDetail;
