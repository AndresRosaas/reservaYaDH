import api from "./api";

export const getCategory = async () => {
    const res = await api.get('/category');
    return res.data;
};

export const getCategoryById = async (id) => {
    const res = await api.get('/category/{id}');
    return res.data;
}; 

export const createCategory = async (category) => {
    const res = await api.post('/category', category);
    return res.data;
};

export const deleteCategory = async (id) => {
    const res = await api.delete('/category/{id}');
    return res.data;
};

export const updateCategory = async (id, category) => {
    const res = await api.put('/category/{id}');
    return res.data;
};