




const searchData = (data, searchWord) => {

    const result = data.filter((item) => item.name.common.toLowerCase().includes(searchWord.toLowerCase()));
    return result;

}



export {searchData};