# Personal Portfolio

A responsive personal portfolio project for **IT ELEC 4 – Web Systems and Technologies 2**, personalized for **Mark Jervin Medina**. It uses plain HTML, CSS, and JavaScript—no build tools or frameworks are required.

## Run locally

1. Open this folder in Visual Studio Code.
2. Open `index.html` with the Live Server extension, or open the file directly in a modern browser.
3. An internet connection is only needed to load the Google Fonts; the site itself runs locally without a backend.
4. The portfolio includes the user’s resume PDF at `assets/documents/Resume - Mark Jervin Medina.pdf`.

## Personalize before publishing

Search the project for `Your Name`, `your.email@example.com`, and `your-` placeholders, then update:

- **`index.html`**: your name, bio, college, course, year, interests, career goals, real project descriptions/links, real achievements, email, and social profile URLs.
- **`style.css`**: the CSS variables at the top to adjust the color palette and typography.
- **`script.js`**: `contactEmail` to match the email shown in `index.html`.
- **`assets/documents/resume-template.html`**: replace the sample details with your real resume information. The home-page button downloads this editable HTML resume template; you can open it in a browser and use Print → Save as PDF, then change the button link to your PDF.

The portrait and project illustrations are CSS placeholders, not personal photos or claimed project screenshots. To use your own portrait, replace the marked placeholder in `index.html` with an `<img>` pointing to a file in `assets/images/`, and add suitable `alt` text. Replace each project illustration with your own image when available.

Achievements and education are prompts rather than invented credentials or personal history. Only add details that are true for you. The sample project cards are ideas; update their links to the real project demos or repositories.

## Contact form behavior

The form checks that all four fields are valid, then prepares a message in the visitor’s default email application using a `mailto:` link. It does not send mail directly or store submissions. For server-side delivery, connect a form service or a backend endpoint and update the submit handler in `script.js`.

## GitHub and Vercel

This is a static site and needs no build command:

1. Create a public GitHub repository named `personal-portfolio`.
2. Add and push the contents of this folder to the repository.
3. In Vercel, import the repository. Leave the framework preset as **Other**, the build command empty, and the output directory set to `.` (the project root).
4. Deploy. The site entry point is `index.html`.

## Project structure

```text
personal-portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── images/
    │   └── .gitkeep
    └── documents/
        └── resume-template.html
```
