import { LitElement, html } from 'lit';
import './story-card';

export class StoryList extends LitElement {
  static properties = {
    stories: { type: Array },
    loading: { type: Boolean },
    error: { type: String },
  };

  constructor() {
    super();
    this.stories = [];
    this.loading = true;
    this.error = '';
  }

  createRenderRoot() {
    return this;
  }

  render() {
    if (this.loading) {
      return this._renderLoading();
    }

    if (this.error) {
      return this._renderError();
    }

    return html`
      <div class="container mt-4">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          ${this.stories.map(
            (story) => html`
              <div class="col">
                <story-card .story=${story}></story-card>
              </div>
            `
          )}
        </div>
        ${this.stories.length === 0
          ? html`
              <div class="text-center py-5">
                <h3>No stories yet</h3>
                <p>Share your first story now!</p>
              </div>
            `
          : ''}
      </div>
    `;
  }

  _renderLoading() {
    return html`
      <div class="container mt-4">
        <div class="row">
          ${Array(6)
            .fill()
            .map(
              () => html`
                <div class="col-md-4 mb-4">
                  <div class="story-card">
                    <div class="skeleton-loader" style="height: 240px;"></div>
                    <div class="story-card__content">
                      <div class="skeleton-loader mb-2" style="height: 24px; width: 80%;"></div>
                      <div class="skeleton-loader mb-2" style="height: 16px; width: 100%;"></div>
                      <div class="skeleton-loader mb-2" style="height: 16px; width: 90%;"></div>
                      <div class="skeleton-loader" style="height: 16px; width: 50%;"></div>
                    </div>
                  </div>
                </div>
              `
            )}
        </div>
      </div>
    `;
  }

  _renderError() {
    return html`
      <div class="container mt-4">
        <div class="alert alert-danger" role="alert">
          <h4 class="alert-heading">Error Loading Stories</h4>
          <p>${this.error}</p>
          <hr />
          <button class="btn btn-outline-danger" @click=${this._retryFetch}>Try Again</button>
        </div>
      </div>
    `;
  }

  _retryFetch() {
    this.dispatchEvent(
      new CustomEvent('retry-fetch', {
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('story-list', StoryList);
