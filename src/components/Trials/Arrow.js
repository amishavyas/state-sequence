import React from 'react';
import Arrow from "@elsdoerfer/react-arrow";

const RenderArrow = () => (
    <Arrow
        angle={90}
        length={50}
        color="black"
        style={{
            width: "60px",
            top: "31.5px",
            position: "relative",
            right:"5px"
        }}
    />
);

function ShowArrow() {
    return (
        <div style={{ display: "inline-block" }}>
            <div
                style={{
                    fontSize: "20px",
                    padding: "3px",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        top: "15px",
                        left: "30px",
                        marginBottom: "8px",
                        textAlign: "center",
                        display: "inline-block",
                    }}
                >
                    ?
                </div>
                <RenderArrow />
            </div>
        </div>
    );
}

export default ShowArrow;