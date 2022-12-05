import React, { Component } from "react";
import Consent from "./Consent";
import Instructions from "./Instructions";
import Trial from "./Trials/Trial";
import DemoSurvey from "./DemoSurvey";
import Debrief from "./Debrief";
import { v4 as uuidv4 } from "uuid";
import selectedStim from "./StimData";

class Experiment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subID: uuidv4(),
            step: 1,
            stimOrder: selectedStim(77),
        };
    }

    updateParentState = (stateToUpdate, newState) => {
        this.setState({
            [stateToUpdate]: newState,
        });
    };

    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
        window.scrollTo(0, 0);
    };

    render() {
        const { step, stimOrder } = this.state;

        switch (step) {
            case 1:
                return <Consent nextStep={this.nextStep} />;
            case 2:
                return <Instructions nextStep={this.nextStep} />;
            case 3:
                return (
                    <Trial
                        nextStep={this.nextStep}
                        updateParentState={this.updateParentState}
                        stimOrder={stimOrder}
                    />
                );
            case 4:
                return (
                    <DemoSurvey
                        nextStep={this.nextStep}
                        updateParentState={this.updateParentState}
                    />
                );
            case 5:
                return (
                    <Debrief
                        nextStep={this.nextStep}
                    />
                );
            default:
        }
    }
}

export default Experiment;
