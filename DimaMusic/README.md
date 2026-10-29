# DimaMusic (Vue 3 + Vite)

Application type Spotify : rose et gris, musique marocaine, podcasts, favoris, lecteur complet.

## Lancer
```
npm install
npm run dev        # http://localhost:5173
npm run build      # version de production dans /dist
```
Nécessite Node.js 18+.

## Données
Utilise l'API iTunes Search (gratuite, sans clé, sans token) :
- chansons : extraits de 30 s
- podcasts : épisodes complets en streaming

Aucun token Spotify n'est nécessaire (ni stocké dans le projet).
