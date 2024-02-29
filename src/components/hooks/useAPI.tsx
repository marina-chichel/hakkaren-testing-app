import { useEffect, useState } from "react";
import {
  connectionString,
  authToken,
  resetURL,
  executeURL,
  generateWithAI,
  host,
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
      const response = await fetch(`${host}/connect-to-mongodb`, {
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

  const transformUsers = (users: UserResp) => {
    return users.map((user) => ({
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
    }));
  };

  const getUsers = async () => {
    setError("");
    setIsFetching(true);
    try {
      const response = await fetch(`${host}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.text();
      setUsers(transformUsers(JSON.parse(data)));
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
      const response = await fetch(`${host}/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          executeURL,
          authToken,
          generateWithAI,
        }),
      });

      const responseBody = await response.json();

      if (responseBody?.success === true) {
        setError("");
        const fetchedUsers = responseBody?.insertedData[0]?.data?.documents;
        setUsers((curr) => [...curr, ...transformUsers(fetchedUsers)]);
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
      const response = await fetch(`${host}/reset`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resetURL,
          authToken,
        }),
      });

      const responseBody = await response.json();
      console.log("Reset Response Body:", responseBody);

      if (responseBody?.success === true) {
        setError("");
        setUsers([]);
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
