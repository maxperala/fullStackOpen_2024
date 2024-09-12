import {getAll} from "./utils/network"
import { useEffect, useState } from "react"
import Search from "./modules/Search";
import {searchData} from "./utils/countriesUtil";
import CountryList from "./modules/CountryList";

function App() {
  
  const [countries, setCountires] = useState({});
  const [search, setSearch] = useState("");
  const [result, setResult] = useState({});
  const [showSearch, setShowSearch] = useState(true);

  const updateSearch = (event) => {
    setSearch(event.target.value);
    const toShow = searchData(countries, event.target.value);
    setResult(toShow);
  }

  const showAndResetSearch = (yesOrNo) => {
    if (yesOrNo) {
      setShowSearch(yesOrNo);
      return;
    }

    setShowSearch(yesOrNo);
    setSearch("");
    const toShow = searchData(countries, "");
    setResult(toShow);
    

  }


  useEffect(() => {
    getAll().then((data) => {
      if (data.error) return;
      setCountires(data)
    })
  }, [])


  return (
    <div>
      {showSearch ? <Search search={search} onChange={updateSearch}/> : null}
      
      <CountryList list={result} showSearch={showAndResetSearch} />
    </div>
  )

  
}

export default App
