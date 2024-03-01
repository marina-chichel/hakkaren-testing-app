import { Dispatch, SetStateAction, useState } from "react";
import { host } from "../../../api-settings";

export type User = {
  id: string;
  name: string;
  email: string;
  language: string;
  team: string;
  date: string;
};

interface P {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const useLogin = ({ setIsLoggedIn }: P) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (body: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      setError("");
      const response = await fetch(`${host}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!!data?.token) {
        console.log("token ");
        localStorage.setItem("token", data?.token);
        setError("");
        setIsLoggedIn(true);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Login failed");
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    error,
    isLoading,
    setError,
  };
};

export default useLogin;
