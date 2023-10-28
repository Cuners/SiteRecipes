import React from 'react';
import {
    getAllArticles,
} from "../api/articleApi";
const CRUD = () => {
    const [articleData, setArticleData]=React.useState([])
    React.useEffect(() => {
        getAllArticles().then((data) => {
            setArticleData(data)
        })
    }, [])


return(
    <table>
        <tbody>
            <tr>
                <th>Номер</th>
                <th>Название</th>
                <th>Содержание</th>
                <th>Ингредиенты</th>
                <th></th>
            </tr>
            {articleData.map((item, index) =>(
                <tr key={index}>
                    <td>{++index}</td>
                    <td>{item.bludo}</td>
                    <td>{item.recept}</td>
                    <td>{item.ingredients}</td>
                    <td>
                        <button>
                            Изменить
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);
};
export default CRUD;