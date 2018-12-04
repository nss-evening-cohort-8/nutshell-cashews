import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import articleData from '../../helpers/data/taskData';

const printArticles = (article) => {
  const articleString = `
  <div>
    <h1>${article.title}</h1>
    <p>${article.synopsis}</p>
    <a href="${article.url}">Click here for the full article.</a>
    <button class="btn btn-danger delete-btn" data-delete-id=${article.id}>X</button>
    <button class="btn btn-info edit-btn" data-edit-id=${article.id}>Edit</button>
    </div>
  `;
  $('#articles').html(articleString);
};

const getSingleArticle = (e) => {
  // firebase id
  const articleId = e.target.dataset.dropdownId;
  const uid = authHelpers.getCurrentUid();
  articleData.getSingleTask(articleId)
    .then((singleArticle) => {
      console.log('uid', uid);
      printArticles(singleArticle);
    })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};

export default { printArticles };
