import React from 'react';
import Arrow from "@elsdoerfer/react-arrow";

const RenderArrow = () => (
    <Arrow
        angle={90}
        length={50}
        color="black"
        style={{
            width: "60px",
        }}
    />
);

function ShowArrow() {
    return (
        <div>
            <div style={{ fontSize: "20px", padding: "3px" }}>
                <div
                    style={{
                        position: "relative",
                        top: "15px",
                        marginBottom: "8px",
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