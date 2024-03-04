import { useEffect, useState } from "react";
import {
  connectionString,
  resetURL,
  executeURL,
  generateWithAI,
  host,
} from "../../../api-settings";

type UserResp = {
  _id: string;
  email: string;
  disabled: string;
  profile: { language: string; timezone: string };
  team: string;
}[];

export type User = {
  id: string;
  name: string;
  email: string;
  position: string;
  color: string;
  date: string;

  company: string;

  rate: number;
};

const useAPI = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  function biasedRandom() {
    const mean = 5; // Mean of the distribution
    const stdDev = 2; // Standard deviation

    let num;
    do {
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2); // Box-Muller transform
      num = Math.round(mean + stdDev * z); // Adjust mean and standard deviation
    } while (num < 1 || num > 20); // Ensure the number is within the range 1-10

    return num;
  }

  const transformUsers = (users: UserResp) => {
    console.log(users);

    return users.map((user) => ({
      id: user._id,
      name: user.email
        .split("@")[0]
        .replace(/\d/g, "")
        .split(/[._]/)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      email: user.email,
      position: user.profile.language,
      color: user.team,

      company: user.profile.timezone,
      date: !isNaN(Date.parse(user.disabled))
        ? new Date(user.disabled).toLocaleString("en-US")
        : user.disabled,

      rate: biasedRandom(),
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
    const authToken = localStorage.getItem("token");
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
    const authToken = localStorage.getItem("token");
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (field) =>
        typeof field === "string" &&
        field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return {
    handleGenerate,
    handleReset,
    // users,
    deleteUser,
    error,
    connectDB,
    isFetching,
    isGenerating,
    isResetting,

    users: filteredUsers,
    searchQuery,
    handleSearchChange,
  };
};

export default useAPI;
