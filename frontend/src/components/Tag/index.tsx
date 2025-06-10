import React from "react";

interface TagProps {
    label: string;
    onRemove: () => void;
}

const Tag: React.FC<TagProps> = ({ label, onRemove }) => (
    <span className="result-table-tag">
        {label}
        <button
            onClick={onRemove}
            aria-label={`Remove ${label}`}
            type="button"
        >
            ×
        </button>
    </span>
);

export default Tag;