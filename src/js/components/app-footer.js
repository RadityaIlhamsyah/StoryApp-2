// File: src/components/app-footer.js
import { LitElement, html } from 'lit';

export class AppFooter extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <footer class="footer mt-5">
        <div class="container">
          <div class="row">
            <div class="col-md-4 mb-4 mb-md-0">
              <h5 class="text-light mb-3">Story App</h5>
              <p class="text-light opacity-75">Share your unique experiences and connect with others through storytelling.</p>
            </div>
            <div class="col-md-4 mb-4 mb-md-0">
              <h5 class="text-light mb-3">Quick Links</h5>
              <ul class="list-unstyled">
                <li><a href="#/home" class="text-light opacity-75 d-block mb-2">Home</a></li>
                <li><a href="#/add" class="text-light opacity-75 d-block mb-2">Add Story</a></li>
                <li><a href="#/profile" class="text-light opacity-75 d-block">My Profile</a></li>
              </ul>
            </div>
            <div class="col-md-4">
              <h5 class="text-light mb-3">Connect</h5>
              <div class="d-flex gap-3">
                <a href="https://www.linkedin.com/in/raditya-taufiq-ilhamsyah-079219286/" class="text-light opacity-75 fs-5"><i class="bi bi-linkedin"></i></a>
                <a href="https://www.instagram.com/betterradityaday/" class="text-light opacity-75 fs-5"><i class="bi bi-instagram"></i></a>
                <a href="https://github.com/RadityaIlhamsyah" class="text-light opacity-75 fs-5"><i class="bi bi-github"></i></a>
              </div>
            </div>
          </div>
          <hr class="border-light opacity-10 my-4" />
          <p class="footer__content">© ${new Date().getFullYear()} Story App | By Raditya Taufiq Ilhamsyah. All rights reserved. Made with ❤️</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);
