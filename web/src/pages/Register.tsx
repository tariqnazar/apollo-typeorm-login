import React, { useState } from "react";
import { useRegisterMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router";

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        register({ variables: { email, password } });
        setEmail("");
        setPassword("");

        history.push("/");
      }}
    >
      Email:
      <br />
      <input
        type="text"
        value={email}
        onChange={e => {
          setEmail(e.target.value);
        }}
      />
      <br />
      Password:
      <br />
      <input
        type="password"
        value={password}
        onChange={e => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
