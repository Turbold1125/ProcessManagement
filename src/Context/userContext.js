import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import
import axios from "axios";
import { Modal, Input, message, Alert } from "antd";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = localStorage.getItem("user");
    setCurrentUser(user ? JSON.parse(user) : null);
  }, []);

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    resetModalState();
    navigate("/login");
    message.info("Та системээс гарлаа.");
  };

  const resetModalState = () => {
    setIsTokenExpired(false);
    setPassword("");
    setError("");
  };

  const handlePasswordInput = async () => {
    if (!password.trim()) {
      setError("Нууц үг хоосон байж болохгүй.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/auth/reauth`,
        {
          email: currentUser?.email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      resetModalState();
      message.success("Амжилттай");
    } catch (error) {
      setError("Нууц үг буруу байна.");
      setPassword("");
    }
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        setIsTokenExpired(true);
      }
    } catch (e) {
      setIsTokenExpired(true);
    }
  };

  useEffect(() => {
    checkTokenExpiration();

    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logoutUser }}>
      {children}

      {isTokenExpired && (
        <Modal
          title={
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              Холболт дууссан
            </div>
          }
          visible={isTokenExpired}
          onCancel={logoutUser}
          onOk={handlePasswordInput}
          okText="Дахин нэвтрэх"
          cancelText="Гарах"
          afterClose={logoutUser}
          centered
          width={320}
          maskClosable={true}
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          <p
            style={{
              marginBottom: "0.8rem",
              fontSize: "0.9rem",
              lineHeight: "1.4",
            }}
          >
            Таны холболт дууссан байна. Нууц үгээ дахин оруулж нэвтрэх
            боломжтой.
          </p>

          {error && (
            <Alert
              message="Алдаа"
              description={error}
              type="error"
              showIcon
              style={{
                marginBottom: "0.8rem",
                maxWidth: "280px",
                textAlign: "left",
                borderRadius: "6px",
              }}
            />
          )}

          <Input.Password
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Нууц үгээ оруулна уу."
            style={{
              width: "100%",
              maxWidth: "280px",
              padding: "0.6rem",
              borderRadius: "6px",
              fontSize: "0.9rem",
            }}
          />
        </Modal>
      )}
    </UserContext.Provider>
  );
};

export default UserProvider;
