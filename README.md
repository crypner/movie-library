
# VidFlix - Movie Library

This project is an example movie library based on [themoviedb.org API](https://developer.themoviedb.org/reference/intro/getting-started).

### Tech Used:
- NodeJs
- NestJs
- Axios
- Typescript
- React
- React-Redux
- React-hook-forms

## Installation

- Download or Clone this repository. 

- Open the terminal, make sure you are in the project directory. `cd ` into the backend directory and run `npm install`:
```bash
  cd backend
  npm install
```
- Once the installation is completed `cd` in to the frontend directory and once again run `npm install`:
```bash
  cd ../frontend
  npm install
```

- Once the project is installed, create a file called `.env` in the backend folder. 

- Find and open the file called `.env.example` and copy all its contents to your newly created `.env` file.

- Now you need to acquire an API key from TMDB. [Follow this link](https://www.themoviedb.org/settings/api), sign up and you should have your own API key. Copy the key and paste it in the `.env` file and make sure to save the file.

## Deployment

You should now be all set up to deploy the project. 

- At this point we need 2 terminals running; One for the backend and one for the front end.
- Open the first terminal, `cd  ` into the backend directory and run:
```bash
  npm run start:prod
```
> If an error pops up stating that the port is being used, you can update the port number from the `.env` file. If you change the port number you would also need to update the port number in `frontend > src > services > movieService.ts` file.

- Now open another terminal, `cd  ` into the frontend directory and run:
```bash
  npm start
```

> Once again if a question pops up stating the port is being used and If you would like to select another port, just select `yes` and it will select a random port for you. 

At this point a new browser window should have opened with the app running.
