# ivalicealliance.net

## Abstract
An open source website for [Ivalice Alliance](https://www.ivalicealliance.net) built using [Bootstrap](https://getbootstrap.com/), [Sass](https://sass-lang.com/), and [Astro 6.3](https://astro.build/).

## Codebase Structure
*   `src/pages/` — All website pages (e.g. `index.astro`, `signup.astro`, `members.astro`, `rpgclub.astro`, `agreement.astro`). 
*   `src/components/` — Reusable website UI elements (e.g. `Navigation.astro`, `ClubCard.astro`, `StatSelectionTime.astro`).
*   `src/layouts/` — Global page wrap layout (`Layout.astro`).
*   `src/styles/` — Core stylesheet (`main.scss`).
*   `src/data/` — Site config and datasets (`navigation.yml`, `stats.yml`, `rpgclub.yml`, `themes.yml`).
*   `public/` — Static assets and global theme scripts (served directly in the build root).

## Editing
Edit the pages inside `src/pages/` or the data configurations inside `src/data/`. When your changes land on `main`, Netlify will automatically build and deploy a new version of the site.

## Building Locally

### Requirements
- **Node.js** (v18.14.1 or higher)
- **Python 3** (only required if generating game stats)

### Installation
Run this command once in your project folder to install dependencies:

```bash
npm install
```

For Python statistics dependencies, run:

```bash
pip install -r requirements.txt
```

### Developing & Running
To spin up a local development server with hot-reloading (updates your browser instantly on save), run:

```bash
npm run dev
```
The terminal will provide a local server address, typically [http://localhost:4321](http://localhost:4321).

### Stats Generation
To update the club card stats dynamically, run the stats generator:

```bash
python3 tools/_rpgclub_stats.py
```

### Building & Previewing Production
To compile a production-ready static build of the site into the `dist/` directory, run:

```bash
npm run build
```

To preview the statically compiled production build locally, run:

```bash
npm run preview
```

## Contributing
1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
