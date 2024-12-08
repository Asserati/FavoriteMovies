import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import userApi from "../api/modules/user.api";
import { setUser } from "../redux/features/userSlice";
import { InfoApiResponse, ResponseError } from "../../../lib/types";
import toast from "react-hot-toast";

const useUserInfo = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("actkn");
  const {
    data: userInfo,
    isError,
    error: userError,
  } = useQuery<{ response: InfoApiResponse }, ResponseError>({
    queryKey: ["user"],
    queryFn: () => userApi.getInfo(),
    enabled: !!token,
  });

  useEffect(() => {
    if (userInfo && userInfo.response) {
      dispatch(
        setUser({
          id: userInfo.response.payload.sub,
          username: userInfo.response.payload.name,
        })
      );
    }
    if (isError) {
      localStorage.removeItem("actkn");
      toast("Login session has expired", { icon: "🥺" });
    }
  }, [userInfo, userError, dispatch]);
};

export default useUserInfo;
