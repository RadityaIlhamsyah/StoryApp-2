import { LitElement, html } from 'lit';
import { authService } from '../api/api-service';

export class NavBar extends LitElement {
  static properties = {
    isLoggedIn: { type: Boolean },
    userName: { type: String },
  };

  constructor() {
    super();
    this.isLoggedIn = authService.isLoggedIn();
    this.userName = authService.getUserName() || '';
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    if (window.bootstrap) {
      const dropdownElementList = this.querySelectorAll('.dropdown-toggle');
      dropdownElementList.forEach((dropdown) => {
        new bootstrap.Dropdown(dropdown);
      });

      const navbarCollapse = this.querySelector('.navbar-collapse');
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

      // Event listener untuk tombol close
      const closeButton = this.querySelector('.navbar-close');
      closeButton.addEventListener('click', () => {
        bsCollapse.hide();
      });

      const navLinks = this.querySelectorAll('.nav-link:not(.dropdown-toggle)');
      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 992) {
            bsCollapse.hide();
          }
        });
      });

      const dropdownItems = this.querySelectorAll('.dropdown-item');
      dropdownItems.forEach((item) => {
        item.addEventListener('click', () => {
          if (window.innerWidth < 992) {
            bsCollapse.hide();
          }
        });
      });
    }
  }

  render() {
    return html`
      <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
          <a class="navbar-brand" href="#/home">Story App</a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarContent">
            <!-- Tombol close untuk mobile -->
            <button class="navbar-close d-lg-none" type="button" aria-label="Close menu">
              <i class="bi bi-x-lg"></i>
            </button>

            <ul class="navbar-nav ms-auto">
              ${this.isLoggedIn
                ? html`
                    <li class="nav-item">
                      <a class="nav-link" href="#/home">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#/add">Add Story</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#/profile">About Developer</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Welcome, ${this.userName} </a>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                          <a class="dropdown-item" href="#" @click=${this._handleLogout}> Logout </a>
                        </li>
                      </ul>
                    </li>
                  `
                : html`
                    <li class="nav-item">
                      <a class="nav-link" href="#/login">Login</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#/register">Register</a>
                    </li>
                  `}
            </ul>
          </div>
        </div>
      </nav>
    `;
  }

  _handleLogout(e) {
    e.preventDefault();
    if (window.innerWidth < 992) {
      const navbarCollapse = this.querySelector('.navbar-collapse');
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }

    authService.logout();
    this.isLoggedIn = false;
    this.userName = '';
    window.location.hash = '#/login';
  }

  updateAuthState() {
    this.isLoggedIn = authService.isLoggedIn();
    this.userName = authService.getUserName() || '';
  }
}

customElements.define('nav-bar', NavBar);
