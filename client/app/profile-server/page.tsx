import Image from "next/image";
import { getSession, Session } from "@auth0/nextjs-auth0";

export default async function ProfileServer() {
  const session: Session | null | undefined = await getSession();

  return (
    session?.user && (
      <div>
        <Image
          src={session.user.picture!}
          alt={session.user.name!}
          width={30}
          height={30}
        />
        <h2>{session.user.name}</h2>
        <p>{session.user.email}</p>
      </div>
    )
  );
}
