import React from "react";
function futureworks() {
  return (
    <div>
      <h1>Future Works</h1>
      <p>We are working on some exciting features for the future!</p>
      <div className="works">
        <h1>Image URL Optimization Strategy for Products</h1>
        <h2>Objective</h2>
        <h3>
          💡 Reduce AWS costs and improve performance by avoiding on-demand
          signed URL generation for product images.
        </h3>
        <h2> ✅ Proposed Strategy:</h2>
        <p>
          Pre-generate signed S3 URLs when product is created or updated. <br />{" "}
          Store the signed URL in the product document in MongoDB. <br />
          Add an expiresAt field (type: Date) indicating when the URL should
          expire. <br /> Use a TTL index on the expiresAt field to automatically
          nullify or remove the image URL after expiration. <br /> Optionally,
          create a background job or script to clean/refresh expired links if
          needed.
        </p>
        <h2> ⚙️ Example MongoDB Schema: json Copy Edit</h2>
        <code
          style={{
            background: "black",
            color: "lightgreen",
            textAlign: "left",
          }}
        >
          {"{"}
          name: "Product ABC", imageUrl:
          "https://s3.amazonaws.com/...signed-url...", imageExpiresAt:
          ISODate("2025-04-24T18:30:00Z")
          {"}"}
          js Copy Edit // TTL Index db.products.createIndex{"({ "}
          imageExpiresAt: 1 {"}, {"} expireAfterSeconds: 0 {"})"}
        </code>

        <h2>📈 Benefits:</h2>
        <p>
          Fewer backend operations and AWS signature requests. Faster response
          time for clients. Cost-effective at scale. Still secure if TTL is kept
          short (e.g., 1 hour).
        </p>
        <h2> ⚠️ Considerations:</h2>
        <p>
          Slightly less dynamic — image access control depends on TTL logic.{" "}
          <br /> If links expire early and client caches them, <br />
          it may cause broken images.
          <br /> Background job or API fallback may be needed for refreshing
          expired URLs.
        </p>
      </div>
      <ul>
        <li>Enhanced user profiles</li>
        <li>Advanced search filters</li>
        <li>Improved transaction tracking</li>
      </ul>
      <div className="newwork">
        <h1>New WORK</h1>
        <h2>1. User Profile Enhancements</h2>
        <p>
          <ul>
            <li>Allow users to add a profile picture.</li>
            <li>Enable users to write a short bio.</li>
            <li>Implement user verification badges.</li>
          </ul>
        </p>
      </div>
      <div className="newwork">
        <h1>Add a college zone community</h1>
        <h2>1. College COmmunity like GFG</h2>
        <p>
          <ul>
            <li>User can now see the other user from there college.</li>
            <li>From there they can visit to there profiles and message </li>
            <li>The visitor can see Identity </li>
          </ul>
        </p>
      </div>
    </div>
  );
}

export default futureworks;
