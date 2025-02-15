import { useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

export default function Profile() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const sendUserData = async () => {
        try {
          const response = await axios.post("http://localhost:5000/api/data", {
            userId: user.id, // Send Clerk userId
          });

          console.log(response.data); // Response from backend
        } catch (error) {
          console.error("Error sending data:", error);
        }
      };

      sendUserData();
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) return <p>Loading...</p>;

  if (!isSignedIn) return <p>Not Signed In</p>;

  return (
    <div>
      <h1>Welcome, {user.fullName}</h1>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
      <p>User ID: {user.id}</p>
    </div>
  );
}
