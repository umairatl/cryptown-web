import { Link } from "react-router-dom";
import "../notFound/notFound.css";

const NotFound = () => {
  return (
    <div className="notfoundsection">
      <div className="scene">
        <div className="box">
          <div className="box__face front">4</div>
          <div className="box__face back">0</div>
          <div className="box__face right">4</div>
          <div className="box__face left">0</div>
          <div className="box__face top">Error</div>
          <div className="box__face bottom">0</div>
        </div>
        <div className="shadow"></div>

        <div className="desc">
          <h2>Ooops page not found!</h2>
          <button> BACK TO HOME PAGE</button>
          {/* <Link to='/'>Home</Link> */}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
