export default async function fetchUser(user: any) {
  try {
    const userData = {
      sub: user?.sub,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    console.log(response);
    const role = await response.json();
    console.log(role);
    return role;
  } catch (error) {
    console.error(error);
    throw Error("Failed to add new user");
  }
}
