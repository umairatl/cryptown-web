import * as React from 'react';
const entities = require("entities");

let yearOpt = {month: "short", day: "numeric" };

const Reply = ({ reply }) => {
  return (
    <div className="reply-in-cont">

<div className="tweet-header-info">
{reply.username}<span>. 

{new Date(reply.subpostdatetime)
          .toLocaleDateString("en-MY", yearOpt)
          .toString()}

</span>
      <p>{entities.decodeHTML(reply.subpost)}</p>
    </div>
    </div>
  );
};

export default Reply;
