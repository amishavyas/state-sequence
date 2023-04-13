import React from "react";
import styled from "styled-components";
import Arrow from "@elsdoerfer/react-arrow";

const Container = styled.div`
    border: 3px solid grey;
    background-color: rgb(70, 130, 180, 0.35);
    border-radius: 10px;
    display:{({$isOneStep}) => $!isOneStep && 'inline-flex'};
    //display: inline-flex;
    padding: 10px;
    justify-content: center;
    font-size: 20px;
    margin-right:4px;
    
    //padding:{({$isOneStep}) => $isOneStep ? '10px' : '0px'};
`; 
 
const RenderArrow = () => (
    <Arrow
        angle={90}
        length={50}
        color="black"
        style={{
            width: "60px",
            paddingLeft: "5px",
            paddingRight: "5px",
        }}
    />
);

function PastStates({sequence, isOneStep}) {
    return (
        <div>
            <div
                style={{
                    position: "relative",
                    bottom: "20px",
                    fontWeight: "bold",
                    fontSize: "18px",
                }}
            >
                Already Happened
            </div>
            <Container>
                {sequence.map((word, key) => {
                    return (
                        <>
                            {word}
                            {key !== sequence.length - 1 ? (
                                <RenderArrow />
                            ) : null}
                        </>
                    );
                })}
            </Container>
        </div>
    );
}

export default PastStates;
