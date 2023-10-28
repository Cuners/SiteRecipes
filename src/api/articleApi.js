import { $host } from "./index";
export const getAllArticles= async () => {
    const {data} = await $host.get('/getArticle')
    return data
}