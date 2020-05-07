import React from "react";
import { useByeQuery } from "../generated/graphql";

interface Props {}

export const Bye: React.FC<Props> = () => {
  const { data } = useByeQuery();

  if (!data) return <div>Loading</div>;

  return <div>{JSON.stringify(data)}</div>;
};
