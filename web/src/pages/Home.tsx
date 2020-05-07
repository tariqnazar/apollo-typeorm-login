import React from "react";
import { useUsersQuery } from "../generated/graphql";

export default function Home() {
  const { data } = useUsersQuery({
    fetchPolicy: "network-only"
  });

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <div>
        {data.users.map(x => (
          <div key={x.id}>{x.email}</div>
        ))}
      </div>
    </div>
  );
}
