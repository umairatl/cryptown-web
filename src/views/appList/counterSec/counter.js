import React, { Fragment, useEffect, useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import "../counterSec/counter.css";
import axios from "../../../components/axios/axios";

const Counter = ({ className, ...rest }) => {
  const [userCount, setUserCount] = useState(null);
  const [viewPortEntered, setViewPortEntered] = useState(false);

  useEffect(() => {
    const fetchUserCount = async () => {
      const response = await axios("api/misc/userCount");
      const json = await response.data;

      if (response.status === 200) {
        setUserCount(json);
      }
    };
    fetchUserCount();
  }, []);

  return (
    <Fragment>
      <section className="counter">
        <div className="counter-row">
          <div className="counter-column">
            <strong>
              {userCount && (
                <CountUp
                  {...rest}
                  start={viewPortEntered ? null : 0}
                  end={userCount.userCount}>
                  {({ countUpRef }) => {
                    return (
                      <VisibilitySensor
                        active={!viewPortEntered}
                        onChange={(isVisible) => {
                          if (isVisible) {
                            setViewPortEntered(true);
                          }
                        }}
                        delayedCall>
                        <span className="number" ref={countUpRef} />
                      </VisibilitySensor>
                    );
                  }}
                </CountUp>
              )}
            </strong>
            <span>
              {" "}
              Registered <br /> Users{" "}
            </span>
          </div>

          <div className="counter-column">
            <strong data-number="206">
              {userCount && (
                <CountUp
                  {...rest}
                  start={viewPortEntered ? null : 0}
                  end={userCount.activeUserCount}>
                  {({ countUpRef }) => {
                    return (
                      <VisibilitySensor
                        active={!viewPortEntered}
                        onChange={(isVisible) => {
                          if (isVisible) {
                            setViewPortEntered(true);
                          }
                        }}
                        delayedCall>
                        <span className="number" ref={countUpRef} />
                      </VisibilitySensor>
                    );
                  }}
                </CountUp>
              )}
            </strong>
            <span>
              {" "}
              Active <br /> Users{" "}
            </span>
          </div>

          <div className="counter-column">
            <strong data-number="27">
              {userCount && (
                <CountUp
                  {...rest}
                  start={viewPortEntered ? null : 0}
                  end={userCount.postsCount}>
                  {({ countUpRef }) => {
                    return (
                      <VisibilitySensor
                        active={!viewPortEntered}
                        onChange={(isVisible) => {
                          if (isVisible) {
                            setViewPortEntered(true);
                          }
                        }}
                        delayedCall>
                        <span className="number" ref={countUpRef} />
                      </VisibilitySensor>
                    );
                  }}
                </CountUp>
              )}
            </strong>
            <span>
              Number of <br /> Posts
            </span>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Counter;
