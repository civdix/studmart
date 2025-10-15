import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/context";
import { FaCross } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import Loading from "./Loading";

function EditProfile({ user, setShow, setUser }) {
  const [preview, setPreview] = useState(null);
  const [userData, setUserData] = useState({});
  const [imageChange, setImageChange] = useState(false);
  const [updatingData, setUpdatingData] = useState({});
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
    setUpdatingData({
      ...updatingData,
      profilePicture: file,
    });
  };

  const handleChange = (event) => {
    console.log(event.target.id, event.target.value);
    setUserData({
      ...userData,
      [event.target.id]: event.target.value,
    });
    setUpdatingData({
      ...updatingData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (imageChange) {
      setLoading(true);
      const formData = new FormData();
      Object.entries(updatingData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("_id", userData._id);
      console.log(formData);
      setLoadingData({
        customMsg: "Uploading Profile Picture",
        customLoading: "Your Profile Picture is being uploaded",
      });
      const responseImageUpload = await fetch(
        `${
          process.env.REACT_APP_backend_url || "http://localhost:5000"
        }/api/s3/uploadImage`,
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

      setUpdatingData({
        ...updatingData,
        profilePicture: jsonResponseImage.AWSName,
      });
    } else {
      console.log("No Image to update");
    }
    setLoadingData({
      customMsg: "Updating User Details",
      customLoading: "Your Edit(s) is being processing",
    });
    // console.log(
    //   "User Data profile Image and does image changed",
    //   imageChange,
    //   updatingData.profilePicture
    // );

    console.log("User Data Change", updatingData);
    const response = await changeUserDetails(userData?._id, updatingData);
    if (response?.success) {
      setUser({ ...user, ...updatingData });
      setLoadingData({
        customMsg: "User Details Updated",
        customLoading: "The User Details have been updated",
      });
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
            onClick={() => setImageChange(true)}
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
