import React from "react";
import useQuery from "@hooks/useQuery";
import { BAD_REQUEST } from "@constants/statusCodes";
import { Link } from "react-router-dom";

function NotFoundPage() {
  const query = useQuery();

  const statusCode = query.get("status_code");
  let message = "";

  switch (statusCode) {
    case BAD_REQUEST:
      message = "Bad request";
      break;

    default:
      break;
  }
  return (
    <div>
      <h1>{statusCode || 404}</h1>
      <p>{message || "The page you were looking for wasn&apos;t found."}</p>
      <p>
        <Link to="/tickets">Return to Ticket page</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
