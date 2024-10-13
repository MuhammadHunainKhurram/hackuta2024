"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const AddUserToMongoDB: React.FC = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const addUserToDatabase = async () => {
        try {
          const response = await fetch("/api/addUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              email: user.emailAddresses[0]?.emailAddress,
              name: `${user.firstName} ${user.lastName}`,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to add user");
          }

          const data = await response.json();
          console.log("User added:", data);
        } catch (error) {
          console.error("Error adding user:", error);
        }
      };

      addUserToDatabase();
    }
  }, [isSignedIn, user]);

  return <div>Welcome to eduGenie!</div>;
};

export default AddUserToMongoDB;
