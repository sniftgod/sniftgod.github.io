# sniftgod.github.io

A simple static website ready to run locally and deploy on GitHub Pages.

## Run locally

No build step is required — just open `index.html` in your browser:

```bash
# Option 1: open directly
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux

# Option 2: serve with Python (recommended for accurate paths)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Add website"
   git push origin main
   ```
2. Go to the repository on GitHub → **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
4. Branch: `main`, Folder: `/ (root)`.
5. Click **Save**.

Your site will be live at: https://sniftgod.github.io/

## Project structure

```
sniftgod.github.io/
├── index.html        # Main page
├── css/style.css     # Styles
├── js/script.js      # Small interactivity
└── README.md         # This file
```

## Customize

Edit `index.html` to change the content, `css/style.css` for the look, and `js/script.js` for behavior. Push changes to `main` and GitHub Pages will redeploy automatically.
