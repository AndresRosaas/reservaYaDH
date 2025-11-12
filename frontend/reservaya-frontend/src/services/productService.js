import api from "./api";

export const getProducts = async () => {
    const res = await api.get('/products');
    return res.data;
};

export const getProductById = async (id) => {
    const res = await api.get('/products/{id}');
    return res.data;
}; 

export const createProducts = async (product) => {
    const res = await api.post('/products', product);
    return res.data;
};

export const deleteProduct = async (id) => {
    const res = await api.delete('/products/{id}');
    return res.data;
};

export const updateProducts = async (id, product) => {
    const res = await api.put('/products/{id}');
    return res.data;
};