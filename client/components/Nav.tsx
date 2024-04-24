import React from "react";
import { getSession, Session } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Logout from "@/app/logout/page";
import Login from "@/app/login/page";
import Signup from "@/app/signup/page";

type Props = {};

export default async function Nav() {
  const session: Session | null | undefined = await getSession();
  return (
    <nav className="h-10 w-full px-7 border border-b-2 shadow-sm">
      <div className="flex justify-between w-full h-full items-center">
        <div className="flex gap-3">
          <a href="/">Home</a>
          <a href="/pogs">Stocks</a>
        </div>
        <div className="flex gap-5 items-center">
          {session?.user && (
            <div className="flex gap-3 items-center">
              <h3 className="">{session?.user.name}</h3>
              <a href="/profile-client">
                <Image
                  className="rounded-full"
                  src={session?.user.picture}
                  alt={session?.user.name!}
                  width={30}
                  height={30}
                ></Image>
              </a>
            </div>
          )}

          <div>
            {!session?.user && (
              <div className="flex gap-3">
                <Login />
                <Signup />
              </div>
            )}
            {session?.user && (
              <div className="flex">
                <Logout />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
