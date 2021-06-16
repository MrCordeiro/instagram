// Pulls user-related infomation from firestore

import { useEffect, useState } from "react";
import { getUserByUserId } from "../services/firebase";

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    // If the user changes, we must switch the user
    async function getUserObjByUserId(userId) {
      // Calls the firestore and get the user data based on its id
      const [user] = await getUserByUserId(userId);
      setActiveUser(user || {});
    }

    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);

  return { user: activeUser, setActiveUser };
}
