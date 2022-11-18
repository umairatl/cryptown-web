import React from "react";
import './slideshow.css';
import { useState } from "react";
import { useEffect } from "react";

const colors = ['test', 'lmao', "#FFBB28"];
const delay = 2500;

const SlideShow = ({exchange}) => {
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);
    const [val, setVal] = useState([])
  
    function resetTimeout() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    // useEffect(() => {
    //   const arr = []
    //   const updateVal = exchange && exchange.map((row) => {
    //     const obj = {
    //       name : row.name,
    //       url : row.trade_url,
    //     }
    //     arr.push(obj)
    //     setVal(arr)
    //     console.log("once")
    //   })
    // }, [])
  
    useEffect(() => {
      const arr = []
      const updateVal = exchange && exchange.map((row) => {
        const obj = {
          name : row.name,
          url : row.trade_url,
        }
        arr.push(obj)
        setVal(arr)
      })

      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === colors.length - 1 ? 0 : prevIndex + 1
          ),
        delay
      );   
  
      return () => {
        resetTimeout();
      };
    }, [index]);
  
    return (
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {val.map((exchange, index) => (
            <div
              className="slide"
              key={index}
            >
              {exchange.name} <br></br>
              {/* {exchange.url} */}
            </div>
            
          ))}
        </div>
  
        <div className="slideshowDots">
          {val.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
 );
}
 
export default SlideShow;