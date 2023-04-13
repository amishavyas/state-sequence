import React, { useState, useEffect } from "react";
import { Container, LinearProgress, Typography } from "@mui/material";
import styled from "styled-components";
import PastStates from "./PastStates";
import { StyledButton, StyledSlider } from "../../StyledElements";
import FinalState from "./FinalState";
import ShowArrow from "./Arrow";

const Sequence = styled.div`
    padding-top: 40px;
    padding-bottom: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

function Trial({ stimOrder, responses, setResponses, nextPage }) {
    const [trialNum, setTrialNum] = useState(0);
    const [currSeq, setCurrSeq] = useState(stimOrder[trialNum]);
    const [RT, setRT] = useState(0);
    const [slider, setSlider] = useState({
        value: 0,
        moved: false,
    });

    const setTrial = () => {
        /* Resetting states (RT, new stim, slider values) for the new trial */
        setRT(Date.now());
        setCurrSeq(stimOrder[trialNum]);
        setSlider({ value: 0, moved: false });
    };

    const nextTrial = () => {
        /*
            Record responses and move to the next trial only if the ratings slider has been moved
            If not, display an alert 
        */
        if (slider.moved) {
            setResponses([
                ...responses,
                {
                    trial: trialNum,
                    stim: currSeq,
                    rating: slider.value,
                    RT: Date.now() - RT,
                },
            ]);
            setTrialNum(trialNum + 1);
        } else {
            alert(
                "Please enter your response by clicking on the slider to continue."
            );
        }
    };

    const handleSlider = (_, newValue) => {
        /* 
            Record new slider value and that it has been interacted with
            Users cannot proceed to the next trial without moving the slider
            from its default position 
        */
        setSlider({ value: newValue, moved: true });
    };

    useEffect(() => {
        /* Runs only when trialNum updates */
        if (trialNum === stimOrder.length) {
            nextPage();
        } else {
            setTrial();
        }
    }, [trialNum]);

    return (
        <div>
            <LinearProgress
                variant="determinate"
                value={(trialNum / stimOrder.length) * 100}
                sx={{
                    height: 10,
                    backgroundColor: `#c7d1bc`,
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: `#165806`,
                    },
                }}
            />
            <Container component="main" maxWidth="xl" align="center">
                <Typography
                    fontSize="22px"
                    fontWeight="bold"
                    padding="25px"
                    align="center"
                >
                    Imagine that a person has just experienced the sequence of
                    mental states shown in the blue box below. <br />  How likely
                    is it that the next state they experience would be the one
                    in the red box? Click on the slider to respond.
                </Typography>
                <Sequence>
                    <PastStates
                        sequence={currSeq.slice(0, -1)}
                        isOneStep={currSeq.length === 2}
                    />
                    <ShowArrow />
                    <FinalState
                        word={currSeq.slice(-1)}
                        isOneStep={currSeq.length === 2}
                    />
                </Sequence>
                <Container maxWidth="lg">
                    <StyledSlider
                        value={slider.value}
                        valueLabelDisplay="auto"
                        onChange={handleSlider}
                        min={0}
                        max={100}
                        style={{ marginTop: "20px" }}
                    />
                    <Typography fontSize="22px">
                        <span style={{ float: "left" }}>0%</span>
                        <span style={{ float: "right" }}>100%</span>
                    </Typography>
                </Container>
                <StyledButton handleClick={nextTrial} text="Next Trial" />
            </Container>
        </div>
    );
}

export default Trial;
