// Import our custom CSS
import '../sass/main.scss';

// Import components
import './components/app-footer.js';
import './components/nav-bar';
import './components/story-card';
import './components/story-list';
import './components/story-form';
import './components/developer-profile';
import './components/home-page';
import './components/login-form';
import './components/register-form';

// Import API services
import { authService, storyService } from './api/api-service';

// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap';

// Router configuration
const routes = {
  '#/home': 'homePage',
  '#/add': 'storyForm',
  '#/profile': 'profilePage',
  '#/login': 'loginPage',
  '#/register': 'registerPage',
};

// Auth protection for routes
const protectedRoutes = ['#/home', '#/add', '#/profile'];
const publicOnlyRoutes = ['#/login', '#/register'];

// Handle routing
async function handleRoute() {
  const hash = window.location.hash || '#/home';
  const isLoggedIn = authService.isLoggedIn();

  // Check for auth requirements
  if (protectedRoutes.includes(hash) && !isLoggedIn) {
    console.log('Access denied: Redirecting to login page');
    window.location.hash = '#/login';
    return;
  }

  if (publicOnlyRoutes.includes(hash) && isLoggedIn) {
    console.log('Already logged in: Redirecting to home page');
    window.location.hash = '#/home';
    return;
  }

  const pages = document.querySelectorAll('.page');
  pages.forEach((page) => {
    page.style.display = 'none';
  });

  const pageId = routes[hash];
  const targetPage = document.getElementById(pageId);

  if (targetPage) {
    targetPage.style.display = 'block';

    // Special handler for story list page
    if (pageId === 'homePage' && isLoggedIn) {
      await loadStories();
    }

    // Update navbar
    const navBar = document.querySelector('nav-bar');
    if (navBar) {
      navBar.updateAuthState();
    }
  } else {
    console.error('Page not found:', pageId);
  }
}

// Load stories from API
async function loadStories() {
  const storyList = document.getElementById('storyList');
  if (!storyList) return;

  storyList.loading = true;
  storyList.error = '';

  try {
    const stories = await storyService.getStories();

    // Map API response to match our component structure
    const formattedStories = stories.map((story) => ({
      id: story.id,
      name: story.name,
      description: story.description,
      photoUrl: story.photoUrl,
      createdAt: story.createdAt,
    }));

    storyList.stories = formattedStories;
  } catch (error) {
    console.error('Error loading stories:', error);
    storyList.error = error.message;
  } finally {
    storyList.loading = false;
  }
}

// Initialize app
function initializeApp() {
  // Set up routing
  window.addEventListener('hashchange', handleRoute);

  // Handle initial route
  handleRoute();

  // Set up retry fetch handler
  const storyList = document.getElementById('storyList');
  if (storyList) {
    storyList.addEventListener('retry-fetch', () => {
      loadStories();
    });
  }
}

// Run app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
