import $ from 'jquery';
import articleData from '../../Helpers/data/articlesData';
import authHelpers from '../../Helpers/authHelpers';


const printArticles = (articles) => {
  let articleString = '';
  articles.forEach((article) => {
    articleString += `
  <div id="solo-article">
    <h1>${article.title}</h1>
    <p>${article.synopsis}</p>
    <a href="${article.url}">Click here for the full article.</a>
    <button class="btn btn-danger delete-btn" data-delete-id=${article.id}>X</button>
    <button class="btn btn-info edit-btn-art" data-edit-id=${article.id}>Edit</button>
    </div>
  `;
  });
  $('#single-article').html(articleString);
};

const getSingleArticle = (e) => {
  // firebase id
  const articleId = e.target.dataset.dropdownId;
  articleData.getSingleArticle(articleId)
    .then((singleArticle) => {
      printArticles(singleArticle);
    })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};

// const buildDropdown = (articleArray) => {
//   let dropdown = `<div class="dropdown">
//   <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu
// Button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//     Pick an Article
//   </button>
//   <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
//   if (articleArray.length) {
//     articleArray.forEach((article) => {
//       dropdown += `<div class="dropdown-item ge
// t-single" data-dropdown-id=${article.id}>${article.title}</div>`;
//     });
//   } else {
//     dropdown += '<div class="dropdown-item">You have no articles.</div>';
//   }
//   dropdown += '</div></div>';
//   $('#dropdown-article').html(dropdown);
// };

const articlePage = () => {
  const uid = authHelpers.getCurrentUid();
  articleData.getAllArticles(uid)
    .then((articleArray) => {
      printArticles(articleArray);
    })
    .catch((error) => {
      console.error('error in getting articles', error);
    });
};

const deleteArticle = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  articleData.deleteArticle(idToDelete)
    .then(() => {
      articlePage();
      $('#single-article').html('');
    })
    .catch((error) => {
      console.error('error in deleting article', error);
    });
};

const styleFunction = () => {
  const domString = `
  <div id="add-edit-article"></div>
  <div id="single-article"></div>`;
  $('#articles').html(domString);
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleArticle);
  $('body').on('click', '.delete-btn', deleteArticle);
};

const initializeArticlePage = () => {
  articlePage();
  bindEvents();
};

export default { initializeArticlePage, styleFunction };
