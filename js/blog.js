/**
 * Blog Post Renderer for Moving Mountains Website
 * Handles fetching, parsing, and rendering Markdown blog posts
 */

// Parse frontmatter from markdown content
function parseFrontmatter(markdown) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: markdown };
  }

  const frontmatterText = match[1];
  const content = match[2];

  // Parse YAML frontmatter into object
  const frontmatter = {};
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let currentArray = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Handle array items
    if (trimmed.startsWith('- ')) {
      if (currentArray) {
        const arrayItemMatch = trimmed.match(/- (\w+): (.+)/);
        if (arrayItemMatch) {
          const [, key, value] = arrayItemMatch;
          const obj = currentArray[currentArray.length - 1] || {};
          obj[key] = value.replace(/['"]/g, '');
          if (!currentArray[currentArray.length - 1]) {
            currentArray.push(obj);
          }
        } else {
          currentArray.push(trimmed.substring(2).replace(/['"]/g, ''));
        }
      }
      continue;
    }

    // Handle key-value pairs
    const match = trimmed.match(/^(\w+):\s*(.*)$/);
    if (match) {
      const [, key, value] = match;
      currentKey = key;

      if (value) {
        // Single value
        frontmatter[key] = value.replace(/['"]/g, '');
        currentArray = null;
      } else {
        // Array or object coming
        frontmatter[key] = [];
        currentArray = frontmatter[key];
      }
    }
  }

  return { frontmatter, content };
}

// Get base path for content (works from blog listing or blog post)
function getBasePath() {
  const path = window.location.pathname;
  // Always use ../ since all blog files are in /blog directory now
  return '../';
}

// Fetch and parse a single blog post
async function fetchBlogPost(filename) {
  try {
    const basePath = getBasePath();
    const response = await fetch(`${basePath}content/blog/${filename}`);
    if (!response.ok) throw new Error(`Failed to fetch ${filename}`);

    const markdown = await response.text();
    const { frontmatter, content } = parseFrontmatter(markdown);

    // Convert markdown to HTML using marked
    const html = marked.parse(content);

    return {
      filename,
      ...frontmatter,
      html
    };
  } catch (error) {
    console.error(`Error fetching blog post ${filename}:`, error);
    return null;
  }
}

// Fetch list of all blog posts
async function fetchAllBlogPosts() {
  try {
    const basePath = getBasePath();
    // Read blog post index file
    const response = await fetch(`${basePath}content/blog/index.json`);
    if (!response.ok) throw new Error('Failed to fetch blog index');

    const index = await response.json();
    const posts = await Promise.all(
      index.posts.map(filename => fetchBlogPost(filename))
    );

    // Filter out nulls and sort by date (newest first)
    return posts
      .filter(post => post !== null)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Render blog post list on blog.html
async function renderBlogList() {
  const container = document.getElementById('blog-posts-container');
  if (!container) return;

  const posts = await fetchAllBlogPosts();

  if (posts.length === 0) {
    container.innerHTML = '<p class="text-gray-600">No blog posts found.</p>';
    return;
  }

  // Generate clean URLs for blog posts
  container.innerHTML = posts.map(post => `
    <article class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
      <img src="${post.featured_image}" alt="${post.image_alt || ''}" class="absolute inset-0 -z-10 size-full object-cover">
      <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
      <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

      <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
        <time datetime="${post.date}" class="mr-8">${formatDate(post.date)}</time>
        <div class="flex items-center gap-x-4">
          <svg viewBox="0 0 2 2" class="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
            <circle cx="1" cy="1" r="1" />
          </svg>
          <span>${post.author}</span>
        </div>
      </div>
      <h3 class="mt-3 text-lg/6 font-semibold text-white">
        <a href="/blog/${post.slug}">
          <span class="absolute inset-0"></span>
          ${post.title}
        </a>
      </h3>
    </article>
  `).join('');
}

// Render single blog post (extracts slug from pathname)
async function renderBlogPost() {
  // Extract slug from pathname: /blog/were-officially-open or /blog/were-officially-open.html
  const pathParts = window.location.pathname.split('/').filter(p => p);
  const lastPart = pathParts[pathParts.length - 1];
  const slug = lastPart.replace('.html', '');

  if (!slug || slug === 'blog' || slug === 'index') {
    // Redirect back to blog listing
    window.location.href = '/blog';
    return;
  }

  const container = document.getElementById('blog-post-container');
  if (!container) return;

  // Fetch all posts to find the one with matching slug
  const posts = await fetchAllBlogPosts();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    container.innerHTML = `
      <div class="text-center py-12">
        <p class="text-gray-600">Blog post not found.</p>
        <a href="/blog" class="mt-4 inline-block text-primary hover:text-secondary font-semibold">← Back to Blog</a>
      </div>
    `;
    return;
  }

  // Update page title and meta description
  document.title = `${post.title} | Moving Mountains Blog`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && post.excerpt) {
    metaDesc.setAttribute('content', post.excerpt);
  }

  // Render the post
  container.innerHTML = `
    <!-- Back to Blog Link -->
    <div class="mb-8">
      <a href="/blog" class="text-sm/6 font-semibold text-primary hover:text-secondary">
        ← Back to Blog
      </a>
    </div>

    <!-- Article Header -->
    <header class="mb-12">
      <time datetime="${post.date}" class="block text-sm/6 text-gray-500">${formatDate(post.date)}</time>
      <h1 class="mt-4 text-4xl font-fraunces tracking-tight text-heading sm:text-5xl">${post.title}</h1>
      <p class="mt-4 text-base/7 text-gray-600">By <a href="../${post.author_bio_link}" class="text-primary hover:text-secondary font-semibold">${post.author}</a></p>
    </header>

    <!-- Featured Image -->
    <figure class="mb-12">
      <img src="../${post.featured_image}" alt="${post.image_alt || ''}" class="aspect-4/3 w-full rounded-2xl bg-gray-50 object-cover" />
    </figure>

    <!-- Article Content -->
    <div class="prose prose-lg prose-gray max-w-none space-y-6">
      ${post.html}
    </div>

    ${post.gallery_images && post.gallery_images.length > 0 ? `
    <!-- Office Photos -->
    <div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
      ${post.gallery_images.map(img => `
        <figure>
          <img src="../${img.src}" alt="${img.alt}" class="aspect-4/3 w-full rounded-xl bg-gray-50 object-cover" />
        </figure>
      `).join('')}
    </div>
    ` : ''}

    <!-- Back to Blog Link -->
    <div class="mt-16">
      <a href="/blog" class="text-sm/6 font-semibold text-primary hover:text-secondary">
        ← Back to Blog
      </a>
    </div>

    <!-- Call to Action -->
    <div class="mt-8 rounded-2xl bg-orange-50 p-8 sm:p-12">
      <h2 class="text-2xl font-fraunces tracking-tight text-heading">Ready to take the first step?</h2>
      <p class="mt-4 text-base/7 text-gray-700">We're accepting new clients and would be honored to walk alongside you on your healing journey.</p>
      <div class="mt-8 flex flex-col gap-4 sm:flex-row">
        <a href="../#contact" class="bg-primary text-white hover:bg-secondary transition-colors px-5 py-2.5 text-sm font-medium rounded-lg text-center">
          Get in touch
        </a>
        <a href="../our-team" class="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors px-5 py-2.5 text-sm font-medium rounded-lg text-center">
          Meet our team
        </a>
      </div>
    </div>
  `;

  // Process links in markdown content (make Kate Allain link work)
  const contentLinks = container.querySelectorAll('.prose a[href^="kate-bio"], .prose a[href^="heather-bio"]');
  contentLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.setAttribute('href', `../${href}`);
  });
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Initialize blog functionality based on current page
function initBlog() {
  if (document.getElementById('blog-posts-container')) {
    renderBlogList();
  } else if (document.getElementById('blog-post-container')) {
    renderBlogPost();
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlog);
} else {
  initBlog();
}
