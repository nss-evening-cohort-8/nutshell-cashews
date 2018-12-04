import $ from 'jquery';

const printDash = () => {
  const dashString = `
  <div>
    <h1>This will be our dashboard page</h1>
  </div>
  `;
  $('#component-here').html(dashString);
};

export default { printDash };
