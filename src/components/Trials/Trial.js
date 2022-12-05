import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Button, Grid, Typography } from "@material-ui/core";
import { StyledLinearProgress } from "../../StyledElements";
import DroppableColumn from "./DroppableColumn";
import Arrow from "@elsdoerfer/react-arrow";
import styled from "styled-components";

const RenderArrow = () => (
    <Arrow
        angle={90}
        length={170}
        color="black"
        style={{
            width: "100%",
        }}
    />
);

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

export default class Trial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: {
                "task-1": { id: "task-1", content: "Calm" },
                "task-2": { id: "task-2", content: "Happy" },
                "task-3": { id: "task-3", content: "Sad" },
                "task-4": { id: "task-4", content: "Angry" },
                "task-5": { id: "task-5", content: "Anxious" },
                "task-6": { id: "task-6", content: "Tired" },
                "task-7": { id: "task-7", content: "Thinking" },
                "task-8": { id: "task-8", content: "Calm" },
                "task-9": { id: "task-9", content: "Happy" },
                "task-10": { id: "task-10", content: "Sad" },
                "task-11": { id: "task-11", content: "Angry" },
                "task-12": { id: "task-12", content: "Anxious" },
                "task-13": { id: "task-13", content: "Tired" },
                "task-14": { id: "task-14", content: "Thinking" },
            },
            columns: {
                response: {
                    id: "response",
                    title: "Response",
                    direction: "horizontal",
                    taskIds: [],
                },
                stim: {
                    id: "stim",
                    title: "Mental States",
                    direction: "vertical",
                    taskIds: [],
                },
            },
            trial: 0,
            columnOrder: ["stim", "response"],
            responses: {},
        };
    }

    continue = (e) => {
        e.preventDefault();
        this.recordResponse();
        const { nextStep, stimOrder } = this.props;

        if (this.state.trial === stimOrder.length - 1) {
            nextStep();
        } else {
            this.nextTrial();
        }
    };

    nextTrial = () => {
        const { trial } = this.state;
        this.setState({ trial: trial + 1 }, () => this.setCurrentStim());
        this.updateTrialStartTime();
    };

    updateTrialStartTime = () => {
        this.setState({ trialStartTime: Date.now() });
    };

    setCurrentStim = () => {
        /* Update stim options with each trial. Clear current responses array. */
        const { trial, columns } = this.state;
        const newTaskIds = this.props.stimOrder[trial];
        var newColumns = {
            response: { ...columns.response, taskIds: [] },
            stim: { ...columns.stim, taskIds: newTaskIds },
        };

        this.setState({ columns: newColumns });
    };

    recordResponse = () => {
        const { columns, responses, trial, trialStartTime } =
            this.state;
        var newResponses = {
            ...responses,
            [trial]: {
                response: this.getLabelFromTaskId(columns.response.taskIds),
                stim: this.getLabelFromTaskId(this.props.stimOrder[trial]),
                RT: Date.now() - trialStartTime,
            },
        };
        this.setState({ responses: newResponses });
        return newResponses;
    };

    getLabelFromTaskId = (responsesWithId) => {
        const { tasks } = this.state;
        const responsesWithLabels = responsesWithId.map(
            (taskId) => tasks[taskId].content
        );
        return responsesWithLabels;
    };

    onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            this.setState(newState);
            return;
        }

        /* Moving from one list to another (Stim -> Response OR Response -> Stim) */
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        this.setState(newState);
    };

    componentDidMount() {
        /* When the component loads, update the stim display to show stim options for the first trial and update trial start time. */
        this.setCurrentStim();
        this.updateTrialStartTime();
    }

    componentWillUnmount() {
        this.props.updateParentState("responses", this.recordResponse());
    }

    render() {
        const { columnOrder, columns, tasks, trial } = this.state;
        return (
            <div>
                <StyledLinearProgress
                    variant="determinate"
                    style={{ height: 15 }}
                    value={(trial / this.props.stimOrder.length) * 100}
                />

                <Grid item md={12}>
                    <Typography
                        style={{
                            fontWeight: "bold",
                            color: "black",
                            padding: "3%",
                            fontSize: "32px",
                        }}
                        align="center"
                    >
                        Please drag and drop the mental states in the Response
                        box.
                        <br /> Arrange them in the order that they are most
                        likely to occur in real life.{" "}
                    </Typography>

                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Container>
                            {columnOrder.map((columnId) => {
                                const column = columns[columnId];
                                const data = column.taskIds.map(
                                    (taskId) => tasks[taskId]
                                );
                                return (
                                    <DroppableColumn
                                        key={column.id}
                                        column={column}
                                        data={data}
                                    />
                                );
                            })}
                        </Container>
                    </DragDropContext>
                </Grid>
                <Grid
                    container
                    justifyContent="center"
                    style={{ position: "relative", left: "90px" }}
                >
                    <Grid item style={{ position: "relative", bottom: "80px" }}>
                        <Typography
                            style={{
                                color: "rgb(33,37,40)",
                                fontSize: "16px",
                            }}
                        >
                            <span style={{ float: "left" }}>Earliest</span>
                            <span style={{ float: "right" }}>Latest</span>
                        </Typography>
                        <RenderArrow />
                        <Typography
                            style={{
                                color: "rgb(33,37,40)",
                                fontSize: "17px",
                            }}
                            align="center"
                        >
                            <strong> Time </strong>
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container justifyContent="center">
                    <Button
                        onClick={this.continue}
                        style={{
                            fontSize: "15px",
                            marginTop: "5%",
                            marginBottom: "10%",
                            backgroundColor: "#e4d09e",
                            left: "260px",
                        }}
                        variant="contained"
                        disabled={columns.response.taskIds.length !== 3 && true}
                    >
                        Next
                    </Button>
                </Grid>
            </div>
        );
    }
}
