# Pages CMS Setup Guide

This guide will help you set up Pages CMS so Kate and Heather can create blog posts without your involvement.

## What is Pages CMS?

Pages CMS is a free, open-source content management system that works with GitHub. It provides a user-friendly interface for editing content stored in your GitHub repository.

**Key Benefits:**
- ✅ 100% Free - no costs, no limits
- ✅ Easy to use - friendly editor for non-technical users
- ✅ GitHub-based - all content stays in your repo
- ✅ Works from anywhere - web-based, mobile-friendly

## Step 1: Create a GitHub App

Pages CMS uses a GitHub App for authentication. You need to create this once.

1. **Go to GitHub Settings:**
   - Visit: https://github.com/settings/apps/new
   - OR navigate to: Your Profile → Settings → Developer Settings → GitHub Apps → New GitHub App

2. **Fill in the App Details:**
   - **GitHub App name:** `Moving Mountains CMS` (must be unique)
   - **Homepage URL:** `https://mmcounselingwellness.com`
   - **Callback URL:** `https://pagescms.org/auth/callback`
   - **Webhook:** Uncheck "Active" (not needed)
   - **Repository permissions:**
     - Contents: Read and write
     - Metadata: Read-only
   - **User permissions:** None needed
   - **Where can this GitHub App be installed?** Select "Only on this account"

3. **Create the App:**
   - Click "Create GitHub App"
   - You'll be redirected to your app's settings page

4. **Generate a Private Key:**
   - Scroll down to "Private keys"
   - Click "Generate a private key"
   - Save the downloaded `.pem` file securely (you'll need it later)

5. **Note Your App Details:**
   You'll need these values:
   - **App ID** (shown at top of page)
   - **Client ID** (shown in "About" section)
   - **Client Secret** (click "Generate a new client secret")

6. **Install the App to Your Repository:**
   - In the left sidebar, click "Install App"
   - Click "Install" next to your account name
   - Select "Only select repositories"
   - Choose `moving-mountains-website` repository
   - Click "Install"

## Step 2: Connect to Pages CMS

You have two options for using Pages CMS:

### Option A: Use the Online Version (Easiest)

1. **Visit Pages CMS:**
   - Go to: https://pagescms.org
   - Click "Login with GitHub"

2. **Connect Your Repository:**
   - Enter your GitHub App credentials (from Step 1)
   - Select the `moving-mountains-website` repository
   - Pages CMS will detect the `.pages/config.yml` file

3. **Start Managing Content:**
   - You should now see the "Blog Posts" collection
   - You can create, edit, and delete blog posts

### Option B: Deploy Your Own (More Control)

1. **Deploy to Vercel (Free):**
   - Visit: https://github.com/pages-cms/pages-cms
   - Click "Deploy to Vercel" button
   - Follow the deployment wizard
   - Configure environment variables with your GitHub App credentials

2. **Access Your CMS:**
   - Visit your deployed URL (e.g., `your-cms.vercel.app`)
   - Connect your repository
   - Start managing content

## Step 3: Add Kate and Heather as Users

1. **Add as GitHub Collaborators:**
   - Go to: https://github.com/YOUR-USERNAME/moving-mountains-website/settings/access
   - Click "Add people"
   - Invite Kate and Heather by their GitHub usernames or email
   - They'll need to accept the invitation and create GitHub accounts if they don't have them

2. **Grant Repository Access:**
   - Give them "Write" access (not "Admin")
   - This allows them to create and edit blog posts

3. **Share Pages CMS URL:**
   - Send them the Pages CMS URL (either pagescms.org or your Vercel URL)
   - They login with their GitHub accounts
   - They can immediately start creating blog posts

## Step 4: Creating a Blog Post (for Kate & Heather)

### Using Pages CMS Interface:

1. **Login to Pages CMS:**
   - Go to the Pages CMS URL
   - Click "Login with GitHub"
   - Authorize the app

2. **Create a New Post:**
   - Click "Blog Posts" collection
   - Click "New Blog Post" button

3. **Fill in the Form:**
   - **Title:** Your post title
   - **Publication Date:** Pick the date
   - **Author:** Select your name from dropdown
   - **Author Bio Link:** Select your bio page
   - **Featured Image:** Click to upload an image
   - **Image Alt Text:** Describe the image
   - **Excerpt:** Write a brief summary
   - **URL Slug:** Auto-generated, but you can edit (e.g., "summer-wellness-tips")
   - **Body:** Write your post using Markdown formatting

4. **Markdown Formatting Tips:**
   ```markdown
   # Heading
   ## Subheading

   **Bold text**
   *Italic text*

   [Link text](https://url.com)

   - Bullet point
   - Another bullet
   ```

5. **Add Gallery Images (Optional):**
   - Click "Add Gallery Images"
   - Upload images and add alt text
   - These appear at the end of your post

6. **Save & Publish:**
   - Click "Save" to create a draft
   - The post will be committed to GitHub
   - It will automatically appear on the blog within minutes

## Step 5: Update the Blog Index

**IMPORTANT:** After creating a new blog post, you need to add it to the index file:

1. **Open the Index File:**
   - In Pages CMS, navigate to the file browser
   - Open `content/blog/index.json`

2. **Add Your Post:**
   ```json
   {
     "posts": [
       "2025-11-11-were-officially-open.md",
       "2025-12-15-your-new-post.md"  ← Add this line
     ]
   }
   ```

3. **Save the File:**
   - The blog listing page will automatically update

**TODO:** We can automate this step with a GitHub Action in the future.

## Troubleshooting

### "Repository not found" Error
- Make sure the GitHub App is installed on the repository
- Check that you have write access to the repo

### Images Not Uploading
- Verify the media folder is set to `src` in config
- Check file size (GitHub has a 100MB limit per file)

### Post Not Appearing on Blog
- Verify the post is added to `content/blog/index.json`
- Check the browser console for JavaScript errors
- Clear your browser cache

### Cannot Login to Pages CMS
- Verify your GitHub App credentials are correct
- Check that the callback URL is set to `https://pagescms.org/auth/callback`
- Try logging out of GitHub and logging back in

## Need Help?

- Pages CMS Documentation: https://pagescms.org/docs
- GitHub App Documentation: https://docs.github.com/en/apps
- Contact Kyle for technical assistance

## Future Enhancements

Once you're comfortable with blog posts, we can add:
- Navigation management (update main menu without code)
- Page creation (create new pages like FAQ, Resources, etc.)
- Settings management (update contact info, social links, etc.)
- Automated index updates (GitHub Action to auto-update index.json)
- RSS feed generation
- Blog categories and tags
