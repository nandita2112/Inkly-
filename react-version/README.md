# Inkly (React)

React version of the Inkly HTML/CSS project.

## Run it

    npm install
    npm run dev       # development server at http://localhost:5173
    npm run build     # production build in dist/

## Project structure

    src/
      App.jsx              routes (lazy-loaded pages, protected routes)
      main.jsx             mounts the app and wraps it in providers
      index.css            global styles, theme variables
      components/          reusable UI pieces
      pages/               one component per route
      context/             Theme, Auth and Follow providers
      hooks/               useLocalStorage, useForm
      data/content.js      articles, categories, writers (edit content here)
      utils/validators.js  form validation rules

## Demo notes

Login, newsletter and contact forms run in the browser only. No backend is connected.
