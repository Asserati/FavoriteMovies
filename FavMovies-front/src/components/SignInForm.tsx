import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TSignInSchema, signInSchema } from "../zod-types";
import { Logo } from "./Logo";
import { TSignForm } from "./SignUpForm";
import { useAnimate, stagger } from "framer-motion";
import userApi from "../api/modules/user.api";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { ResponseError, SignApiResponse } from "../../../lib/types";
import toast from "react-hot-toast";
import { RootState } from "../redux/store";

export const SignInForm = ({ switchAuthState }: TSignForm) => {
  const [scope, animate] = useAnimate();
  const dispatch = useDispatch();

  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const { mutate } = useMutation<
    {
      response: SignApiResponse;
    },
    ResponseError,
    { username: string; password: string }
  >({
    mutationFn: userApi.signin,
    onSuccess: (data) => {
      if (data.response) {
        dispatch(setUser(data.response));
        dispatch(setAuthModalOpen(false));
      }
    },
    onError: (error) => {
      toast.error(error.info || "Can't sign in");
    },
  });
  const onSubmit = async (data: TSignInSchema) => {
    mutate(data);
  };

  if (errors.username || errors.password) {
    animate(
      "input",
      { x: [3, 0] },
      { duration: 1, type: "spring", delay: stagger(0.05) }
    );
  }

  return (
    <>
      <Logo className={`logo__form  ${themeMode}`} />
      <form
        id="sign-in"
        className={`sign-modal ${themeMode}`}
        onSubmit={handleSubmit(onSubmit)}
        ref={scope}
      >
        <label htmlFor="username">
          <p>Username</p>
        </label>
        <input {...register("username")} name="username" />
        {errors.username && (
          <p className="p-error">{`${errors.username.message}`}</p>
        )}

        <label htmlFor="password">
          <p>Password</p>
        </label>
        <input {...register("password")} name="password" type="password" />
        {errors.password && (
          <p className="p-error">{`${errors.password.message}`}</p>
        )}
        <div className="sign-actions">
          <button disabled={isSubmitting} type="submit" className="button-form">
            Sign In
          </button>
          <button
            type="button"
            className="button-form button-form__secondary"
            onClick={switchAuthState}
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};
