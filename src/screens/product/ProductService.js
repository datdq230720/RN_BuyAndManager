import constact from "../../utils/constants";
import axios from "axios";

// PRODUCT
export const getProductForHomePage = async () => {
    const res = await axios.get(constact.API_PRODUCT);
    return res;
}

export const getProductDetail = async (id) => {
    const res = await axios.get(constact.API_PRODUCT + `/${id}`);
    return res;
}

export const getProductSeacrch = async (searchValue) => {
    const res = await axios.get(constact.API_PRODUCT + `?filter=${searchValue}`);
    return res;
}

export const createProduct = async (data) => {
    const res = await axios.post(constact.API_PRODUCT , data);
    return res;
}

export const updateProduct = async (data, id) => {
    const res = await axios.put(constact.API_PRODUCT + `/${id}`, data);
    return res;
}

export const deleteProduct = async (id) => {
    const res = await axios.delete(constact.API_PRODUCT + `/${id}`);
    return res;
}

export const getCartBy = async (isCart, id_user) => {
    const res = await axios.get(constact.HOSTING + `cart` + `/?isCart=${isCart}&id_user=${id_user}`);
    return res;
}
export const getCartByProduct = async (isCart, id_product) => {
    const res = await axios.get(constact.HOSTING + `cart` + `/?isCart=${isCart}&product.id=${id_product}`);
    return res.data;
}

// CART
export const addMyCar = async (data) => {
    const res = await axios.post(constact.HOSTING + `cart`, data);

    return res;
}
export const updateMyCar = async (data, id) => {
    const res = await axios.put(constact.HOSTING + `cart/${id}`, data);
    return res;
}

export const deleteMyCart = async (id) => {
    const res = await axios.delete(constact.HOSTING + `cart/${id}`);
    return res;
}

// HISTORY
export const getHistoryByUser = async (id_user) => {
    const res = await axios.get(constact.HOSTING + `history` + `?id_user=${id_user}`);
    return res;
}
export const createHistoryByUser = async (data) => {
    const res = await axios.post(constact.HOSTING + `history` , data);
    return res;
}

export const getHistoryByAdmin = async (id) => {
    const res = await axios.get(constact.HOSTING + `history`);
    return res;
}

export const updateStatusByAdmin = async (data, id) => {
    const res = await axios.put(constact.HOSTING + `history/${id}`, data);
    return res;
}
