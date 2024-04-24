import Image from "next/image";
import { NextPage } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getUserProfileData } from "@/services/profile.service";

const ProfileServer: NextPage = withPageAuthRequired(
  async () => {
    const user = await getUserProfileData();

    return (
      <div>
        <Image src={user.picture!} alt={user.name!} width={30} height={30} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    );
  },
  { returnTo: "/profile-server" }
);

export default ProfileServer;
