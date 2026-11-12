# TaskFlow

Projet fil rouge du module React + Next.js (M2, ESIEE-IT).
Appli de gestion de projets et de taches en React + TypeScript (Vite), avec une API json-server.

Auteur : Patrice CHEN (projet fait seul)

## En ligne

- site (Vercel) : https://projet-react-typescrypt.vercel.app
- api (Render) : https://taskflow-api-x4m4.onrender.com/projects

L'api est sur l'offre gratuite de Render : elle s'endort apres 15 min sans visite, le 1er chargement peut prendre ~30-50 s.
Les modifs faites en ligne sont perdues quand l'api redemarre.

Sur Vercel la variable `VITE_API_URL` pointe vers l'api Render (en local c'est http://localhost:3001).

## Lancer le projet

```bash
npm install
npm run dev
```

- site : http://localhost:5173
- api : http://localhost:3001

`npm run dev` lance l'api et le site en meme temps.

## Scripts

| Commande | Ce que ca fait |
|---|---|
| `npm run dev` | lance l'api + le site |
| `npm run web` | lance juste le site |
| `npm run api` | lance juste l'api (json-server sur db.json) |
| `npm run reset-db` | remet db.json comme au depart (copie de db.seed.json) |
| `npm run build` | verifie les types et build |
| `npm run lint` | oxlint |

## Versions

### TP1 - v0
- liste de taches typee : formulaire, statuts (todo / doing / done), filtres
- etat modifie sans mutation

### TP2 - v1 (hooks)
- `useLocalStorage` : sauvegarde dans le navigateur
- titre de l'onglet avec le nombre de taches restantes
- focus auto sur le champ (`useRef`)
- priorite des taches (P1 / P2 / P3)
- minuteur de concentration 25 min
- theme clair / sombre avec un Context

### TP3 - multi-pages + API
- React Router : `/`, `/projects/:id`, `/projects/new`, `/about`, page 404 (+ `/stats` au mini-projet)
- liste des projets chargee depuis l'api (chargement + erreur)
- page projet : ajouter / faire avancer / supprimer une tache (POST, PATCH, DELETE)
- formulaire nouveau projet avec validation puis redirection
- 404 si l'adresse ou le projet n'existe pas

### Mini-projet
Obligatoire :
- modifier un projet (nom, description) et le supprimer avec ses taches (`?_dependent=tasks`)
- echeance sur les taches (champ date), en rouge si en retard, tri par echeance
- page `/stats` : nombre de taches par statut et par projet, avec progression
- chargement et erreurs geres sur toutes les pages

Au choix :
- theme clair / sombre (fait au TP2)
- recherche de taches par titre avec un hook `useDebounce` (300 ms)

Une branche + une PR par fonctionnalite : `edit-project`, `due-date`, `stats`, `search`.

## Structure

```
src/
  api.ts          appels a l'api
  type.ts         types
  components/     composants (TaskForm, TaskList, Layout...)
  pages/          une page par route
  context/        ThemeContext
  hook/           useLocalStorage, useDebounce
db.json           donnees de l'api
db.seed.json      donnees de depart
```
