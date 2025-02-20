import { LitElement, html } from 'lit';

export class HomePage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="hero-section mb-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 fade-in">
              <h1 class="display-4 fw-bold mb-3">Share Your <span class="text-gradient">Story</span></h1>
              <p class="lead text-secondary mb-4">Connect with others through your unique experiences and perspectives.</p>
              <a href="#/add" class="btn btn-lg btn-gradient px-4 py-2 shadow">Create New Story</a>
            </div>
            <div class="col-lg-6 d-none d-lg-block text-center fade-in">
              <img src="/images/hero-illustration.svg" alt="Storytelling" class="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row mb-4">
          <div class="col">
            <h2 class="fw-bold text-center mb-4">Latest Stories</h2>
            <div class="d-flex justify-content-center">
              <div class="col-md-6 text-center">
                <p class="text-secondary mb-5">Explore our collection of inspiring stories shared by our community.</p>
              </div>
            </div>
          </div>
        </div>
        <story-list id="storyList"></story-list>
      </div>
    `;
  }
}

customElements.define('home-page', HomePage);
