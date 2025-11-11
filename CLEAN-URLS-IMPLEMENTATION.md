# Clean URLs Implementation - Complete Summary

## What Changed

Successfully migrated from query parameter-based blog URLs to clean, SEO-friendly URLs with automatic HTML generation.

### URL Structure Changes

**Before:**
- Blog listing: `/blog.html` or `/blog`
- Single post: `/blog/post.html?slug=were-officially-open`

**After:**
- Blog listing: `/blog` (serves `/blog/index.html`)
- Single post: `/blog/were-officially-open` (serves `/blog/were-officially-open.html`)

All `.html` extensions removed from user-facing URLs (GitHub Pages handles this natively).

## File Structure Changes

### Moved Files
```
blog.html (root)  →  blog/index.html
blog/post.html    →  [DELETED - replaced by generated files]
```

### New Files Created
```
blog/_post-template.html                    # Template for generating post HTML files
blog/were-officially-open.html              # Generated from template
.github/workflows/generate-blog-posts.yml   # Auto-generates HTML from markdown
```

### Updated Files
```
js/blog.js                  # Pathname-based routing (not query params)
js/components.js            # Path depth handling for blog/ subdirectory
components/header.html      # Clean URLs (no .html)
components/footer.html      # Clean URLs (no .html)
.github/workflows/update-blog-index.yml  # Added manual trigger
```

## How It Works Now

### Blog Listing (`/blog`)
1. User visits `/blog`
2. GitHub Pages serves `blog/index.html`
3. JavaScript fetches `../content/blog/index.json`
4. For each post, creates card with link to `{slug}`
5. Example: Link to `were-officially-open` (not `were-officially-open.html`)

### Single Post (`/blog/were-officially-open`)
1. User visits `/blog/were-officially-open`
2. GitHub Pages serves `blog/were-officially-open.html`
3. JavaScript extracts slug from pathname: `were-officially-open`
4. Fetches `../content/blog/2025-11-11-were-officially-open.md`
5. Parses frontmatter + converts Markdown to HTML
6. Renders post with styling

### Automatic HTML Generation (GitHub Action)
1. Kate/Heather creates markdown file via Pages CMS
2. File committed to `content/blog/2025-12-15-new-post.md`
3. GitHub Action triggers (detects .md file change)
4. Action extracts `slug: new-post` from frontmatter
5. Copies `blog/_post-template.html` → `blog/new-post.html`
6. Commits new HTML file
7. Post automatically available at `/blog/new-post`

## Path Resolution Logic

### components.js
```javascript
// Detects depth (e.g., /blog/post = 1 level deep)
const pathDepth = window.location.pathname.split('/').filter(segment => segment && !segment.endsWith('.html')).length;
const pathPrefix = pathDepth > 0 ? '../'.repeat(pathDepth) : '';

// From /blog/were-officially-open:
// pathDepth = 1
// pathPrefix = '../'
// Fetches: ../components/header.html ✓
```

### blog.js
```javascript
// Blog listing: Always in /blog/, so use ../ for content
const basePath = '../';

// Single post: Extract slug from pathname
const pathParts = window.location.pathname.split('/').filter(p => p);
const lastPart = pathParts[pathParts.length - 1];
const slug = lastPart.replace('.html', '');  // Handles both /slug and /slug.html
```

## Clean URLs Implementation

### How GitHub Pages Handles Clean URLs

GitHub Pages natively supports clean URLs:
- `/about` serves `about.html`
- `/blog` serves `blog.html` OR `blog/index.html`
- `/blog/post` serves `blog/post.html`

**No configuration needed!** Just use clean URLs in links and GitHub does the rest.

### All Links Updated

**Header Navigation:**
```html
<!-- Before -->
<a href="about-us.html">About us</a>
<a href="blog.html">Blog</a>

<!-- After -->
<a href="/about-us">About us</a>
<a href="/blog">Blog</a>
```

**Footer Navigation:**
```html
<!-- Before -->
<a href="privacy.html">Privacy</a>

<!-- After -->
<a href="/privacy">Privacy</a>
```

**Blog Post Links:**
```html
<!-- Before -->
<a href="blog/post.html?slug=were-officially-open">

<!-- After -->
<a href="were-officially-open">
```

**Back to Blog:**
```html
<!-- Before -->
<a href="../blog.html">← Back to Blog</a>

<!-- After -->
<a href="/blog">← Back to Blog</a>
```

