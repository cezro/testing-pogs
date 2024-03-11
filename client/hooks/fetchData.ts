export default async function fetchData(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseBody = await response.json();
    console.log(responseBody.body);

    return responseBody.body;
  } catch (error) {
    console.error("An error occurred:", error);

    throw error;
  }
}
