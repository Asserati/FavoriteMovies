import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { RootState } from "../redux/store";
import Modal from "./Modal";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

export enum AuthState {
  SignIn = "signin",
  SignUp = "signup",
}

const AuthModal = () => {
  const { authModalOpen } = useSelector((state: RootState) => state.authModal);

  const dispatch = useDispatch();

  const [action, setAction] = useState<AuthState>(AuthState.SignIn);

  useEffect(() => {
    if (authModalOpen) setAction(AuthState.SignIn);
  }, [authModalOpen]);

  const handleClose = () => dispatch(setAuthModalOpen(false));

  const switchToSignIn = () => setAction(AuthState.SignIn);
  const switchToSignUp = () => setAction(AuthState.SignUp);

  return (
    <Modal onClose={handleClose}>
      {action === AuthState.SignIn && (
        <SignInForm switchAuthState={switchToSignUp} />
      )}
      {action === AuthState.SignUp && (
        <SignUpForm switchAuthState={switchToSignIn} />
      )}
    </Modal>
  );
};

export default AuthModal;
