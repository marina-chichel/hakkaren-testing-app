import { useEffect, useState } from "react";
import { host } from "../../../api-settings";

const useContacts = (id: string) => {
  const [isFetchingContacts, setIsFetching] = useState(false);

  const [error, setError] = useState("");
  const [contacts, setContacts] = useState<string[]>([]);

  const getContacts = async () => {
    setError("");
    setIsFetching(true);
    try {
      const response = await fetch(`${host}/contacts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setContacts(data.emails);
    } catch (error) {
      setError("Couldn't fetch contacts");
      setContacts([]);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    setError("");
    getContacts();
  }, [id]);

  return {
    getContacts,
    contacts,
    error,
    isFetchingContacts,
  };
};

export default useContacts;
