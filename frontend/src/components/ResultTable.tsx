import React, { useState } from 'react';
import type { Country } from '../types/country';

interface ResultTableProps {
    countries: Country[];
}

type SortKey = 'country' | 'capital' | 'population';
type SortDirection = 'asc' | 'desc';

const ResultTable: React.FC<ResultTableProps> = ({ countries }) => {
    const [sortKey, setSortKey] = useState<SortKey>('country');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const sortedCountries = [...countries].sort((a, b) => {
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

    // use css for the sort arrow
    const renderSortArrow = (key: SortKey) => {
        if (sortKey !== key) return null;
        return sortDirection === 'asc' ? ' ▲' : ' ▼';
    };

    return (
        <div className="result-table">
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('country')} style={{ cursor: 'pointer' }}>
                            Country{renderSortArrow('country')}
                        </th>
                        <th onClick={() => handleSort('capital')} style={{ cursor: 'pointer' }}>
                            Capital City{renderSortArrow('capital')}
                        </th>
                        <th onClick={() => handleSort('population')} style={{ cursor: 'pointer' }}>
                            Population{renderSortArrow('population')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCountries.map((country) => (
                        <tr key={country.id}>
                            <td>{country.country}</td>
                            <td>{country.capital}</td>
                            <td>{country.population.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultTable;