// Pulls auth-related infomation
import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListener() {
  // Get user from the local storage
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // we have a user... so we can store the user in localstorage
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // there's no user, so make sure it's removed from localStorage so that visitor can't see auth-only pages without being logged in
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => listener();
  }, [firebase]);
  return { user };
}
