// src/js/components/login-form.js
import { LitElement, html } from 'lit';
import { authService } from '../api/api-service';

export class LoginForm extends LitElement {
  static properties = {
    loading: { type: Boolean },
    errorMessage: { type: String },
  };

  constructor() {
    super();
    this.loading = false;
    this.errorMessage = '';
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="container mt-5 pt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card shadow">
              <div class="card-body">
                <h2 class="card-title text-center mb-4">Login to Story App</h2>

                ${this.errorMessage
                  ? html`
                      <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        ${this.errorMessage}
                        <button type="button" class="btn-close" @click=${this._clearError}></button>
                      </div>
                    `
                  : ''}

                <form @submit=${this._handleSubmit} class="needs-validation" novalidate>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" required placeholder="Enter your email" />
                    <div class="invalid-feedback">Please enter a valid email.</div>
                  </div>

                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" required minlength="6" placeholder="Enter your password" />
                    <div class="invalid-feedback">Password must be at least 6 characters.</div>
                  </div>

                  <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary" ?disabled=${this.loading}>
                      ${this.loading
                        ? html`
                            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Logging in...
                          `
                        : 'Login'}
                    </button>
                  </div>
                </form>

                <div class="text-center mt-3">
                  <p>Don't have an account? <a href="#/register">Register</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _clearError() {
    this.errorMessage = '';
  }

  async _handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;

    this.loading = true;

    try {
      await authService.login(email, password);
      window.location.hash = '#/home';
    } catch (error) {
      this.errorMessage = error.message;
    } finally {
      this.loading = false;
    }
  }
}

customElements.define('login-form', LoginForm);
