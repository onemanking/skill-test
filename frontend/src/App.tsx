import './App.css'
import InsertButton from './components/InsertButton';
import ResultTable from './components/ResultTable';
import Searchbox from './components/Searchbox'
import { useState } from 'react'
import { fetchCountries } from './services/api/countryApi';

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchCountries(search);
      setCountries(data);
    } catch {
      setCountries([]);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-full">
        <div>
          <div className='header-row'>
            <p>Countries of the World</p>
            <InsertButton onClick={() => { }} />
          </div>
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
