import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Joi from "joi";
import Input from "../common/input";
import { validate } from "./validate";
import { useAuth } from "../../context/auth";

export default function RegistrationForm() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    reEnterPassword: "",
  });
  const [errors, setErrors] = useState({});

  const { user, register } = useAuth();
  if (user) return <Navigate to="/" replace />;

  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    reEnterPassword: Joi.string()
      .required()
      .label("Re-enter Password")
      .valid(Joi.ref("password"))
      .error((errors) => {
        errors.forEach((err) => {
          if (err.code === "any.only") err.message = "Password mismatch";
        });
        return errors;
      }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(validate(account, schema));
    if (Object.keys(errors).length !== 0) return;
    register({ username: account.username, password: account.password });
  };

  const handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const newAccount = { ...account };
    newAccount[input.name] = value;
    setErrors(
      validate(
        newAccount,
        schema,
        name === "username" ? [name] : ["reEnterPassword", "password"]
      )
    );
    setAccount((a) => ({ ...a, [name]: value }));
  };

  return (
    <div className="w-full flex flex-col p-8 sm:w-[30rem] sm:shadow-[0px_0px_50px_10px_rgba(0,0,0,0.05)] sm:rounded-3xl">
      <h1 className="my-8 text-4xl font-bold text-center">Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          type="text"
          value={account.username}
          onChange={handleChange}
          error={errors.username}
          inputStyle="block text-xl w-full my-4 border rounded-xl p-4 focus:outline-neutral-200"
          errorStyle="text-red mt-2 text-red-500 mx-4"
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={account.password}
          onChange={handleChange}
          error={errors.password}
          inputStyle="block text-xl w-full my-4 border rounded-xl p-4 focus:outline-neutral-200"
          errorStyle="text-red mt-2 text-red-500 mx-4"
        />
        <Input
          name="reEnterPassword"
          label="Re-enter Password"
          type="password"
          value={account.reEnterPassword}
          onChange={handleChange}
          error={errors.reEnterPassword}
          inputStyle="block text-xl w-full my-4 border rounded-xl p-4 focus:outline-neutral-200"
          errorStyle="text-red mt-2 text-red-500 mx-4"
        />
        <button
          className="block w-full p-4 my-8 text-2xl text-white transition-colors border rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-neutral-400"
          type="submit"
          disabled={Object.keys(errors).length !== 0}
        >
          Register
        </button>
        <div className="w-full h-[1px] bg-neutral-200 my-8" />
        <Link
          className="block mx-auto my-4 text-xl text-center w-fit"
          to="/login"
        >
          Login
        </Link>
      </form>
    </div>
  );
}
