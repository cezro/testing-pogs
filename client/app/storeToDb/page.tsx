"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

import React, { useEffect } from "react";

type Props = {};

function PushToDb({}: Props) {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = {
          sub: user?.sub,
          role: "user",
          balance: 10000,
        };

        console.log(user?.sub);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/new`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
      } catch (error) {
        throw Error("Failed to add new user");
      }
    }
    fetchUser();
  }, [user]);

  return <div>PushToDb</div>;
}

export default PushToDb;
