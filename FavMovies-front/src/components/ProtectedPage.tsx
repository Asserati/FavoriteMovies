import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { RootState } from "../redux/store";
import ErrorBlock from "./UI/ErrorBlock";

type ProtectedPageProps = {
  children: ReactNode;
};

const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(setAuthModalOpen(!user));
  }, [user, dispatch]);

  return user ? (
    children
  ) : (
    <ErrorBlock message="You must sign in to proceed in this page" />
  );
};

export default ProtectedPage;
