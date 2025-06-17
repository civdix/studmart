import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/context";
import { FaCross } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import Loading from "./Loading";
function EditProfile({ user, setShow }) {
  const [preview, setPreview] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user) {
      setUserData({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profilePicture: user.profilePicture || null,
      });
      setPreview(user.profilePicture ? user.profilePicture : null);
    }
  }, [user]);

  const {
    loading,
    setLoading,
    setLoadingData,
    loadingData,
    changeUserDetails,
  } = useAuth();

  const profilePictureChange = (event) => {
    const file = event.target.files[0];
    console.log("Data", file);
    const previewImage = URL.createObjectURL(file);
    setPreview(previewImage);
    setUserData({
      ...userData,
      profilePicture: file,
    });
  };

  const handleChange = (event) => {
    console.log(event.target.id, event.target.value);
    setUserData({
      ...userData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("_id", userData._id);
    formData.append("title", userData.title);
    formData.append("description", userData.description);
    formData.append("price", userData.price);
    formData.append("category", userData.category);
    formData.append("barterPreferences", userData.barterPreferences);
    formData.append("publishedDate", new Date().toISOString());
    formData.append(`image${0}`, userData.profilePicture);
    console.log(formData);

    const responseImageUpload = await fetch(
      "http://localhost:5000/api/s3/uploadImage",
      {
        method: "POST",
        body: formData,
      }
    );
    const jsonResponseImage = await responseImageUpload.json();
    console.log(
      "This is a json response from image upload",
      jsonResponseImage.AWSName + "\n This is profile picrturw",
      userData.profilePicture
    );
    const updatedUserData = {
      ...userData,
      profilePicture: jsonResponseImage.AWSName,
    };
    console.log("User Data profile Image", updatedUserData.profilePicture);
    const userDataChange = Object.keys(updatedUserData).reduce((acc, key) => {
      if (updatedUserData[key] !== user[key]) {
        acc[key] = updatedUserData[key];
      }
      return acc;
    }, {});
    console.log("User Data Change", userDataChange);
    if (Object.keys(userDataChange).length === 0) {
      setShow(false);
      console.log("No changes made to user data");
      return;
    }
    setUserData(updatedUserData);

    console.log("User Data Change", userDataChange);
    const response = await changeUserDetails(userData?._id, userDataChange);
    if (response?.success) {
      setLoadingData({
        customMsg: "User Details Updated",
        customLoading: "The User Details have been updated",
      });
      setUserData(response.userData);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShow(false);
      }, 2000);
    } else {
      setLoadingData({
        customMsg: "User Details Not Updated",
        customLoading: "The User Details have not been updated",
      });
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShow(false);
      }, 2000);
    }
  };
  return loading ? (
    <Loading />
  ) : (
    <div className="modal1 mx-auto">
      <h1>Edit Profile</h1>
      <form>
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={profilePictureChange}
            id="profilePicture"
            // value={userData?.profilePicture.name}
          />
        </div>
        <div className="preview">
          {userData?.profilePicture && (
            <img
              src={preview || ""}
              width="25%"
              alt="Profile"
              className="preview-image"
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            onChange={handleChange}
            id="name"
            value={userData?.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            onChange={handleChange}
            id="email"
            value={userData?.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            onChange={handleChange}
            id="phone"
            value={userData?.phone}
          />
        </div>
        <input type="button" onClick={handleSubmit} value="Save Changes" />
      </form>
      <div
        className="close"
        onClick={() => {
          setUserData(user);
          setShow(false);
        }}
      >
        <FaX />
      </div>
    </div>
  );
}

export default EditProfile;
