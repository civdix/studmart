import { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Load user on first render if token is present
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found in localStorage");
      alert("Please login to continue");
      setLoading(false);
      return;
    }
    fetch(`http://localhost:5000/api/users/profile/me`, {
      headers: {
        studenttoken: token,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setCurrentUser(response.user);
        } else {
          console.log(
            "User Details Loading failed from Context:",
            response.error
          );
        }
      })
      .catch((err) => {
        setCurrentUser(null);
        console.log("Error from Context API:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Optional: Save user in localStorage (you can remove this if you don't want it persisted)
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, logout, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use context easily
export const useAuth = () => useContext(AuthContext);
