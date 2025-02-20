import { LitElement, html } from 'lit';

export class StoryCard extends LitElement {
  static properties = {
    story: { type: Object },
  };

  createRenderRoot() {
    return this;
  }

  _formatDate(dateString) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
  }

  render() {
    if (!this.story) {
      return html`<div>No story data available</div>`;
    }

    return html`
      <div class="card shadow-sm h-100">
        <div class="position-relative">
          <img src="${this.story.photoUrl}" class="card-img-top" alt="${this.story.title || 'Story image'}" style="height: 200px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/400x200?text=No+Image'" />
          <div class="position-absolute bottom-0 start-0 p-2 bg-dark bg-opacity-50 text-white w-100">
            <h5 class="card-title mb-0">${this.story.name}</h5>
          </div>
        </div>
        <div class="card-body">
          <p class="card-text">${this.story.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">${this._formatDate(this.story.createdAt)}</small>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('story-card', StoryCard);
