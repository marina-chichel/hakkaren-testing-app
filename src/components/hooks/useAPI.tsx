import { useEffect, useState } from "react";
import {
  connectionString,
  authToken,
  resetURL,
  executeURL,
} from "../../../api-settings";

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

const useAPI = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const connectDB = async () => {
    setIsFetching(true);
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
      setIsFetching(false);
    }
  };
  const getUsers = async () => {
    setError("");
    setIsFetching(true);
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
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    connectDB();
  }, []);

  const handleGenerate = async () => {
    setError("");
    setIsGenerating(true);
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
    } finally {
      setIsGenerating(false);
    }
  };
  const handleReset = async () => {
    setError("");
    setIsResetting(true);
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
    } finally {
      setIsResetting(false);
    }
  };

  const deleteUser = (userId: string) => {
    setUsers((curr) => curr.filter((user) => user.id !== userId));
  };

  return {
    handleGenerate,
    handleReset,
    users,
    deleteUser,
    error,
    connectDB,
    isFetching,
    isGenerating,
    isResetting,
  };
};

export default useAPI;
