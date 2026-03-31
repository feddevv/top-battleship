# webpack-template

A minimal Webpack 5 starter template with CSS support, HTML templating, and separate development/production configurations.

## Features

- **Webpack 5** bundler with ES module config files
- **CSS** — `css-loader` + `style-loader` pipeline for importing CSS into JS
- **HTML** — `html-webpack-plugin` generates the output HTML from a template
- **Dev server** — live-reloading development server via `webpack-dev-server`
- **Split config** — shared base config merged with environment-specific overrides via `webpack-merge`
- **Clean output** — `dist/` is cleaned automatically on every build

## Project Structure

```
webpack-template/
├── src/
│   ├── index.js        # Entry point
│   ├── main.css        # Global styles
│   └── template.html   # HTML template
├── webpack.common.js   # Shared webpack config
├── webpack.dev.js      # Development config
├── webpack.prod.js     # Production config
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)

### Installation

```bash
git clone https://github.com/feddevv/webpack-template.git
cd webpack-template
npm install
```

## Usage

### Development

Starts a dev server with hot reloading and source maps. The browser opens automatically.

```bash
npm run dev
```

- Mode: `development`
- Source maps: `eval-source-map`
- Watches `src/template.html` for changes

### Production Build

Bundles and minifies the app into the `dist/` directory.

```bash
npm run build
```

- Mode: `production`
- Output: `dist/main.js` + `dist/index.html`
- `dist/` is cleaned before each build

## Configuration

| File                | Purpose                                                |
| ------------------- | ------------------------------------------------------ |
| `webpack.common.js` | Entry point, output path, CSS loader rule, HTML plugin |
| `webpack.dev.js`    | Merges common + dev server, source maps                |
| `webpack.prod.js`   | Merges common + production mode                        |

## Dependencies

All dependencies are `devDependencies` — there are no runtime dependencies.

| Package               | Purpose                               |
| --------------------- | ------------------------------------- |
| `webpack`             | Core bundler                          |
| `webpack-cli`         | CLI for running webpack               |
| `webpack-dev-server`  | Development server                    |
| `webpack-merge`       | Merges config objects                 |
| `html-webpack-plugin` | Generates HTML output from a template |
| `css-loader`          | Resolves `@import` and `url()` in CSS |
| `style-loader`        | Injects CSS into the DOM at runtime   |

## License

ISC
