import $ from 'jquery';

const printArticles = () => {
  const articleString = `
  <div>
    <h1>testing testing 123</h1>
  </div>
  `;
  $('#component-here').html(articleString);
};

export default { printArticles };
