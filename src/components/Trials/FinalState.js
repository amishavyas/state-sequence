import React from "react";
import styled from "styled-components";

const Container = styled.div`
    border: 3px solid black;
    border-radius: 10px;
    background-color: rgb(161, 50, 39, 0.4);
    //display: inline-flex;
    padding: 10px;
    //padding:{({$isOneStep}) => $isOneStep ? '10px' : '0px'};
    justify-content: center;
    font-size: 20px;
    margin-left: 4px;
`;

function FinalState({ word, isOneStep }) {
    return (
        <div>
            
            <div
                style={{
                    fontSize: "18px",
                    position: "relative",
                    bottom: "20px",
                    fontWeight: "bold",
                }}
            >
                Possible Future
            </div>
            <Container> {word} </Container>
        </div>
    );
}

export default FinalState;
