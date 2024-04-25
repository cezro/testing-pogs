import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Balance() {
  const { user, error, isLoading } = useUser();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    async function fetchBalance() {
      try {
        if (!user) {
          // User is not available, handle this case as needed
          return;
        }

        const fetchBalance = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/balance`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sub: user.sub }), // Assuming user.sub is the correct property
          }
        );

        const value = await fetchBalance.json();
        console.log(value);
        setBalance(value);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBalance();
  }, [user]);
  return (
    <>
      <div>balance</div>
      <p>{balance}</p>
    </>
  );
}
