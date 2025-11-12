import api from "./api";

export const getFeature = async () => {
    const res = await api.get('/feature');
    return res.data;
};

export const getFeatureById = async (id) => {
    const res = await api.get('/feature/{id}');
    return res.data;
}; 

export const createFeature = async (feature) => {
    const res = await api.post('/feature', feature);
    return res.data;
};

export const deleteFeature = async (id) => {
    const res = await api.delete('/feature/{id}');
    return res.data;
};

export const updateFeature = async (id, feature) => {
    const res = await api.put('/feature/{id}');
    return res.data;
};