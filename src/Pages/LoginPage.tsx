import { SubmitHandler, useForm } from "react-hook-form";
import { FormError } from "../components/FormError";
import { ApolloError, gql, useMutation } from "@apollo/client";
import uberLogo from "../images/logo.svg";

import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import { Helmet } from "react-helmet";
import { AuthToken, IsLoggedInVar } from "../apollo";
import { toast, ToastContainer } from "react-toastify";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { Logo } from "../components/Logo";

interface ILoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

export default function LoginPage() {
  const { register, handleSubmit, getValues, formState } = useForm<ILoginForm>({
    mode: "onChange",
  });
  const onCompleted = (data: loginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      AuthToken(token); //useReactiveVar은 렌더링이 다시 일어나는 '훅' 또는 '쿼리'이고 이건 렌더링이 일어나지 않음
      IsLoggedInVar(true);
      toast("Logged in!");
    }
    if (error) {
      console.error(error);
    }
  };
  const [loginMutation, { loading, error, data: loginMutationResult }] =
    useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
      onCompleted,
    });
  const onValid: SubmitHandler<ILoginForm> = (data) => {
    if (!loading) {
      const { email, password } = data;
      loginMutation({
        variables: { loginInput: { email, password } },
      });
    }
  };
  const { errors } = formState;
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Log In | Inuber Eats</title>
      </Helmet>
      <div className="w-full px-5 max-w-screen-sm flex flex-col items-center">
        <Logo logo={uberLogo} alt={"Inuber Eats"} size={52} />
        <h4 className="text-left font-medium w-full text-3xl mb-5">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onValid)}
          className="grid gap-5 mt-5 w-full mb-3"
        >
          <input
            {...register("email", { required: "Email required" })}
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "password must be more than 10 characters",
              },
            })}
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Log In"}
          />
          {loginMutationResult?.login?.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div className="text-emerald-600 hover:underline">
          New to Uber? <Link to={"/create-account"}>Create an acccount</Link>
        </div>
      </div>
    </div>
  );
}
