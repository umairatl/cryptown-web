const entities = require("entities");

let dayOpt = { weekday: "long" };
let yearOpt = { year: "numeric", month: "numeric", day: "numeric" };
let timeOpt = { hour: "numeric", minute: "numeric" };

const Reply = ({ reply }) => {
  return (
    <div className="replies-col">
      <div className="flex-d-row space-between-jn">
      <p>{reply.email}</p>
      <p>
        {new Date(reply.subpostdatetime)
          .toLocaleDateString("en-MY", yearOpt)
          .toString()}
      </p>
      </div>
          <p>{entities.decodeHTML(reply.subpost)}</p>
      {/* <p>
        {new Date(reply.subpostdatetime)
          .toLocaleDateString("en-MY", timeOpt)
          .toString()
          .substring(12)}
      </p>
      <p>
        {new Date(reply.subpostdatetime)
          .toLocaleDateString("en-MY", dayOpt)
          .toString()}
      </p> */}
    </div>
  );
};

export default Reply;
