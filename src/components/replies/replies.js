const entities = require("entities");

const Reply = ({ reply }) => {
  return (
    <div>
      <p>{entities.decodeHTML(reply.subpost)}</p>
    </div>
  );
};

export default Reply;
