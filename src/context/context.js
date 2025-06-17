import { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState({
    customMsg: "Loading the Product Details",
    customLoading: "Btw You're looking Beautiful today",
  });
  // Load user on first render if token is present
  const getImage = async (thing) => {
    const response = await fetch("http://localhost:5000/api/s3/getImage", {
      method: "POST", // changed to POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrls: [thing.profilePicture] || [thing.images],
        productId: thing.productId || null, // Ensure productId is passed if available
      }),
    });

    const { success, imageUrl } = await response.json();
    if (success) {
      thing.images = [imageUrl];
    }
    return thing;
  };

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
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setCurrentUser(response.user);
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

  //  Delete any product by its id
  const deleteProduct = async (productId) => {
    setLoading(true);
    let previousLoading = loadingData;
    setLoadingData({
      customMsg: "Deleting the Product",
      customLoading: "The Item will be permanently deleted",
    });
    const response = await fetch(
      `http://localhost:5000/api/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          studenttoken: localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();

    setLoading(false);
    setLoadingData(previousLoading);
    return data;
  };

  const changeUserDetails = async (userId, userUpdates) => {
    setLoading(true);
    let previousLoading = loadingData;
    setLoadingData({
      customMsg: "Updating the User Details",
      customLoading: "The Item will be permanently deleted",
    });
    const response = await fetch(`http://localhost:5000/api/users/profile`, {
      method: "PATCH",
      headers: {
        studenttoken: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userUpdates),
    });

    const data = await response.json();

    setLoading(false);
    setLoadingData(previousLoading);
    return { userData: data, success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        logout,
        loading,
        setLoading,
        deleteProduct,
        setLoadingData,
        loadingData,
        changeUserDetails,
        getImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use context easily
export const useAuth = () => useContext(AuthContext);
