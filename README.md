# Shahidur Rahoman Sohag — Research Website V2

A polished, responsive academic website designed for GitHub Pages.

## Deploy on GitHub Pages
1. Create a repository.
2. Upload the contents of this folder to the repository root.
3. GitHub → Settings → Pages.
4. Source: **Deploy from a branch** → `main` → `/ (root)`.
5. Save and open the generated Pages URL.

## Add a new paper
1. Put its PDF in `papers/`.
2. Open `publications.json`.
3. Add an object like:

{
  "year": 2026,
  "title": "Paper title",
  "authors": "Author 1, Author 2",
  "venue": "Journal / Conference",
  "pdf": "papers/paper-file.pdf",
  "doi": "https://doi.org/...",
  "status": "Under Review"
}

Only `year`, `title`, `authors`, and `venue` are essential. `pdf`, `doi`, `url`, `status`, and `note` are optional.

The publication page supports year filtering and live title/author/venue search.

## Optional future upgrades
- Google Scholar / ORCID / GitHub profile buttons
- Automatic publication data from ORCID
- Citation counts
- Individual paper pages
- Research project pages
- Dark/light theme toggle
- Downloadable CV button
