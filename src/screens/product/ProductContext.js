import React, {useState, createContext} from 'react';
import { getProductForHomePage, getProductDetail,
    getProductSeacrch, createProduct, updateProduct, 
    deleteProduct, getCartBy, addMyCar, updateMyCar, deleteMyCart, 
    getCartByProduct, createHistoryByUser, getHistoryByUser, 
    getHistoryByAdmin, updateStatusByAdmin} from './ProductService';


export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
    const {children} = props;

    const updateStatusCartByAdmin = async (data, id) => {
        const res = await updateStatusByAdmin(data, id);
        if (res.status == 200 || res.status == 201){
            return true;
        }
        return false;
    }

    const getHistoryCartByAdmin = async () => {
        const history = await getHistoryByAdmin();
        return history.data
    }

    const getHistoryCartByUser = async (id_user) => {
        const history = await getHistoryByUser(id_user);
        return history.data
    }

    const setPayCart = async (data) => {
        const result = await createHistoryByUser(data);
        console.log(result.status);
        if (result.status == 200 || result.status == 201){
            return true;
        }
        return false;
    }


    const AddMyCar = async (id_product, id_user, data) => {
        const product = await getCartByProduct(true, id_product);
        if (product.length > 0) {
            // update
            const update = await updateMyCar(data, product[0].id);
            return update.status;
        }else {
            // create
            const create = await addMyCar(data);
            return create.status;
        }
    }
    const deleteMyCar = async (id) => {
        const status = await deleteMyCart(id);
        return status.status
    }
    const deleteAllCartUser2 = async (data, isUpdate) => {
        for (let index = 0; index < data.length; index++) {
            await deleteMyCar(data[index].id);
            let item = data[index].product;
            if (isUpdate == true) {
                let onePro = await OnGetProductDetail(item.id);
                onePro.quantity = onePro.quantity - item.quantity;
                updateProductById(onePro ,onePro.id);
            }
        }
    }

    const OnGetCartBy = async (isCart, id_user) => {
        try{
            let res = await getCartBy(isCart, id_user);
            let _data = res.data;
            if(res.status == 200){
                await CheckMyCart(_data);
                res = await getCartBy(isCart, id_user); 
                return res.data;    
            }
        }catch (error){ 
            console.log('getProductForHomePage error: ',error); 
        }
    }
    const  CheckMyCart = async (_data) => {
        for (let index = 0; index < _data.length; index++) {
            const element = _data[index];
            let a = element.product;
            let b = await OnGetProductDetail(a.id);
            if (b == null) {
                await deleteMyCar(element.id)
            }
        }
    }
    const OnGetProductForHomePage = async () =>{
        try{
            const res = await getProductForHomePage();
            if(res.status == 200){
                return res.data;    
            }
        }catch (error){ 
            console.log('getProductForHomePage error: ',error); 
        }
        return [];
    }

    const createProductByAdmin = async (data) => {
        const res = await createProduct(data);
        return res.status;
    }

    const deleteProductById = async (id) => {
        const res = await deleteProduct(id);
        return res.status;
    }

    const updateProductById = async (data, id) =>{
        try{
            const res = await updateProduct(data, id);
            if(res.status == 200 || res.status == 201){
                return true;    
            }
        }catch (error){ 
            console.log('OnGetProductSearch error: ',error); 
        }
        return false;
    }

    const OnGetProductSearch = async (searchValue) =>{
        try{
            const res = await getProductSeacrch(searchValue);
            if(res.status == 200){
                return res.data;    
            }
        }catch (error){ 
            console.log('OnGetProductSearch error: ',error); 
        }
        return [];
    }

    const OnGetProductDetail = async (id) =>{
        try{
            const res = await getProductDetail(id);
            if(res.status == 200){
                return res.data;    
            }
        }catch (error){ 
            console.log('ProductContex(: 14) OnGetProductDetail error: ',error);
        }
        return null;
    }
    
    return (
        <ProductContext.Provider 
            value={{
                OnGetProductForHomePage, OnGetProductDetail,
                 OnGetProductSearch, OnGetCartBy, AddMyCar, deleteMyCar,
                 setPayCart, getHistoryCartByUser, deleteAllCartUser2,
                 createProductByAdmin, deleteProductById, updateProductById,
                 getHistoryCartByAdmin, updateStatusCartByAdmin
            }} 
        >
            {children}
        </ProductContext.Provider>
    );
};


