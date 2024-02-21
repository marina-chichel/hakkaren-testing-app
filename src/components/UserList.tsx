import { Button } from "@mui/material";
import { useState } from "react";

type User = {
  email: string;
};

function UserList() {
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

  return (
    <div className="form-container">
      <div className="box">
        <div className="h-stack">
          <label htmlFor="dbURI">DB connection URI:</label>
          <input
            id="dbURI"
            type="text"
            value={dbConnectionURI}
            onChange={(e) => setDbConnectionURI(e.target.value)}
            placeholder="Enter DB connection URI"
          />
          <Button variant="contained" onClick={connectDB}>
            Connect
          </Button>
        </div>

        {dbConnected && (
          <>
            <div className="success"> DB is connected</div>
            <Button variant="contained" onClick={getUsers}>
              Get users
            </Button>
            <h2>Users - {users.length} </h2>
            <ol id="user-list">
              {users.map((user, index) => (
                <li key={index}>{user.email}</li>
              ))}
            </ol>
          </>
        )}
        <div className="h-stack">
          <label htmlFor="auth-token">AuthToken:</label>
          <input
            id="auth-token"
            type="text"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            placeholder="Enter Authentication Token"
          />
        </div>
        <div className="h-stack">
          <label htmlFor="url">URL:</label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
          />
          <label htmlFor="method">Method:</label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
          </select>
        </div>

        <div className="h-stack">
          <label htmlFor="payload">Payload:</label>
          <textarea
            id="payload"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            placeholder="Enter Payload (if applicable)"
          ></textarea>
        </div>
      </div>
      <Button variant="contained" onClick={executeRequest}>
        Execute
      </Button>
      {error && <div className="error">{error}</div>}
      {/* Display error message */}
      <div className="box">
        <div className="h-stack">
          <h2>Response:</h2>
          <textarea
            id="responce"
            readOnly
            value={responseData}
            placeholder="Response will appear here"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default UserList;
