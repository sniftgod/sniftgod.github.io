// Post manager: reads/writes posts to localStorage and renders them.
const STORAGE_KEY = "sniftgod_posts";

let posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Seed with sample posts if none exist
if (posts.length === 0) {
  posts = [
    {
      id: Date.now() - 2,
      title: "Welcome to sniftgod.github.io",
      body: "This is your first project post. Use the write box above to add more!",
      category: "Project",
      createdAt: new Date().toISOString(),
    },
    {
      id: Date.now() - 1,
      title: "How it works",
      body: "Posts are saved in your browser's localStorage. They persist across page reloads.",
      category: "Note",
      createdAt: new Date().toISOString(),
    },
  ];
  savePosts();
}

function savePosts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function renderPosts() {
  const container = document.getElementById("posts-container");
  container.innerHTML = "";

  if (posts.length === 0) {
    container.innerHTML =
      '<div class="empty-state">No posts yet. Write your first one above!</div>';
    return;
  }

  // Newest first
  const sorted = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  sorted.forEach((post) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <span class="tag">${escapeHtml(post.category)}</span>
      <h3>${escapeHtml(post.title)}</h3>
      <p>${escapeHtml(post.body)}</p>
      <div class="meta">
        <span>${formatDate(post.createdAt)}</span>
        <button class="delete-btn" data-id="${post.id}">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function addPost(title, body, category) {
  const post = {
    id: Date.now(),
    title,
    body,
    category,
    createdAt: new Date().toISOString(),
  };
  posts.push(post);
  savePosts();
  renderPosts();
}

function deletePost(id) {
  if (!confirm("Delete this post?")) return;
  posts = posts.filter((p) => p.id !== id);
  savePosts();
  renderPosts();
}

// Wire up form
const form = document.getElementById("post-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("post-title").value.trim();
  const body = document.getElementById("post-body").value.trim();
  const category = document.getElementById("post-category").value;

  if (!title || !body) return;

  addPost(title, body, category);
  form.reset();
});

// Wire up delete buttons (delegated)
document.getElementById("posts-container").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    deletePost(Number(e.target.dataset.id));
  }
});

// Initial render
renderPosts();

// Highlight active nav link on scroll
const links = document.querySelectorAll('.nav a');

function setActiveLink() {
  const fromTop = window.scrollY + 100;
  const sections = document.querySelectorAll('section[id]');
  let current = null;

  sections.forEach((section) => {
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      current = section.getAttribute('id');
    }
  });

  links.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);
