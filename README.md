# METALART Website

## 🌍 Localization

```text
metallart.com/                     Storyblok language
├── /               English        en
├── de/             German         default
│── ch/             Swiss German   ch
└── chfr/           Swiss French   chfr
└── global/en/      Global pages
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Storyblok

```bash
storyblok login
storyblok pull-components --space 273160
storyblok-generate-ts source=./components.273160.json target=./src/types/storyblok-component-types.d.ts

#
storyblok pull-components --space 273160 && storyblok-generate-ts source=./components.273160.json target=./src/types/storyblok-component-types.d.ts
```
