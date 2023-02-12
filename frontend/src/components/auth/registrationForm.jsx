import { useState } from "react";
import { Link } from "react-router-dom";
import Joi from "joi";
import Input from "../common/input";
import { validate } from "../../utils";
import SubmitButton from "../common/submitButton";

export default function RegistrationForm() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    reEnterPassword: "",
  });
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(account, schema));
    if (Object.keys(errors).length !== 0) return;

    console.log(account);
  };

  const handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const newAccount = { ...account };
    newAccount[input.name] = value;
    setErrors(validate(newAccount, schema));
    setAccount((a) => ({ ...a, [name]: value }));
  };

  return (
    <div className="w-full flex flex-col p-8 sm:w-[30rem] sm:shadow-[0px_0px_50px_10px_rgba(0,0,0,0.05)] sm:rounded-3xl">
      <h1 className="text-center text-4xl my-8 font-bold">Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          type="text"
          value={account.username}
          onChange={handleChange}
          error={errors.username}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={account.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          name="reEnterPassword"
          label="Re-enter Password"
          type="password"
          value={account.reEnterPassword}
          onChange={handleChange}
          error={errors.reEnterPassword}
        />
        <SubmitButton
          label="Register"
          disabled={Object.keys(errors).length !== 0}
        />
        <div className="w-full h-[1px] bg-neutral-200 my-8" />
        <Link
          className="block text-xl text-center my-4 mx-auto w-fit"
          to="/login"
        >
          Login
        </Link>
      </form>
    </div>
  );
}
