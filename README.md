# React + Nest + Tmdb API
Glad that you made it here :)

To start the project:

- download the project and open a terminal in directory ./FavMovies
  
- run "npm install"
  
After that, we have to set up our database.

The database is ready for postgres use.

edit these in your own liking at app.module.ts (favMovies-main/apps/api/src)

{

 port: 5432,
 
 username: 'postgres',
 
 password: 'betmonas',
 
 database: 'moviedb',
 
}

There will be two servers running, one for client another for api.

- go to /FavMovies/FavMovies-back and in the terminal enter "npm run dev"

- go to /FavMovies/FavMovies-front and also in the terminal run "npm run dev"

If everything goes well - the working and good looking site should be found on http://localhost:5173/

Thank you, for your review.
