import React, { useContext } from "react";
import { UserContext } from "../Context/userContext";

const LogoutButton = () => {
  const { logoutUser } = useContext(UserContext);

  return (
    <button
      onClick={logoutUser}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
