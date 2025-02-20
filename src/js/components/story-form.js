// src/js/components/story-form.js - Updated
import { LitElement, html } from 'lit';
import { storyService } from '../api/api-service';

export class StoryForm extends LitElement {
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
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card shadow">
              <div class="card-body">
                <h2 class="card-title text-center mb-4">Add New Story</h2>

                ${this.errorMessage
                  ? html`
                      <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        ${this.errorMessage}
                        <button type="button" class="btn-close" @click=${() => (this.errorMessage = '')}></button>
                      </div>
                    `
                  : ''}

                <form class="needs-validation" novalidate @submit=${this._handleSubmit}>
                  <div class="mb-3">
                    <label for="photo" class="form-label">Photo</label>
                    <input type="file" class="form-control" id="photo" name="photo" accept="image/*" required />
                    <div class="invalid-feedback">Please choose a photo.</div>
                  </div>

                  <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" name="description" rows="4" required minlength="10"></textarea>
                    <div class="invalid-feedback">Please enter a description (minimum 10 characters).</div>
                  </div>

                  <div class="d-grid">
                    <button type="submit" class="btn btn-primary" ?disabled=${this.loading}>
                      ${this.loading
                        ? html`
                            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Uploading Story...
                          `
                        : 'Share Story'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  async _handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const photoInput = form.querySelector('#photo');
    const descriptionInput = form.querySelector('#description');

    if (!photoInput.files[0] || !descriptionInput.value) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      await storyService.addStory(descriptionInput.value, photoInput.files[0]);

      // Reset form
      form.reset();
      form.classList.remove('was-validated');

      // Navigate to home
      window.location.hash = '#/home';
    } catch (error) {
      this.errorMessage = error.message;
    } finally {
      this.loading = false;
    }
  }
}

customElements.define('story-form', StoryForm);
