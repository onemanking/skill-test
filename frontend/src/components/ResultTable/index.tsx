import React, { useState, useRef, useEffect } from 'react';
import type { Country } from '../../types/country';
import './index.css';

interface ResultTableProps {
    countries: Country[];
}

type SortKey = 'country' | 'capital' | 'population';
type SortDirection = 'asc' | 'desc';

const ResultTable: React.FC<ResultTableProps> = ({ countries }) => {
    const [sortKey, setSortKey] = useState<SortKey>('country');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(countries.length / itemsPerPage);
    const paginatedCountries = countries.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const selectAllRef = useRef<HTMLInputElement>(null);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const sortedCountries = [...paginatedCountries].sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            const result = aValue.localeCompare(bValue);
            return sortDirection === 'asc' ? result : -result;
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            const result = aValue - bValue;
            return sortDirection === 'asc' ? result : -result;
        }
        return 0;
    });

    const renderSortArrow = (key: SortKey) => {
        if (sortKey !== key) return null;
        return sortDirection === 'asc' ? ' ▲' : ' ▼';
    };

    const handleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        const pageIds = sortedCountries.map((c) => c.id.toString());
        const allSelected = pageIds.every(id => selectedIds.includes(id));
        if (allSelected) {
            setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
        } else {
            setSelectedIds(prev => [...prev, ...pageIds.filter(id => !prev.includes(id))]);
        }
    };

    useEffect(() => {
        if (selectAllRef.current) {
            const pageIds = sortedCountries.map((c) => c.id.toString());
            const selectedOnPage = pageIds.filter(id => selectedIds.includes(id)).length;
            selectAllRef.current.indeterminate =
                selectedOnPage > 0 && selectedOnPage < pageIds.length;
        }
    }, [selectedIds, sortedCountries]);

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages || 1);
    }, [totalPages, currentPage]);

    return (
        <div className="result-table">

            {/* Selected items */}

            <div className="result-table-tags">
                {selectedIds.length > 0 && (
                    <>
                        <span className="result-table-active-filter">Active Filter:</span>
                        {selectedIds.map((id) => {
                            const country = countries.find(c => c.id.toString() === id);
                            return (
                                <span
                                    key={id}
                                    className="result-table-tag"
                                >
                                    {country ? country.country : id}
                                    <button
                                        onClick={() =>
                                            setSelectedIds(prev => prev.filter(sid => sid !== id))
                                        }
                                        aria-label={`Remove ${country ? country.country : id}`}
                                        type="button"
                                    >
                                        ×
                                    </button>
                                </span>
                            );
                        })}
                    </>
                )}
            </div>

            {/* Table */}

            <table>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                ref={selectAllRef}
                                checked={
                                    sortedCountries.length > 0 &&
                                    sortedCountries.every(c => selectedIds.includes(c.id.toString()))
                                }
                                onChange={handleSelectAll}
                                aria-label="Select all"
                            />
                        </th>
                        <th onClick={() => handleSort('country')} className="result-table-sortable">
                            Country{renderSortArrow('country')}
                        </th>
                        <th onClick={() => handleSort('capital')} className="result-table-sortable">
                            Capital City{renderSortArrow('capital')}
                        </th>
                        <th onClick={() => handleSort('population')} className="result-table-sortable">
                            Population{renderSortArrow('population')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCountries.map((country) => (
                        <tr key={country.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(country.id.toString())}
                                    onChange={() => handleSelect(country.id.toString())}
                                    aria-label={`Select ${country.country}`}
                                />
                            </td>
                            <td>{country.country}</td>
                            <td>{country.capital}</td>
                            <td>{country.population.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Page controls */}

            <div className="result-table-pagination">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="result-table-pagination-info">
                    Page {currentPage} of {totalPages || 1}
                </span>
                <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ResultTable;