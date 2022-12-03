import * as React from "react";
import { FaUserCircle } from "react-icons/fa";

const entities = require("entities");

let yearOpt = { month: "short", day: "numeric" };

const Reply = ({ reply }) => {
  return (
    <div className="reply-in-cont">
      <div className="tweet-header-info">
        <div className="flex-d-row space-between-jn">
          <div>
            <FaUserCircle /> {reply.username}
          </div>
          <span>
            .
            {new Date(reply.subpostdatetime)
              .toLocaleDateString("en-MY", yearOpt)
              .toString()}
          </span>
        </div>

        <p>{entities.decodeHTML(reply.subpost)}</p>
      </div>
    </div>
  );
};

export default Reply;
