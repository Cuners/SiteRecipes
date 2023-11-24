import { $host } from "./index";
export const getAllArticles= async () => {
    const {data} = await $host.get('/getArticle')
    return data
}

export const addArticle = async (articleData) => {
    const response = await $host.post('/api/Home', articleData);
    return response.data;
}

export const editArticle = async (articleId, articleData) => {
    const response = await $host.put(`/api/Home/${articleId}`, articleData);
    return response.data;
}

export const deleteArticle = async (articleId) => {
    const response = await $host.delete(`/api/Home/${articleId}`);
    return response.data;
}