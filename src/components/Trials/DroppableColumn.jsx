import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import DraggableStim from './DraggableStim';

const Container = styled.div`
  text-align: center;
  margin: 10px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  font-size: 20px;
  font-color: black;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: ${props => (((props.children[0].length === 0 && props['data-rbd-droppable-id'] === "response") && (!props.isDraggingOver)) ? '52px' : '25px')};
  transition: background-color 0.1s ease;
  background-color: ${props => ((props.isDraggingOver && props['data-rbd-droppable-id'] === "response") ? 'rgb(66,37,1,20%)' : 'rgb(222,217,211, 40%)')};
  ${props => (props['data-rbd-droppable-id'] === "stim" ) && {backgroundColor: 'white'}};
`;

export default class DroppableColumn extends React.Component {
  render() { 
    const { column, data} = this.props; 
    return ( 
      <Container style={{minWidth:(column.direction === "horizontal") && "410px", maxHeight: (column.direction === "horizontal") && "150px", maxWidth: (column.direction === "vertical") && "180px", minHeight: (column.direction === "vertical") && "260px"}}>
       
        <Title style={{fontSize:"25px", color:"#165806"}}>{column.title} </Title> 

        <Droppable droppableId={column.id} direction = {column.direction}>
          {(provided, snapshot) => (
            <TaskList id="taskList" ref={provided.innerRef} {...provided.droppableProps} 
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              style={{
                display: (column.direction === "horizontal") && "flex",
              }}
            >
              {data.map((task, index) =>(
                <DraggableStim key={task.id} task={task} index={index} columnId = {column.id}/>
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
        
      </Container>
    );
  }
}