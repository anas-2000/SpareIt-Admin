import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
    getProductFailure,
    getProductStart,
    getProductSuccess,
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    updateProductFailure,
    updateProductStart,
    updateProductSuccess,
    addProductFailure,
    addProductStart,
    addProductSuccess,
} from "./productRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        if(res.data.isAdmin)
            dispatch(loginSuccess(res.data));
        else
            dispatch(loginFailure());
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
};

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        const res = await userRequest.delete(`/products/${id}`); // uncomment to actually delete from database
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};

export const updateProduct = async (id, updates, dispatch) => {
    dispatch(updateProductStart());
    try {
        // update
        const res = await userRequest.put(`/products/${id}`, updates);
        const product = res.data;
        dispatch(updateProductSuccess({ id, product }));
        alert("Product details updated successfully!");
        // dispatch(updateProductSuccess({ id, product }));
    } catch (err) {
        dispatch(updateProductFailure());
    }
};
export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post(`/products`, product);
        dispatch(addProductSuccess(res.data));
        alert("Product added successfully");
    } catch (err) {
        dispatch(addProductFailure());
    }
};