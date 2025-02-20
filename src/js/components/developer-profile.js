//src/js/components/developer-profile.js
import { LitElement, html } from 'lit';

export class DeveloperProfile extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card shadow">
              <div class="card-body text-center">
                <img src="removebg.png" alt="Developer" class="rounded-circle mb-3" width="150" />
                <h2 class="card-title">Developer Name</h2>
                <p class="text-muted">Full Stack Developer</p>

                <div class="mb-4">
                  <p class="lead">
                    I am a student majoring in Information Systems at Gunadarma University. I have great enthusiasm in learning various aspects of information technology and how it can be used to solve problems and improve efficiency in
                    various fields. I also have great curiosity and always want to learn new things, especially in the field of information technology. I always strive to keep up with the latest developments in this field and improve my
                    skills, in creating awesome web applications using modern technology. Translated with DeepL.com (free version)
                  </p>
                </div>

                <div class="row justify-content-center">
                  <div class="col-md-8">
                    <h4 class="mb-3">Skills</h4>
                    <div class="d-flex flex-wrap justify-content-center gap-2">
                      <span class="badge bg-primary">HTML</span>
                      <span class="badge bg-primary">CSS</span>
                      <span class="badge bg-primary">JavaScript</span>
                      <span class="badge bg-primary">Lit</span>
                      <span class="badge bg-primary">Webpack</span>
                      <span class="badge bg-primary">Bootstrap</span>
                      <span class="badge bg-primary">SASS</span>
                    </div>
                  </div>
                </div>

                <div class="mt-4">
                  <h4 class="mb-3">Contact</h4>
                  <div class="d-flex justify-content-center gap-3">
                    <a href="https://github.com/RadityaIlhamsyah" class="btn btn-outline-primary" target="_blank" rel="noopener noreferrer"> <i class="bi bi-github"></i> GitHub </a>
                    <a href="https://www.linkedin.com/in/raditya-taufiq-ilhamsyah-079219286/" class="btn btn-outline-primary" target="_blank" rel="noopener noreferrer"> <i class="bi bi-linkedin"></i> LinkedIn </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('developer-profile', DeveloperProfile);
