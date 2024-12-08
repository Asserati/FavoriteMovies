import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TSignUpSchema, signUpSchema } from "../zod-types";
import { Logo } from "./Logo";
import { useAnimate } from "framer-motion";
import userApi from "../api/modules/user.api";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import toast from "react-hot-toast";
import { ResponseError, SignApiResponse } from "../../../lib/types";
import { RootState } from "../redux/store";
export type TSignForm = {
  switchAuthState: () => void;
};

export const SignUpForm = ({ switchAuthState }: TSignForm) => {
  const [scope, animate] = useAnimate();
  const dispatch = useDispatch();

  const { themeMode } = useSelector((state: RootState) => state.themeMode);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate } = useMutation<
    {
      response: SignApiResponse;
    },
    ResponseError,
    { username: string; password: string }
  >({
    mutationFn: userApi.signup,
    onSuccess: (data) => {
      if (data.response) {
        dispatch(setUser(data.response));
        dispatch(setAuthModalOpen(false));
      }
    },
    onError: (error) => {
      toast.error(error.info || "Can't sign up");
    },
  });

  const onSubmit = async (data: TSignUpSchema) => {
    mutate({ username: data.username, password: data.password });
  };

  if (errors.username || errors.password || errors.confirmPassword) {
    animate("input", {
      x: [3, 0],
    });
  }

  return (
    <>
      <Logo className={`logo__form  ${themeMode}`} />
      <form
        className={`sign-modal ${themeMode}`}
        id="sign-up"
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
        <label htmlFor="confirmPassword">
          <p>Confirm password</p>
        </label>
        <input
          {...register("confirmPassword")}
          name="confirmPassword"
          type="password"
        />
        {errors.confirmPassword && (
          <p className="p-error">{`${errors.confirmPassword.message}`}</p>
        )}

        <button disabled={isSubmitting} type="submit" className="button-form">
          Sign Up
        </button>
        <button
          className=" button-form button-form__secondary"
          onClick={switchAuthState}
        >
          Sign In
        </button>
      </form>
    </>
  );
};
