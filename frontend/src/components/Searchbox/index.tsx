import React, { useState, useRef, useEffect } from 'react';
import './index.css';

const Searchbox: React.FC<{
    search: string;
    setSearch: (search: string) => void;
    onSearch: () => void;
    loading: boolean;
}> = ({ search, setSearch, onSearch, loading }) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const maxSuggestions = 3;

    useEffect(() => {
        if (search.trim() === '') {
            setSuggestions([]);
            return;
        }
        const fetchSuggestions = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
                const url = `${baseUrl}/countries?search=${encodeURIComponent(search)}`;
                const res = await fetch(url);
                const data: { country: string }[] = await res.json();
                setSuggestions(data.slice(0, maxSuggestions).map((c) => c.country));
            } catch {
                setSuggestions([]);
            }
        };
        fetchSuggestions();
    }, [search]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearch(suggestion);
        setShowSuggestions(false);
    };

    const handleBlur = () => {
        setTimeout(() => setShowSuggestions(false), 100);
    };

    return (
        <div className="searchbox searchbox-autocomplete">
            <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={handleBlur}
                placeholder="Search"
                autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="autocomplete-suggestions">
                    {suggestions.map((value, index) => (
                        <li
                            key={index}
                            className="autocomplete-suggestion-item"
                            onMouseDown={() => handleSuggestionClick(value)}
                        >
                            {value}
                        </li>
                    ))}
                </ul>
            )}
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