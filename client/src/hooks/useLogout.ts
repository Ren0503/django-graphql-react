import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { resetUser } from "../redux/slices/userSlice";

const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch(resetUser);
    router.push("/auth/login");
  };
  return { logout };
};

export default useLogout;
