import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { useLoginMutation } from "../generated/graphql";
import { setAccessToken } from "../accessToken";

interface Login {
  data: {
    accessToken: string;
  };
}

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const { data } = await login({ variables: { email, password } });

        if (data) {
          const { accessToken } = data.login;
          setAccessToken(accessToken);

          history.push("/");
        }
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
