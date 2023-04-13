import React from "react";
import { Container, Typography } from "@mui/material";
import { StyledButton, Title } from "../StyledElements";

function Instructions({ nextPage }) {
    return (
        <div>
            <Container component="main" maxWidth="md" align="center">
                <Title text="INSTRUCTIONS" />
                <Typography fontSize="21px">
                    <br />
                    Welcome to the experiment!
                    <br />
                    <br />
                    This experiment studies how people understand others' mental
                    states. Specifically, we are interested in how you think a
                    person will experience certain mental states. The term
                    "mental states" refers to how a person is feeling at the
                    moment.
                    <br />
                    <br />
                    On each trial, you will see a sequence of mental state words
                    that a person experienced and another state that they might
                    experience.
                    <br />
                    <br />
                    <strong>
                        Your task is to carefully consider the sequence of
                        mental states that the person already experienced and
                        rate how likely they are to experience the following
                        state.
                    </strong>
                </Typography>
                <StyledButton handleClick={nextPage} text="CONTINUE" />
            </Container>
        </div>
    );
}

export default Instructions;
