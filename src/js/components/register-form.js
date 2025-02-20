// src/js/components/register-form.js
import { LitElement, html } from 'lit';
import { authService } from '../api/api-service';

export class RegisterForm extends LitElement {
  static properties = {
    loading: { type: Boolean },
    errorMessage: { type: String },
    successMessage: { type: String },
  };

  constructor() {
    super();
    this.loading = false;
    this.errorMessage = '';
    this.successMessage = '';
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
                <h2 class="card-title text-center mb-4">Register to Story App</h2>

                ${this.errorMessage
                  ? html`
                      <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        ${this.errorMessage}
                        <button type="button" class="btn-close" @click=${this._clearMessages}></button>
                      </div>
                    `
                  : ''}
                ${this.successMessage
                  ? html`
                      <div class="alert alert-success alert-dismissible fade show" role="alert">
                        ${this.successMessage}
                        <button type="button" class="btn-close" @click=${this._clearMessages}></button>
                      </div>
                    `
                  : ''}

                <form @submit=${this._handleSubmit} class="needs-validation" novalidate>
                  <div class="mb-3">
                    <label for="name" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="name" required placeholder="Enter your full name" />
                    <div class="invalid-feedback">Please enter your name.</div>
                  </div>

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
                            Registering...
                          `
                        : 'Register'}
                    </button>
                  </div>
                </form>

                <div class="text-center mt-3">
                  <p>Already have an account? <a href="#/login">Login</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  async _handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;

    this.loading = true;

    try {
      await authService.register(name, email, password);
      this.successMessage = 'Registration successful! You can now login.';
      form.reset();
      form.classList.remove('was-validated');
    } catch (error) {
      this.errorMessage = error.message;
    } finally {
      this.loading = false;
    }
  }
}

customElements.define('register-form', RegisterForm);
