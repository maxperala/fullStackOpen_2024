


const Country = ({data}) => {
    

    return (
        <div>
            <h2>{data.name.common}</h2>
            <p>capital {data.capital[0]}</p>
            <p>area {data.area}</p>

            <h3>languages:</h3>
            <ul>
                {Object.keys(data.languages).map((key, i) => {
                    return (
                        <li key={i}>{data.languages[key]}</li>
                    )
                })}
            </ul>
            <img src={data.flags.png} alt={`The flag of ${data.name.common}`}/>

        </div>
    )

}


export default Country;