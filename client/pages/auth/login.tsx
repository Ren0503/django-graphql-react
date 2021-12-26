import { Dialog } from "@headlessui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Head from "../../src/components/main-ui/Head";
import Modal from "../../src/components/main-ui/modals/Modal";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../src/generated/graphql";
import { setUser, User } from "../../src/redux/slices/userSlice";
import { createUrqlClient } from "../../src/utils/createUrqlClient";
import toErrorMap from "../../src/utils/toErrorMap";

interface RegisterErrors {
  username?: string;
  displayName?: string;
  email?: string;
  password?: string;
  password2?: string;
}

interface LoginErrors {
  username?: string;
  password?: string;
}
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Login = () => {
  const dispatch = useDispatch();
  const [, register] = useRegisterMutation();
  const [, login] = useLoginMutation();
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();
  const [registerState, setRegisterState] = useState({
    username: "",
    displayName: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [loginState, setLoginState] = useState({ username: "", password: "" });
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({});
  const [registerErrors, setRegisterErrors] = useState<RegisterErrors>({});
  const handleRegisterForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    register(registerState).then((res) => {
      const data = res.data?.register;
      if (data) {
        if (data.success) {
          localStorage.setItem("token", data.token || "");
          localStorage.setItem("refreshToken", data.refreshToken || "");
          window.location.replace(window.location.origin);
        } else {
          const errors = data.errors;
          setRegisterErrors(toErrorMap(errors));
        }
      }
    });
  };
  const handleLoginForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const variables: any = { password: loginState.password };
    const username = loginState.username;
    if (username.match(regexEmail)) {
      variables.email = username;
    } else {
      variables.username = username;
    }
    login(variables).then((value) => {
      const data = value.data?.tokenAuth;
      if (data) {
        if (data.success) {
          localStorage.setItem("token", data.token || "");
          localStorage.setItem("refreshToken", data.refreshToken || "");
          dispatch(setUser(data.user as User));
          window.location.replace(window.location.origin);
        } else {
          setLoginErrors({ password: "Invalid username or password" });
        }
      }
    });
  };
  return (
    <>
      <Head title="Log in on Twitter" description="Log in on Twitter" />
      <div className="w-full max-w-lg mx-auto p-4 flex justify-center flex-wrap">
        <div className="w-full flex justify-center">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-12 w-12 text-blue-500"
            fill="currentColor"
          >
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
        <h1 className="font-bold text-2xl w-full text-center my-4">
          Log in to Twitter
        </h1>
        <form className="w-full" onSubmit={handleLoginForm}>
          <div className="rounded border border-gray-400 focus-within:ring-1 focus-within:ring-blue-500 relative">
            <input
              className="block bg-transparent outline-none w-full px-2 pb-1 text-gray-600 dark:text-gray-200 mt-4"
              placeholder=" "
              value={loginState.username}
              onChange={(e) =>
                setLoginState({ ...loginState, username: e.target.value })
              }
            />
            <label className="px-2 text-sm absolute top-3 z-[-1] duration-300 origin-[0%]">
              Username or Email
            </label>
          </div>
          <div className="rounded border border-gray-400 focus-within:ring-1 focus-within:ring-blue-500 relative mt-4">
            <input
              className="block bg-transparent outline-none w-full px-2 pb-1 text-gray-600 dark:text-gray-200 mt-4"
              placeholder=" "
              type="password"
              value={loginState.password}
              onChange={(e) =>
                setLoginState({ ...loginState, password: e.target.value })
              }
            />
            <label className="px-2 text-sm absolute top-3 z-[-1] duration-300 origin-[0%]">
              Password
            </label>
          </div>
          <p className="error-label">{loginErrors.password}</p>
          <button className="bg-blue-500 text-white font-bold w-full text-center rounded-full p-3 hover:bg-blue-300 my-4">
            Log in
          </button>
          <p className="text-center">
            <span
              className="cursor-pointer text-sm hover:underline text-blue-500 font-medium"
              onClick={() => setIsRegister(true)}
            >
              Sign up for Twitter
            </span>
          </p>
        </form>
      </div>
      <Modal onClose={() => setIsRegister(false)} open={isRegister}>
        <div className="w-full flex justify-center mt-2">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-8 w-8 text-blue-500"
            fill="currentColor"
          >
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
        <Dialog.Title className="font-bold text-2xl w-full my-2">
          Create your account
        </Dialog.Title>
        <form
          onSubmit={handleRegisterForm}
          className="w-full flex flex-col mb-4"
          autoComplete="off"
        >
          <div className="rounded border border-gray-400 focus-within:ring-1 focus-within:ring-blue-500 relative">
            <input
              className="block bg-transparent outline-none w-full px-2 pb-1 text-gray-600 dark:text-gray-200 mt-4"
              placeholder=" "
              value={registerState.username}
              onChange={(e) =>
                setRegisterState({
                  ...registerState,
                  username: e.target.value,
                })
              }
              autoComplete="off"
            />
            <label className="px-2 text-sm absolute top-3 z-[-1] duration-300 origin-[0%]">
              Username
            </label>
          </div>
          <p className="error-label">{registerErrors.username}</p>
          <div className="rounded border border-gray-400 focus-within:ring-1 focus-within:ring-blue-500 relative mt-4">
            <input
              className="block bg-transparent outline-none w-full px-2 pb-1 text-gray-600 dark:text-gray-200 mt-4"
              placeholder=" "
              value={registerState.email}
              onChange={(e) =>
                setRegisterState({
                  ...registerState,
                  email: e.target.value,
                })
              }
              autoComplete="off"
            />
            <label className="px-2 text-sm absolute top-3 z-[-1] duration-300 origin-[0%]">
              Email
            </label>
          </div>
          <p className="error-label">{registerErrors.email}</p>
          <div className="rounded border border-gray-400 focus-within:ring-1 focus-within:ring-blue-500 relative mt-4">
            <input
              className="block bg-transparent outline-none w-full px-2 pb-1 text-gray-600 dark:text-gray-200 mt-4"
              placeholder=" "
              value={registerState.displayName}
              onChange={(e) =>
                setRegisterState({
                  ...registerState,
                  displayName: e.target.value,
                })
              }
              autoComplete="off"
            />
            <label className="px-2 text-sm absolute top-3 z-[-1] duration-300 origin-[0%]">
              Display Name
            </label>
          </div>
          <p className="error-label">{registerErrors.displayName}</p>
          <div className="rounded border border-gray-400 focus-within:ring-1 focus-within:ring-blue-500 relative mt-4">
            <input
              className="block bg-transparent outline-none w-full px-2 pb-1 text-gray-600 dark:text-gray-200 mt-4"
              placeholder=" "
              type="password"
              value={registerState.password1}
              onChange={(e) =>
                setRegisterState({
                  ...registerState,
                  password1: e.target.value,
                })
              }
              autoComplete="off"
            />
            <label className="px-2 text-sm absolute top-3 z-[-1] duration-300 origin-[0%]">
              Password
            </label>
          </div>
          <p className="error-label">{registerErrors.password}</p>
          <div className="rounded border border-gray-400 focus-within:ring-1 focus-within:ring-blue-500 relative">
            <input
              className="block bg-transparent outline-none w-full px-2 pb-1 text-gray-600 dark:text-gray-200 mt-4"
              placeholder=" "
              type="password"
              value={registerState.password2}
              onChange={(e) =>
                setRegisterState({
                  ...registerState,
                  password2: e.target.value,
                })
              }
              autoComplete="off"
            />
            <label className="px-2 text-sm absolute top-3 z-[-1] duration-300 origin-[0%]">
              Confirm Password
            </label>
          </div>
          <p className="error-label">{registerErrors.password2}</p>
          <button className="bg-blue-500 text-white font-bold w-full text-center rounded-full p-3 hover:bg-blue-300 my-4">
            Sign Up
          </button>
        </form>
      </Modal>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
