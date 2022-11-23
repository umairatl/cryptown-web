const entities = require("entities");

const Reply = ({ reply }) => {
    return ( 
        <div>
            <h2>{entities.decodeHTML(reply.subpost)}</h2>
        </div>
     );
}
 
export default Reply;