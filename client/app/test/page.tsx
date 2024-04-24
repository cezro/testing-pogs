"use client";

import fetchUser from "@/utils/fetchRole";
import { useUser } from "@auth0/nextjs-auth0/client";

import React, { useEffect } from "react";

type Props = {};

function PushToDb({}: Props) {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    fetchUser(user);
  }, [user]);

  return <div>PushToDb</div>;
}

export default PushToDb;
