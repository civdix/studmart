import React from "react";
import { FaBookOpen, FaGraduationCap } from "react-icons/fa";
import "../styles/Loading.css";

const Loading = ({ customMsg, customLoading }) => {
  return (
    <div className="studmart-loader">
      <div className="studmart-icon">
        <FaGraduationCap className="cap" />
        <FaBookOpen className="book" />
      </div>
      <h2>
        {customLoading && customLoading.length > 2
          ? customLoading
          : "Loading StudMart..."}
      </h2>
      <p>
        {customMsg && customMsg.length > 2
          ? customMsg
          : "Gathering student deals just for you"}{" "}
        📚✨
      </p>
    </div>
  );
};

export default Loading;
