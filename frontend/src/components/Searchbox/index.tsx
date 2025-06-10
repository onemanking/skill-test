import React from 'react';

const Searchbox: React.FC<{
    search: string;
    setSearch: (search: string) => void;
    onSearch: () => void;
    loading: boolean;
}> = ({ search, setSearch, onSearch, loading }) => {
    return (
        <div className="searchbox">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
            />
            <button
                onClick={onSearch}
                className="search-button"
                aria-label="search"
                disabled={loading}
            >
                {loading ? "Searching..." : "Filter"}
            </button>
        </div>
    );
};

export default Searchbox;