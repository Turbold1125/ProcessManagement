import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  OrderedListOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { UserContext } from "../Context/userContext";

const NavMenu = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      localStorage.clear();
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser(null);
    navigate("/login");
  };

  const menuItems = [
    { name: "Нүүр", path: "/", icon: <HomeOutlined />, roles: ["ADMIN", "USER"] },
    { name: "Захиалга", path: "/orders", icon: <OrderedListOutlined />, roles: ["ADMIN", "USER"] },
    { name: "Агуулах", path: "/inventory", icon: <AppstoreOutlined />, roles: ["ADMIN", "USER"] },
    { name: "Утгууд", path: "/constants", icon: <SettingOutlined />, roles: ["ADMIN"] },
  ];

  const filteredMenuItems = currentUser
    ? menuItems.filter((item) =>
      item.roles.includes(currentUser.role)
    )
    : [];

  if (!currentUser) {
    return null;
  }

  return (
    <div className="bg-gray-800 text-white w-50 p-4 flex flex-col justify-between h-screen">
      <div>
        <ul className="space-y-4">
          {filteredMenuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center space-x-4 p-3 rounded-lg transition ${location.pathname === item.path
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-blue-100 hover:text-blue-800 text-gray-300"
                  }`}
              >
                <span className="relative">
                  {item.icon}
                  {item.notification && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold text-white rounded-full w-5 h-5 flex items-center justify-center">
                      {item.notification}
                    </span>
                  )}
                </span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-4 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-red-500 font-medium transition"
      >
        <LogoutOutlined />
        <span>Гарах</span>
      </button>
    </div>
  );
};

export default NavMenu;
