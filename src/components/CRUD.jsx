import React from 'react';
import {
    getAllArticles,
    deleteArticle,
    addArticle,
    editArticle,
} from "../api/articleApi";
const CRUD = () => {
    const [articleData, setArticleData]=React.useState([]);
    const [editedArticle,setEditedArticle]=React.useState([]);
    const [newArticle,setNewArticle]=React.useState({
        idBludo:"",
        bludo: "",
        recept:"",
        ingredients:"",
    });
    React.useEffect(() => {
        getAllArticles().then((data) => {
            setArticleData(data)
        })
    }, []);
    const [isAddModalOpen, setAddModalOpen] = React.useState(false);
    const [isEditModalOpen, setEditModalOpen] = React.useState(false);
    const handleDeleteArticle = async (articleId) => {
            const del=articleData.find((item)=>item.idBludo===articleId);
            await deleteArticle(del.idBludo);
            // Обновление списка статей после удаления
            const updatedData = await getAllArticles();
            setArticleData(updatedData);
    };
    const handleUpdateArticle = async () => {
        if (editedArticle) {
            if(editedArticle.bludo==="" || editedArticle.recept==="" || editedArticle.ingredients===""){
                alert("Ошибка: Заполните все поля.");
                return;
            }
            else
            {
                await editArticle(editedArticle.idBludo, editedArticle);
                // Обновление списка статей после редактирования
                const updatedData = await getAllArticles();
                setArticleData(updatedData);
                setEditedArticle(null); // Закрываем форму редактирования
            }
        }
    };

    const handleEditArticle = (articleId) => {
        const articleToEdit = articleData.find((item) => item.idBludo === articleId);
        setEditedArticle({ ...articleToEdit });
        setEditModalOpen(true); // Открываем модальное окно редактирования
    };
    
    const handleCancelEdit = () => {
        setEditModalOpen(false); // Закрываем модальное окно редактирования
    };
    const handleOpenAdd = async () => {
        setAddModalOpen(true);
    }
    const handleCloseAdd=async() =>{
        setAddModalOpen(false);
    }
    const handleAddArticle = async () => {
        try{
            let articleToAdd=articleData.find((item)=>item.idBludo===newArticle.idBludo);
            if(articleToAdd!=null){
                alert("Ошибка: такое id уже существует.");
                return;
            }
            else if(newArticle.bludo==="" || newArticle.recept==="" || newArticle.ingredients==="")
            {
                alert("Ошибка: Заполните все поля.");
                return;
            }
            else
            {
                await addArticle(newArticle);
                const updatedData = await getAllArticles();
                setArticleData(updatedData);
                setNewArticle({ 
                    idBludo:"",
                    bludo: "",
                    recept: "",
                    ingredients: "",
                });
                setAddModalOpen(false);
            }
        }
        catch(error)
        {
            console.error("Ошибка при добавлении статьи:", error);
        }
    };
    


return(
    <div>
        <button onClick={handleOpenAdd}>Добавить рецепт</button>
    <table>
        <tbody>
            <tr>
                <th>Номер</th>
                <th>Название</th>
                <th>Содержание</th>
                <th>Ингредиенты</th>
                <th>Удалить</th>
                <th>Изменить</th>
            </tr>
            {articleData.map((item, index) =>(
                <tr key={index}>
                    <td>{item.idBludo}</td>
                    <td>{item.bludo}</td>
                    <td>{item.recept}</td>
                    <td>{item.ingredients}</td>
                    <td>
                        <button onClick={()=>handleDeleteArticle(item.idBludo)}>
                            Удалить
                        </button>
                    </td>
                    <td>
                        <button onClick={()=>handleEditArticle(item.idBludo)}>
                            Изменить
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    
            {isEditModalOpen && editedArticle && (
            <div>
                <div className="overlay" onClick={handleCancelEdit}></div>
                <div className="modal">
                    <input
                        disabled
                        type="number"
                        value={editedArticle.idBludo}
                        onChange={(e) => setEditedArticle({ ...editedArticle, idBludo: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editedArticle.bludo}
                        onChange={(e) => setEditedArticle({ ...editedArticle, bludo: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editedArticle.recept}
                        onChange={(e) => setEditedArticle({ ...editedArticle, recept: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editedArticle.ingredients}
                        onChange={(e) => setEditedArticle({ ...editedArticle, ingredients: e.target.value })}
                    />
                    <button onClick={handleUpdateArticle}>Сохранить</button>
                    <button onClick={handleCancelEdit}>Отмена</button>
                    </div>
                </div>
            )}
            {isAddModalOpen && (
            <div>
            <div className="overlay" onClick={handleCloseAdd}></div>
            <div className="modal">
                <input
                    type="number"
                    placeholder='IdBludo'
                    value={newArticle.idBludo}
                    onChange={(e) => setNewArticle({ ...newArticle, idBludo: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Название"
                    value={newArticle.bludo}
                    onChange={(e) => setNewArticle({ ...newArticle, bludo: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Содержание"
                    value={newArticle.recept}
                    onChange={(e) => setNewArticle({ ...newArticle, recept: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Ингредиенты"
                    value={newArticle.ingredients}
                    onChange={(e) => setNewArticle({ ...newArticle, ingredients: e.target.value })}
                />
                <button onClick={handleAddArticle}>Добавить</button>
            </div>
            </div>
            )}
            
    </div>
);
};
export default CRUD;