import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-right: auto;
  margin-left:auto;
  margin-bottom:8px;
  background-color: ${props => (props.isDragging ? 'rgb(66,37,1,30%)' : 'white')};
  justify-content: center;
  display: flex;
  font-size:20px;
`;

export default class DraggableStim extends React.Component {
  
  getStyle = (style, snapshot) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      /* Cannot be 0, but make it very small. This makes the drop faster. 
      If user starts to drag another word while drop is incomplete,
      the experiment glitches. Stimuli options change, disappear, and other trials are affected.
      Reducing transition duration prevents multiple drags. */ 
      transitionDuration: `0.07s`,
    };
  }

  render() {
    const { task, index } = this.props; 
    return (
      <Draggable draggableId={task.id} index={index} style={{justify: "center"}}>
        {(provided, snapshot) => (
          <Container 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            style={this.getStyle(provided.draggableProps.style, snapshot)}
          >
            {task.content}
          </Container>
        )}
      </Draggable>  
    );
  }
}

