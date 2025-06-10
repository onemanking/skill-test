import React from 'react';
import './index.css';

const InsertButton: React.FC<{
    onClick: () => void;
}> = ({ onClick }) => {
    return (
        <button className="insert-button" onClick={onClick} aria-label="insert">
            + Country
        </button>
    );
}

export default InsertButton;