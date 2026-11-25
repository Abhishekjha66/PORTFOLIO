# Abhishek Jha — Software Engineer Portfolio

Responsive, static portfolio website for GitHub Pages. Built with semantic HTML, CSS and vanilla JavaScript so it can be deployed directly without a Node.js build step.

## Features

- Responsive layouts for desktop, tablet and mobile
- Sections for profile, skills, experience, projects, achievements, certifications and contact
- Software Engineer resume PDF download
- Floating interactive Panda portfolio assistant with inline SVG, contextual messages, quick actions, hide/restore control, sleep state and poke easter egg
- Accessible navigation, focus states and reduced-motion support

## Run locally

No package installation or build command is required. Open `index.html` in a browser, or run a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Upload the contents of this folder to the root of your portfolio repository (keep `index.html` at the repository root).
2. Commit and push to the `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait for the Pages deployment workflow to finish.

## Project files

```text
.
├── index.html
├── style.css
├── script.js
├── Abhishek_Jha_Software_Engineer_Resume.pdf
├── images/
└── certs/
```

## Panda assistant

The original portfolio is a static HTML/CSS/JavaScript site, not a React/Tailwind application. To keep deployment build-free and avoid introducing an unnecessary React toolchain, the requested Panda assistant is implemented as a self-contained DOM component in `script.js`, styled in `style.css`, with its panda artwork drawn using inline SVG. It requires no external image, icon, animation, or component dependency.
\n\n### Contact links\nThe email links open the visitor's configured email application. The phone link uses `tel:` and is intended for mobile devices or computers configured with a calling application.\n