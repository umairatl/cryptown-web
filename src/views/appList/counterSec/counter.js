import React,{Fragment, useState} from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import "../counterSec/counter.css";
const Counter = ({className, ...rest}) => {
    const [viewPortEntered, setViewPortEntered] = useState(false) 


    return(

        <Fragment>
            <section className='counter'>
                <div className='counter-row'>
                <div className='counter-column'>
                    <strong data-number='305'>
                        <CountUp {...rest} start = {viewPortEntered ? null:0} end={305}>
                            {({countUpRef}) => {
                               return(
                                    <VisibilitySensor
                                    active = {!viewPortEntered}
                                    onChange = {isVisible => {
                                        if(isVisible){
                                            setViewPortEntered(true);
                                        }
                                    }}
                                    delayedCall
                                    >
                                    <span className='number' ref={countUpRef} />
                                    </VisibilitySensor>
                               )
                            }}
                        </CountUp>
                    </strong>
                    <span> On Going <br/> Projects </span>
                
                
                </div>

                 <div className='counter-column'>
                    <strong data-number='1050'>
                        <CountUp {...rest} start = {viewPortEntered ? null:0} end={400}>
                            {({countUpRef}) => {
                               return(
                                    <VisibilitySensor
                                    active = {!viewPortEntered}
                                    onChange = {isVisible => {
                                        if(isVisible){
                                            setViewPortEntered(true);
                                        }
                                    }}
                                    delayedCall
                                    >
                                    <span className='number' ref={countUpRef} />
                                    </VisibilitySensor>
                               )
                            }}
                        </CountUp>
                    </strong>
                    <span> Total <br/> Collaboration </span>
                
                
                </div>

                 <div className='counter-column'>
                    <strong data-number='206'>
                        <CountUp {...rest} start = {viewPortEntered ? null:0} end={589}>
                            {({countUpRef}) => {
                               return(
                                    <VisibilitySensor
                                    active = {!viewPortEntered}
                                    onChange = {isVisible => {
                                        if(isVisible){
                                            setViewPortEntered(true);
                                        }
                                    }}
                                    delayedCall
                                    >
                                    <span className='number' ref={countUpRef} />
                                    </VisibilitySensor>
                               )
                            }}
                        </CountUp>
                    </strong>
                    <span> Registered <br/> Users </span>
                
                
                </div>


                 <div className='counter-column'>
                    <strong data-number='27'>
                        <CountUp {...rest} start = {viewPortEntered ? null:0} end={813}>
                            {({countUpRef}) => {
                               return(
                                    <VisibilitySensor
                                    active = {!viewPortEntered}
                                    onChange = {isVisible => {
                                        if(isVisible){
                                            setViewPortEntered(true);
                                        }
                                    }}
                                    delayedCall
                                    >
                                    <span className='number' ref={countUpRef} />
                                    </VisibilitySensor>
                               )
                            }}
                        </CountUp>
                    </strong>
                    <span> Total <br/> Visitors </span>
                
                
                </div>
                </div>
            </section>
        </Fragment>
    );
}


export default Counter;