import TrendingSlide from "../../components/trending_carousel/trending_carousel";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Slide } from "@mui/material";

function Arrow(props) {
  const { direction, clickFunction } = props;
  const icon = direction === "left" ? <FaChevronLeft /> : <FaChevronRight />;

  return <div onClick={clickFunction}>{icon}</div>;
}

const Carousel_Slide = (list) => {
  const [info, setInfo] = useState([]);
  const [index, setIndex] = useState(0);
  const content = info[index];
  const numSlides = info.length;
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState("down");

  useEffect(() => {
    const test = () => {
      return setInfo(list);
    };
    test();
  }, []);

  const onArrowClick = (direction) => {
    const increment = direction === "left" ? -1 : 1;
    const newIndex = (index + increment + numSlides) % numSlides;

    const oppDirection = direction === "left" ? "right" : "left";
    setSlideDirection(direction);
    setSlideIn(false);

    setTimeout(() => {
      setIndex(newIndex);
      setSlideDirection(oppDirection);
      setSlideIn(true);
    }, 500);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 39) {
        onArrowClick("right");
      }
      if (e.keyCode === 37) {
        onArrowClick("left");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="ccar">
      <Arrow direction="left" clickFunction={() => onArrowClick("left")} />

      <Slide in={slideIn} direction={slideDirection}>
        <div>
          <TrendingSlide content={content} />
        </div>
      </Slide>

      <Arrow direction="right" clickFunction={() => onArrowClick("right")} />
    </div>
  );
};

export default Carousel_Slide;
