import { useState } from "react";
import Joi from "joi";
import Input from "../common/input";
import { validate } from "../../utils";
import SubmitButton from "../common/submitButton";

export default function LoginForm() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
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
    <div className="w-[30rem] shadow-[0px_0px_50px_10px_rgba(0,0,0,0.05)] flex flex-col p-8 rounded-3xl">
      <h1 className="text-center text-4xl my-8 font-bold">Login</h1>
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
        <p className="text-xl text-right">Forgot password?</p>
        <SubmitButton
          disabled={Object.keys(errors).length !== 0}
          label="Login"
        />
        <div className="w-full h-[1px] bg-neutral-200 my-8" />
        <p className="text-xl text-center my-4 w-full">Create an account</p>
      </form>
    </div>
  );
}
