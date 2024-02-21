import { useState } from "react";

type User = {
  email: string;
};

const useTesting = () => {
  const [dbConnectionURI, setDbConnectionURI] = useState("");
  const [dbConnected, setDbConnected] = useState(false);

  const [url, setUrl] = useState("");

  const [method, setMethod] = useState("POST");
  const [authToken, setAuthToken] = useState("");
  const [payload, setPayload] = useState("");
  const [responseData, setResponseData] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const connectDB = async () => {
    if (!dbConnectionURI) {
      setError("DB connection URI is empty");
    } else {
      setError("");
    }
    try {
      const response = await fetch("http://localhost:3000/connect-to-mongodb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ connectionString: dbConnectionURI }),
      });
      const data = await response.text();
      console.log(data);
      setDbConnected(true);
    } catch (error) {
      console.error("Error connecting to MongoDB from client:", error);
      setDbConnected(false);
    }
  };

  const getUsers = async () => {
    if (!dbConnected) {
      setError("Connected DB");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.text();
      console.log(data);
      setUsers(JSON.parse(data));
    } catch (error) {
      setError("Couldn't fetch users");
      setUsers([]);
    }
  };

  const executeRequest = async () => {
    // Validation: Check if all fields are filled
    if (!dbConnected || !url || !authToken) {
      setError("Connected DB, URL and AuthToken are required");
      return;
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: method !== "GET" && payload ? `${payload}` : null,
      });

      const responseBody = await response.json();
      console.log("Response Body:", responseBody);

      if (responseBody?.success === true) {
        setResponseData(JSON.stringify(responseBody.insertedData, null, 2));
        setError("");
      } else {
        setError(responseBody.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while making the request");
    }
  };

  return {
    dbConnectionURI,
    setDbConnectionURI,

    connectDB,
    dbConnected,

    getUsers,
    users,

    authToken,
    setAuthToken,

    url,
    setUrl,

    method,
    setMethod,

    payload,
    setPayload,

    executeRequest,
    error,

    responseData,
  };
};

export default useTesting;
