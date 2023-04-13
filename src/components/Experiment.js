import React, { useState } from "react";
import Consent from "./Consent";
import Instructions from "./Instructions";
import DemoSurvey from "./DemoSurvey";
import Trial from "./Trials/Trial";
import Debrief from "./Debrief";
import selectedStim from "./StimData";

function Experiment() {
    const [page, setPage] = useState(1);
    const [responses, setResponses] = useState([]);
    const stimOrder = selectedStim; 
    const [demoData, setDemoData] = useState({
        age: "",
        education: "",
        gender: "",
        sex: "",
        ethnicity: "",
        race: [],
    });

    const nextPage = () => {
        console.log(selectedStim);
        setPage(page + 1);
        window.scrollTo(0, 0);
    };

    const conditionalComponent = () => {
        switch (page) {
            case 1:
                return <Consent nextPage={nextPage} />;
            case 2:
                return <Instructions nextPage={nextPage} />;
            case 3:
                return (
                    <Trial
                        nextPage={nextPage}
                        stimOrder={stimOrder}
                        responses={responses}
                        setResponses={setResponses}
                    />
                );
            case 4:
                return (
                    <DemoSurvey
                        nextPage={nextPage}
                        demoData={demoData}
                        setDemoData={setDemoData}
                    />
                );
            case 5:
                return <Debrief />;
            default:
        }
    };

    return <div>{conditionalComponent()}</div>;
}

export default Experiment;
