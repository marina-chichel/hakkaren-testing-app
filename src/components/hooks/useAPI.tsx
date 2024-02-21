import { useEffect, useState } from "react";

type UserResp = {
  _id: string;
  email: string;
  disabled: string;
  profile: { language: string };
  team: string;
}[];

export type User = {
  id: string;
  name: string;
  email: string;
  language: string;
  team: string;
  date: string;
};

const connectionString =
  "mongodb://65cb8ff7c04edaf78fcf47dd_65d4958a6efd64dc8283a927_user:kLIwm*%3ElDD%23b@167.235.55.35:30558/65cb8ff7c04edaf78fcf47dd_65d4958a6efd64dc8283a927?authSource=admin";

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNiOGZmN2MwNGVkYWY3OGZjZjQ3ZGQiLCJpYXQiOjE3MDg0NTEyMTcsImV4cCI6MTcwODUzNzYxN30._wAxNMTBmvFfMaoVoPGs-Bl2RuVhJbFQktLCCnO5mwk";

const executeURL =
  "https://api.dev.hakkaren.lastingdynamics.net/v1/inceptors/65d4e7c86efd64dc82843d14/execute";

const resetURL =
  "https://api.dev.hakkaren.lastingdynamics.net/v1/projects/65d4958a6efd64dc8283a927/databases/reset";

const useAPI = () => {
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const connectDB = async () => {
    try {
      setError("");
      const response = await fetch("http://localhost:3000/connect-to-mongodb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ connectionString }),
      });
      const data = await response.text();
      console.log(data);
      getUsers();
    } catch (error) {
      setError("Error connecting to MongoDB");
      console.error("Error connecting to MongoDB from client:", error);
    }
  };
  const getUsers = async () => {
    setError("");
    try {
      const response = await fetch("http://localhost:3000", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.text();
      console.log(data);
      setUsers(
        (JSON.parse(data) as UserResp).map((user) => ({
          id: user._id,
          name: user.email
            .split("@")[0]
            .replace(/\d/g, "")
            .split(/[._]/)
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" "),
          email: user.email,
          language: user.profile.language,
          team: user.team,
          date: user.disabled,
        }))
      );
    } catch (error) {
      setError("Couldn't fetch users");
      setUsers([]);
    }
  };
  useEffect(() => {
    connectDB();
  }, []);

  const handleGenerate = async () => {
    setError("");
    try {
      const response = await fetch(executeURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const responseBody = await response.json();
      console.log("Response Body:", responseBody);

      if (responseBody?.success === true) {
        setError("");
        getUsers();
      } else {
        setError(responseBody.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while making the request");
    }
  };
  const handleReset = async () => {
    setError("");
    try {
      const response = await fetch(resetURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },

        body: `{ "resetTo": "empty" }`,
      });

      const responseBody = await response.json();
      console.log("Response Body:", responseBody);

      if (responseBody?.success === true) {
        setError("");
        getUsers();
      } else {
        setError(responseBody.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while making the request");
    }
  };

  const deleteUser = (userId: string) => {
    console.log(userId);
    setUsers(users.filter((user) => user.id !== userId));
  };

  return {
    handleGenerate,
    handleReset,
    users,
    deleteUser,
    error,
    connectDB,
  };
};

export default useAPI;
