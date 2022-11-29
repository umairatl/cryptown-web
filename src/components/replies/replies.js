import { useDialogContext } from "../../hooks/useDialogContext";
import NormalDialog from "../Dialog/normalDialog";

const entities = require("entities");

let dayOpt = { weekday: "long" };
let yearOpt = { year: "numeric", month: "numeric", day: "numeric" };
let timeOpt = { hour: "numeric", minute: "numeric" };

const Reply = ({ reply }) => {
  return (
    <div className="wrap-outer-p">
      <p className="replytext">{entities.decodeHTML(reply.subpost)}</p>
      <p className="bolding7">
        {new Date(reply.subpostdatetime)
          .toLocaleDateString("en-MY", yearOpt)
          .toString()}
      </p>
      <p className="bolding8">
        {new Date(reply.subpostdatetime)
          .toLocaleDateString("en-MY", timeOpt)
          .toString()
          .substring(12)}
      </p>
      <p className="bolding9">
        {new Date(reply.subpostdatetime)
          .toLocaleDateString("en-MY", dayOpt)
          .toString()}
      </p>
    </div>
  );
};

export default Reply;
