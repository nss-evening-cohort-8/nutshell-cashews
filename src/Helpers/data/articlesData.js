import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllArticles = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/articles.json`)
    .then((results) => {
      const articleObject = results.data;
      const articleArray = [];
      if (articleObject != null) {
        Object.keys(articleObject).forEach((articleId) => {
          articleObject[articleId].id = articleId;
          articleArray.push(articleObject[articleId]);
        });
      }
      resolve(articleArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleArticle = articleId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/articles/${articleId}.json`)
    .then((result) => {
      const singleArticle = result.data;
      singleArticle.id = articleId;
      resolve(singleArticle);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteArticle = articleId => axios.delete(`${firebaseUrl}/articles/${articleId}.json`);

const addNewArticle = articleObject => axios.post(`${firebaseUrl}/articles.json`, JSON.stringify(articleObject));

const updateArticle = (articleObject, articleId) => axios.put(`${firebaseUrl}/articles/${articleId}.json`, JSON.stringify(articleObject));


export default {
  getAllArticles,
  getSingleArticle,
  deleteArticle,
  addNewArticle,
  updateArticle,
};
