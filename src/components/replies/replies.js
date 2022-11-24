const entities = require("entities");

let dayOpt = { weekday: 'long' }
let yearOpt = { year: 'numeric', month: 'numeric', day: 'numeric' }
let timeOpt = { hour: 'numeric', minute: 'numeric' }

const Reply = ({ reply }) => {
    return ( 
        <div>
            <h2>{entities.decodeHTML(reply.subpost)}</h2>
            <p>{new Date(reply.subpostdatetime).toLocaleDateString("en-MY", yearOpt).toString()}</p>
            <p>{new Date(reply.subpostdatetime).toLocaleDateString("en-MY", timeOpt).toString().substring(12)}</p>
            <p>{new Date(reply.subpostdatetime).toLocaleDateString("en-MY", dayOpt).toString()}</p>
        </div>
     );
}
 
export default Reply;