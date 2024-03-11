import { useEffect, useMemo, useState } from "react";
import {
  connectionString,
  resetURL,
  executeURL,
  generateWithAI,
  host,
} from "../../../api-settings";

const CARDS_ON_PAGE = 8;

type UserResp = {
  _id: string;
  email: string;
  disabled: string;
  profile: { language: string; timezone: string };
  notification: { disabled: boolean; frequency: string };
  secure: { _id: string };
  team: string;
}[];

export type User = {
  id: string;
  name: string;
  email: string;
  position: string;
  color: string;
  date: string;
  time: string;
  company: string;

  rate: number;

  success: boolean;

  avatar: string;
  contactsId: string;
};

const useAPI = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currPage, setCurrentPage] = useState(1);

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
    console.log({ users });

    return users.map((user) => ({
      id: user._id,
      name: user.email
        .split("@")[0]
        .replace(/\d/g, "")
        .split(/[._]/)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      email: user.email.toLowerCase(),
      position: user.profile.language,
      color: user.team,

      company: user.profile.timezone,
      date: !isNaN(Date.parse(user.disabled))
        ? new Date(user.disabled).toLocaleDateString("en-US")
        : user.disabled,
      time: !isNaN(Date.parse(user.disabled))
        ? new Date(user.disabled).toLocaleTimeString("en-US")
        : user.disabled,
      rate: biasedRandom(),
      success: user?.notification?.disabled,
      avatar: user?.notification?.frequency,
      contactsId: user?.secure?._id,
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

        const userData = responseBody?.insertedData.find(
          (item: any) => item.collection === "users"
        );
        const fetchedUsers = userData ? userData.data?.documents : [];

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
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (field) =>
        typeof field === "string" &&
        field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const noUsers = filteredUsers.length === 0;

  const numberOfPages = filteredUsers.length
    ? Math.ceil(filteredUsers.length / CARDS_ON_PAGE)
    : 1;

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const paginatedUsers = useMemo(
    () =>
      filteredUsers.slice(
        (currPage - 1) * CARDS_ON_PAGE,
        currPage * CARDS_ON_PAGE
      ),
    [filteredUsers.length, currPage]
  );

  useEffect(() => {
    if (paginatedUsers.length === 0 && currPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  }, [paginatedUsers.length]);

  return {
    handleGenerate,
    handleReset,
    filteredUsers,
    noUsers,
    deleteUser,
    error,
    connectDB,
    isFetching,
    isGenerating,
    isResetting,

    currPage,
    numberOfPages,
    searchQuery,
    paginatedUsers,
    handleSearchChange,
    clearSearch,
    handlePageChange,
  };
};

export default useAPI;
