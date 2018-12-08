import $ from 'jquery';
import authHelpers from '../../Helpers/authHelpers';
import articlesData from '../../Helpers/data/articlesData';
import initializeArticlesPage from './articlesPage';

const formBuilder = (articles) => {
  const form = `
  <div class="form-group d-flex flex-column articleFun">
    <label for="form-article-name">Please enter article information below:</label>
    <input type="text" class="form-control" value="${articles.title}" id="form-article-title" placeholder="Article Title Goes Here">
    <input type="text" class="form-control" value="${articles.synopsis}" id="form-article-synopsis" placeholder="Article Synopsis Goes Here">
    <input type="text" class="form-control" value="${articles.url}" id="form-article-url" placeholder="Article URL Goes Here">
  </div>
  `;
  return form;
};

const gettingArticleFromForm = () => {
  const article = {
    userUid: authHelpers.getCurrentUid(),
    title: $('#form-article-title').val(),
    synopsis: $('#form-article-synopsis').val(),
    url: $('#form-article-url').val(),
    uid: authHelpers.getCurrentUid(),

  };
  return article;
};

const buildAddForm = () => {
  const emptyArticle = {
    title: '',
    synopsis: '',
    url: '',
  };

  let domString = '<h2>Add New Article</h2>';
  domString += formBuilder(emptyArticle);
  domString += '<button id="add-article">Add Article</button>';
  $('#add-edit-article').html(domString).show();
  // $('#articles').hide();
};

const addNewArticle = () => {
  const newArticle = gettingArticleFromForm();
  articlesData.addNewArticle(newArticle)
    .then(() => {
      // $('#add-edit-article').html('').hide();
      // $('#article').show();
      initializeArticlesPage.initializeArticlePage();
      buildAddForm();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

// Edit
const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  articlesData.getSingleArticle(idToEdit)
    .then((singleArticle) => {
      let domString = '<h2>Edit Article</h2>';
      domString += formBuilder(singleArticle);
      domString += `<button id="edit-article" data-single-edit-id=${singleArticle.id}>Save Article</button>`;
      $('#add-edit-article').html(domString).show();
      // $('#articles').hide();
    })
    .catch((error) => {
      console.error('error in getting single for edit', error);
    });
};

const updateArticle = (e) => {
  const updatedArticle = gettingArticleFromForm();
  const articleId = e.target.dataset.singleEditId;
  articlesData.updateArticle(updatedArticle, articleId)
    .then(() => {
      // $('#add-edit-article').html('').hide();
      // $('#single-article').html('');
      // $('#articles').show();
      initializeArticlesPage.initializeArticlePage();
      buildAddForm();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('body').on('click', '#add-article', addNewArticle);
$('body').on('click', '.edit-btn-art', showEditForm);
$('body').on('click', '#edit-article', updateArticle);

export default { buildAddForm };
