import $ from 'jquery';
import './navbar.scss';

const navBuilder = () => {
  const logoImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Wikimedia_Community_Logo-Toolserver.svg/1024px-Wikimedia_Community_Logo-Toolserver.svg.png';
  const domString = `
    <nav id="nav-container">
      <div id="nav-logo">
        <img class="logo" src="${logoImg}"/>
      </div>
      <div id="nav-links">
        <button class="btn btn-secondary">Login</button>
        <button class="btn btn-secondary">Messages</button>
        <button class="btn btn-secondary">Articles</button>
        <button class="btn btn-secondary">Events</button>
        <button class="btn btn-secondary">Weather</button>
      </div>
    </nav>
  `;
  $('#navbar-here').html(domString);
};

export default { navBuilder };
