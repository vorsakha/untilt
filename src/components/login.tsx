import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import LoadingSpinner from "./common/loading";

import { signIn } from "../redux/user/userThunk";
import { generateAlert } from "../redux/alert/alertSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Login = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state);

  let history = useHistory();

  const [formInput, setFormInput] = useState<FormTypes>({
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (formInput.name !== "" || formInput.password !== "") {
      dispatch(signIn(formInput));
    }

    history.push("/");
  };

  useEffect(() => {
    if (auth.loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [auth.loading]);

  useEffect(() => {
    if (auth.error !== null) {
      dispatch(generateAlert({ type: "danger", msg: auth.error }));
    }
    // eslint-disable-next-line
  }, [auth.error]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          {loading && <LoadingSpinner />}
          <h1 className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
            Login
          </h1>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ring-1 ring-black ring-opacity-5 mb-2"
            type="text"
            name="name"
            placeholder="Username"
            onChange={(e) => handleInputChange(e)}
            value={formInput.name}
            required
            autoComplete="username"
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ring-1 ring-black ring-opacity-5 mb-2"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleInputChange(e)}
            value={formInput.password}
            required
            autoComplete="current-password"
          />
          <div className="flex justify-center mt-2">
            <button
              className={`hover:bg-gray-600 px-6 py-2 rounded font-medium inline-block text-white shadow-lg bg-gray-700 focus:bg-gray-200 ring-black ring-opacity-5 transition ease-in-out disabled:opacity-40`}
              type="submit"
            >
              Login
            </button>
          </div>
          <Link className="text-blue-500 text-sm hover:underline" to="/signup">
            Create account
          </Link>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2021 Untilt. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
