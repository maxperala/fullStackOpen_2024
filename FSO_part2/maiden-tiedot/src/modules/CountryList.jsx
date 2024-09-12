import Country from "./Contry";
import {useState} from 'react';


const CountryList = ({list, showSearch}) => {

    const [single, setSingle] = useState(false);
    const [selected, setSelected] = useState({});


    const onShowClick = (i) => {
        setSingle(true);
        setSelected(list[i]);
        showSearch(false);

    }
    const goBack = () => {
        setSingle(false);
        setSelected({});
        showSearch(true);
    }


    if (single) {
        return (
            <div>
                <Country data={selected} />
                <button onClick={goBack}>back</button>
            </div>
            
        )
    }


    if (list.length === 1) {
        return (
            <Country data={list[0]} />
        )
    }


    if (list.length <= 10) {

        return (
            <div>
                {list.map((item, i) => {
                return (
                    <div key={i}>
                        <li>{item.name.common}</li>
                        <button onClick={() => onShowClick(i)}>Show</button>
                    </div>
                )
            })}
            </div>
            
        )
    }
    return (
        <div>
            <p>Too many countries, specify another filter</p>
        </div>
    )

    

}




export default CountryList;