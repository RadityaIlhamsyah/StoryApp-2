import { LitElement, html } from 'lit';
import { authService } from '../api/api-service';

export class NavBar extends LitElement {
  static properties = {
    isLoggedIn: { type: Boolean },
    userName: { type: String },
    isDropdownOpen: { type: Boolean },
    isNavbarCollapsed: { type: Boolean },
  };

  constructor() {
    super();
    this.isLoggedIn = authService.isLoggedIn();
    this.userName = authService.getUserName() || '';
    this.isDropdownOpen = false;
    this.isNavbarCollapsed = false;
  }

  // Prevent shadow DOM creation
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._handleResize.bind(this));

    // Check auth state when component is connected
    this.updateAuthState();

    // Wait for DOM to be fully ready
    setTimeout(() => this._initializeBootstrapComponents(), 100);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._handleResize.bind(this));
    this._cleanupBootstrapInstances();
  }

  _cleanupBootstrapInstances() {
    if (window.bootstrap) {
      const dropdownToggles = this.querySelectorAll('.dropdown-toggle');
      dropdownToggles.forEach((toggle) => {
        const instance = bootstrap.Dropdown.getInstance(toggle);
        if (instance) instance.dispose();
      });

      const navbarCollapse = this.querySelector('.navbar-collapse');
      if (navbarCollapse) {
        const instance = bootstrap.Collapse.getInstance(navbarCollapse);
        if (instance) instance.dispose();
      }
    }
  }

  _handleResize() {
    if (window.innerWidth >= 992 && this.isNavbarCollapsed) {
      const navbarCollapse = this.querySelector('.navbar-collapse');
      if (navbarCollapse) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
      this.isNavbarCollapsed = false;
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    // Re-initialize Bootstrap components after DOM is updated
    if (changedProperties.has('isLoggedIn')) {
      setTimeout(() => this._initializeBootstrapComponents(), 100);
    }
  }

  firstUpdated() {
    // Initialize Bootstrap components
    setTimeout(() => this._initializeBootstrapComponents(), 100);
  }

  _initializeBootstrapComponents() {
    if (!window.bootstrap) {
      console.error('Bootstrap is not loaded');
      return;
    }

    // Clean up first to prevent duplicate instances
    this._cleanupBootstrapInstances();

    // Initialize dropdowns
    const dropdownToggles = this.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach((dropdownToggle) => {
      new bootstrap.Dropdown(dropdownToggle, {
        autoClose: true,
      });

      // Manually add click handler to ensure dropdown toggle works
      dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
        if (dropdown) {
          dropdown.toggle();
        }
      });
    });

    // Initialize collapse
    const navbarCollapse = this.querySelector('.navbar-collapse');
    if (navbarCollapse) {
      new bootstrap.Collapse(navbarCollapse, {
        toggle: false,
      });
    }

    // Event listeners for navbar close button
    const closeButton = this.querySelector('.navbar-close');
    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        const navbarCollapse = this.querySelector('.navbar-collapse');
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      });
    }
  }

  _handleLogout(e) {
    e.preventDefault();
    e.stopPropagation();

    // Perform logout
    authService.logout();
    this.isLoggedIn = false;
    this.userName = '';
    window.location.hash = '#/login';
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
                      <button class="nav-link dropdown-toggle btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">Welcome, ${this.userName}</button>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#" @click=${this._handleLogout}>Logout</a></li>
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

  // Public method to update auth state
  updateAuthState() {
    const wasLoggedIn = this.isLoggedIn;
    this.isLoggedIn = authService.isLoggedIn();
    this.userName = authService.getUserName() || '';
  }
}

customElements.define('nav-bar', NavBar);
