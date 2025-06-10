import './App.css'
import ResultTable from './components/ResultTable';
import Searchbox from './components/Searchbox'
import { useState } from 'react'

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const apiURL = `${baseUrl}/countries`;
      const url = search ? `${apiURL}?search=${encodeURIComponent(search)}` : apiURL;
      const res = await fetch(url);
      const data = await res.json();
      setCountries(data);
    } catch (err) {
      console.error("API error:", err);
      setCountries([]);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-full">
        <div>
          <p>Countries of the World</p>
          <Searchbox
            search={search}
            setSearch={setSearch}
            onSearch={handleSearch}
            loading={loading}
          />
          <ResultTable
            countries={countries} />
        </div>
      </div>
    </>
  )
}

export default App
