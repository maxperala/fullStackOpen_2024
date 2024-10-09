import {changeFilter} from "../reducers/filterReducer";
import { useDispatch, useSelector } from "react-redux";


const Filter = () => {

    const filter = useSelector((store) => store.filter);
    const dispatch = useDispatch();
    const handleChange = (event) => {
      dispatch(changeFilter(event.target.value));

    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} value={filter}/>
      </div>
    )
  }
  
  export default Filter