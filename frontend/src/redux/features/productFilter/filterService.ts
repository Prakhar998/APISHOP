import axios from "axios";

//get all products
const getProducts = async (searchParms:any) => {

    //console.log(searchParms);
    // let productParams = '';
    // if(filterParams.categoryId) productParams  += `?category[_id]=${filterParams.categoryId[0]}`
    const res = await axios.get(`/api/products/all/${searchParms}`);

    return res.data;
}


//get all categories
const getCategories = async () => {

    const res = await axios.get('/api/admin/product/category/all');
    return res.data;
}

const filterService = {getProducts, getCategories };

export default filterService;