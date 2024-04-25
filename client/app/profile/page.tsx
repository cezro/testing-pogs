"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function Profile() {
  const { user, error, isLoading } = useUser();
  console.log(user);
  return <div data-testid="mock-profile">{user?.name}</div>;
}
