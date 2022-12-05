import React, { Component } from "react";
import { Container, Typography } from "@material-ui/core";
import trial1 from "../images/trial1.png";
import trial2 from "../images/trial2.png";
import trial3 from "../images/trial3.png";
import { StyledButton, Title } from "../StyledElements";
import styled from "styled-components";

const Img = styled.img`
    height: 300px;
    width: auto;
    padding-top: 10px; 
`;

class Instructions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            totalPages: 2,
        };
    }

    continue = (e) => {
        e.preventDefault();
        const { currentPage, totalPages } = this.state;
        if (currentPage === totalPages) {
            this.props.nextStep();
        } else {
            this.nextPage();
        }
    };

    nextPage = () => {
        const { currentPage } = this.state;
        this.setState({ currentPage: currentPage + 1 });
        window.scrollTo(0, 0);
    };

    displayPage = () => {
        const { currentPage } = this.state;
        switch (currentPage) {
            case 1:
                return (
                    <Typography
                        style={{ fontSize: "23px", color: "black", marginBottom: "-3%" }}
                        align="center"
                    >
                        <br />
                        Welcome to the experiment!
                        <br />
                        <br />
                        This experiment studies how people understand others'
                        mental states. Specifically, we are interested in how
                        you think a person will experience certain mental
                        states. The term "mental states" refers to how a person
                        is feeling at the moment.
                        <br />
                        <br />
                        On each trial, you will see three mental state words.
                        <br /><strong> Your task is to drag
                        and drop the mental state words into the Response box in
                        the order that a person is most likely to experience
                        them in real life. </strong>
                        <br /><br />
                        Here's an example:
                        <br />
                        <Img src={trial1} alt="sample trial" />
                        <Img src={trial2} alt="sample trial" style={{marginTop:"-35px"}} />
                        <br />
                        If you think a person is more likely to
                        first feel sad, happy, and then tired, you will order
                        them in the Response box accordingly.
                        <Img
                            src={trial3}
                            alt="sample trial with responses ordered"
                        />
                        <br /> You can rearrange the mental state words inside
                        the Response box as many times as you need by using the
                        drag-and-drop feature.
                    </Typography>
                );
            case 2:
                return (
                    <Typography
                        style={{ fontSize: "23px", color: "black" }}
                        align="center"
                    >
                        <br /> Please click the <strong> NEXT </strong> button
                        to submit your response and continue to the next trial.
                        <br /><br />
                        You will not be allowed to continue if ALL
                        THREE mental state words were not arranged in the Response
                        box. You cannot go back to the previous trial once you click NEXT.
                        <br />
                        <br /> You can track your progress during the experiment
                        with a progress bar located on the top of your screen.
                        After finishing all the trials, you will
                        complete a short demographic survey, be debriefed, and
                        receive your completion code.
                        <br />
                        <br />{" "}
                        <strong>
                            {" "}
                            PLEASE DO NOT REFRESH YOUR BROWSER OR CLICK THE BACK
                            BUTTON DURING THE EXPERIMENT{" "}
                        </strong>
                    </Typography>
                );
            default:
        }
    };

    render() {
        return (
            <div>
                <Container component="main" maxWidth="md" align="true">
                    <Title text="INSTRUCTIONS" />

                    {this.displayPage()}

                    <StyledButton nextPage={this.continue} text="Continue" />
                </Container>
            </div>
        );
    }
}

export default Instructions;
