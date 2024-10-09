


const filterReducer = (state = "", action) => {
    switch (action.type) {
        case ("CHANGE_FILTER"): {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}

export const createFilter = (filter) => {
    const action = {
        type: "CHANGE_FILTER",
        payload: filter.toLowerCase()

    }
    return action;
}


export default filterReducer;