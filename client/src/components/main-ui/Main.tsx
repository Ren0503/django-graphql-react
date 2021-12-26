import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/slices/userSlice";
import ProfilePic from "./ProfilePic";
import TweetInput from "./tweet/TweetInput";
import TweetPages from "./tweet/TweetPages";

const Main: React.FC<{
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsOpen }) => {
  // const [tweets, setTweets] = useState<tweetObject[]>([]);
  const user = useSelector(getUser);

  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const hasNextCallback = (num: number, next: boolean) => {
    if (num == page) {
      setHasNext(next);
    }
  };
  // useEffect(() => {
  //   const tweetsData = data?.tweets?.edges;
  //   if (!fetching && tweetsData) {
  //     setTweets(tweetsData.map((edge) => edge?.node) as any);
  //   }
  // }, [data, fetching]);
  return (
    <div className="dark:bg-black max-w-[600px] flex-grow min-h-screen">
      <div className="bg-white dark:bg-black px-4 py-2 flex items-center main-border">
        <div className="pr-2 sm:hidden" onClick={() => setIsOpen(true)}>
          <ProfilePic notLink src={user.photo} />
        </div>
        <h1 className="font-extrabold text-xl flex-grow dark:text-gray-200">
          Home
        </h1>
        <div className="text-blue-500 dark:text-white cursor-pointer rounded-full hover:bg-blue-100 dark:hover:bg-trueGray-800 hover:bg-opacity-80 h-10 w-10 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-6 w-6"
            fill="currentColor"
          >
            <g>
              <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
            </g>
          </svg>
        </div>
      </div>
      {user.isAuthenticated && <TweetInput resetPage={() => setPage(1)} />}
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
            />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default Main;