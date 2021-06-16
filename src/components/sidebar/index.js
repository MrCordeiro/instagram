import { useContext } from "react";
import User from "./user";
import Suggestions from "./suggestions";
import LoggedInUserContext from "../../context/logged-in-user";

export default function Sidebar() {
  const { user: { docId = "", fullName, username, userId } = {} } =
    useContext(LoggedInUserContext);

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} />
    </div>
  );
}
