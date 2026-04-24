# Developer Portfolio

A clean, modern, and professional developer portfolio website built with HTML, CSS, and minimal JavaScript.

## Features
- Fully responsive (mobile + desktop)
- Clean and minimal soft-dark design
- Fast loading (No heavy frameworks)
- Scroll reveal animations
- Easy to edit code structure

## Folder Structure
```
c:\Users\adity\Desktop\PORTFOLIO\
│
├── index.html        # Main HTML file containing all sections
├── css/
│   └── style.css     # Styling, theme variables, and responsive queries
├── js/
│   └── script.js     # Scroll animations, sticky nav, and mobile menu logic
└── README.md
```

## How to Customize
1. Open `index.html` and update the personal details (Name, Titles, Emails, GitHub links).
2. For the resume download, place your PDF inside the project and update the `href="#"` in the "Download Resume" button in the Hero Section.
3. Replace the placeholder hrefs (`#`) in the projects section with actual links.
4. Colors can be easily tweaked by changing the CSS variables inside `:root` at the top of `css/style.css`.

## How to Deploy on GitHub Pages

1. **Initialize a Git Repository (if you haven't already):**
   Open your terminal/command prompt in the `PORTFOLIO` directory and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio website"
   ```

2. **Create a GitHub Repository:**
   - Go to GitHub and create a new repository.
   - You can name it `portfolio` or `username.github.io` (where `username` is your GitHub username).
   - If you use `username.github.io`, it will be published exactly at that URL.

3. **Push the Code to GitHub:**
   - Copy the repository URL from GitHub.
   - Run the following in your terminal:
   ```bash
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - On your repository page on GitHub, click on **Settings**.
   - On the left sidebar, click on **Pages**.
   - Under "Build and deployment", set the **Source** to "Deploy from a branch".
   - Under "Branch", select `main` (or `master`) and save.
   - GitHub will now build and deploy your site. Wait a minute or two, and a link to your live portfolio will appear at the top of the Pages settings page!