## Testing Checklist

Before deploying, verify:

### Blog Listing Page
- [ ] Visit `/blog` - Page loads
- [ ] Blog posts display correctly
- [ ] Images load
- [ ] Post links are clean (no `.html` or query params)
- [ ] Header and footer load correctly

### Single Blog Post
- [ ] Visit `/blog/were-officially-open` - Page loads
- [ ] Post content renders with proper formatting
- [ ] Featured image displays
- [ ] Gallery images display
- [ ] Author byline links to bio page
- [ ] "Back to Blog" links work
- [ ] Header and footer load correctly

### Site Navigation
- [ ] Click "Blog" in header nav - goes to `/blog`
- [ ] All header links use clean URLs
- [ ] All footer links use clean URLs
- [ ] No broken links

### GitHub Actions
- [ ] Create test markdown file in `content/blog/`
- [ ] Verify HTML file auto-generated in `blog/`
- [ ] Verify index.json auto-updated
- [ ] Check Actions tab for successful runs

## For Kate & Heather (After Deployment)

### Creating a Blog Post (No Change!)

The workflow remains the same:
1. Login to Pages CMS
2. Click "New Blog Post"
3. Fill out form
4. Save

**What's different (behind the scenes):**
- CMS commits markdown to `content/blog/`
- GitHub Action auto-generates `blog/{slug}.html`
- Post appears at clean URL: `/blog/{slug}`

**They don't need to do anything differently!**

## Migration Notes

### Backwards Compatibility

**Old URLs will break:**
- `/blog/post.html?slug=were-officially-open` → 404 or redirects to /blog

**Solution:** Add redirects (optional)
- Could add redirect logic in blog.js to detect old query param format
- Or document that old URLs are deprecated

### Static HTML File Still Exists

The old static blog post still exists:
```
blog/were-officially-open.html (OLD - can delete after verification)
```

This was the hand-coded version from before. After testing, you can delete it since it's replaced by the generated version.

## Benefits Achieved

✅ Clean URLs - `/blog/post-title` instead of `/blog/post.html?slug=post-title`
✅ No .html extensions anywhere on site
✅ SEO-friendly - each post is a real HTML file
✅ GitHub Pages native support - no hacks or workarounds
✅ Fully automated - GitHub Actions handle everything
✅ Kate/Heather workflow unchanged - still just use CMS
✅ Better user experience - prettier URLs, better shareability

## Potential Issues & Solutions

### Issue: Old blog/were-officially-open.html static file confusion
**Solution:** Delete after confirming generated version works

### Issue: GitHub Action doesn't have write permissions
**Solution:** Check Actions permissions in repo settings → Actions → Workflow permissions → Read and write

### Issue: Links still show .html in browser
**Solution:** Hard refresh (Cmd+Shift+R / Ctrl+Shift+F5) to clear cache

### Issue: 404 when visiting /blog/post
**Solution:**
- Verify `blog/post.html` exists
- Check slug in markdown frontmatter matches filename
- Confirm GitHub Action ran successfully

### Issue: Components not loading on blog pages
**Solution:** Path depth logic in components.js should handle it. Check browser console for errors.

## Next Steps

1. **Test locally** - Open blog/index.html and blog/were-officially-open.html in browser
2. **Commit changes** - `git add .` → `git commit` → `git push`
3. **Deploy to gh-pages** - Changes automatically deploy
4. **Verify live site** - Test `/blog` and `/blog/were-officially-open`
5. **Delete old file** - Remove old static blog post after verification
6. **Create test post** - Use Pages CMS to create new post, verify HTML generated
7. **Document for team** - Share with Kate & Heather (though workflow unchanged for them)

## Files Summary

**Created:**
- `blog/index.html` (moved from root)
- `blog/_post-template.html`
- `blog/were-officially-open.html` (generated)
- `.github/workflows/generate-blog-posts.yml`
- `CLEAN-URLS-IMPLEMENTATION.md` (this file)

**Modified:**
- `js/blog.js`
- `js/components.js`
- `components/header.html`
- `components/footer.html`
- `.github/workflows/update-blog-index.yml`

**Deleted:**
- `blog.html` (root) - moved to blog/index.html
- `blog/post.html` - replaced by generated files

**To Delete (after testing):**
- Old static blog post (if any confusion with generated version)

---

**Implementation Date:** 2025-01-XX
**Status:** Ready for testing and deployment
