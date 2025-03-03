// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Function to strip frontmatter from markdown content
function stripFrontmatter(content) {
    // Check if content starts with frontmatter (---)
    if (content.trim().startsWith('---')) {
        // Find the second occurrence of ---
        const endIndex = content.indexOf('---', 3);
        if (endIndex !== -1) {
            // Return content after the second ---
            return content.slice(endIndex + 3).trim();
        }
    }
    return content;
}

// Function to create blog post list item
function createBlogPostCard(post) {
    const item = document.createElement('article');
    item.className = 'blog-post-item';
    
    item.innerHTML = `
        <h2>
            <a href="post.html?id=${post.id}">${post.title}</a>
        </h2>
        <p class="excerpt">${post.excerpt}</p>
        <div class="meta">
            <div class="post-date">
                <i class="far fa-calendar-alt"></i>
                ${formatDate(post.date)}
            </div>
            <div class="tags">
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return item;
}

// Function to load blog posts
async function loadBlogPosts() {
    try {
        const response = await fetch('posts/posts.json');
        const posts = await response.json();
        
        const blogPostsContainer = document.getElementById('blog-posts');
        if (blogPostsContainer) {
            blogPostsContainer.className = 'blog-post-list';
            posts.forEach(post => {
                blogPostsContainer.appendChild(createBlogPostCard(post));
            });
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

// Function to load and render a single blog post
async function loadBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) return;
    
    try {
        const response = await fetch(`posts/${postId}.md`);
        const markdown = await response.text();
        
        const contentContainer = document.getElementById('blog-post-content');
        if (contentContainer) {
            // Strip frontmatter before rendering
            const cleanMarkdown = stripFrontmatter(markdown);
            contentContainer.innerHTML = marked.parse(cleanMarkdown);
        }
    } catch (error) {
        console.error('Error loading blog post:', error);
    }
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('blog-posts')) {
        loadBlogPosts();
    } else if (document.getElementById('blog-post-content')) {
        loadBlogPost();
    }
}); 