import { SubmitHandler, useForm } from "react-hook-form";
import { FormError } from "../components/FormError";
import { ApolloError, gql, useMutation } from "@apollo/client";
import uberLogo from "../images/logo.svg";

import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import { Helmet } from "react-helmet";
import { UserRole } from "../__generated__/globalTypes";
import { toast, ToastContainer } from "react-toastify";

interface ICreateAccountFrom {
  email: string;
  password: string;
  role: UserRole;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

export default function CreateAccount() {
  const { register, handleSubmit, getValues, watch, formState } =
    useForm<ICreateAccountFrom>({
      mode: "onChange",
      defaultValues: { role: UserRole.Client },
    });
  const navigate = useNavigate();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { error, ok },
    } = data;
    if (ok) {
      navigate("/");
      alert("Account created! Log in now!");
      toast.success("Account created! Log in now!");
    }
    if (error) {
      console.error(error);
    }
  };
  const [
    createAccountMutation,
    { loading, error, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );
  const onValid: SubmitHandler<ICreateAccountFrom> = (data) => {
    if (!loading) {
      const { email, password, role } = data;
      createAccountMutation({
        variables: { createAccountInput: { email, password, role } },
      });
    }
  };
  console.log(watch());
  const { errors } = formState;
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>Create Account | Inuber Eats</Helmet>
      <div className="w-full px-5 max-w-screen-sm flex flex-col items-center">
        <img src={uberLogo} className="w-52 mb-10 " />
        <h4 className="text-left font-medium w-full text-3xl mb-5">
          Let's get started.
        </h4>
        <form
          onSubmit={handleSubmit(onValid)}
          className="grid gap-5 mt-5 w-full mb-3"
        >
          <input
            {...register("email", {
              required: "Email required",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "It's not a valid email input",
              },
            })}
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
          <select {...register("role", { required: true })} className={"input"}>
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Create Account"}
          />
          {createAccountMutationResult?.createAccount?.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            />
          )}
        </form>
        <div className="text-emerald-600 hover:underline">
          Already have an account? <Link to={"/"}>Log in now</Link>
        </div>
      </div>
    </div>
  );
}
