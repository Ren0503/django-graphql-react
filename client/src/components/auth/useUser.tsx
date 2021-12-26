import { useDispatch, useSelector } from "react-redux";
import { useMeQuery } from "../../generated/graphql";
import { getUser, setUser, User } from "../../redux/slices/userSlice";
import { isServer } from "../../utils/isServer";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useUser = (redirect = true) => {
  const user = useSelector(getUser);
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (!fetching) {
      if (data?.me) {
        dispatch(setUser(data.me as User));
      } else if (redirect) {
        router.push("/auth/login");
      }
    }
  }, [fetching, data, dispatch, redirect, router]);
  return { user, loading: fetching };
};

export default useUser;
