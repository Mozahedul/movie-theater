import showNowPlayingList from "./nowPlayingList.js";
import showMovieList from "./showMovieList.js";
import showPopularList from "./showPopularList.js";
import showReleaseList from "./showReleaseList.js";
import showSeriesList from "./showSeriesList.js";

const TMDB_API_KEY = "f5159f9014bc176d9c47046444d01d2d";
const imageBaseURL = `https://image.tmdb.org/t/p/w500`;

const inputMovie = document.querySelector("#input-movie");
const searchButton = document.querySelector("#searchBtn");

// Latest release
async function getLatestRelease() {
  const recentYear = new Date().getFullYear();
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?primary_release_year=${recentYear}&sort_by=popularity.desc&api_key=${TMDB_API_KEY}`,
  );
  const lists = await response.json();

  showReleaseList(lists.results, "Latest Release", imageBaseURL);
}

/**
 * Show movies list with TMDB API
 */
async function getMoviesList() {
  const input = document.querySelector("#input-movie");
  const query = input.value;
  const year = "";
  const page = 1;

  const movieSection = document.querySelector("#series-section");
  movieSection.innerHTML = "";

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&year=${year}&page=${page}&api_key=${TMDB_API_KEY}`,
  );
  const lists = await response.json();

  showMovieList(movieSection, lists.results, "Favorite Movies", imageBaseURL);
}

/**
 * Show series list with TMDB API
 */
async function getSeriesList() {
  const input = document.querySelector("#input-movie");
  const query = input.value;
  const year = "";
  const page = 1;

  const seriesSection = document.querySelector("#series-section");

  // Remove if old data exsit,
  seriesSection.innerHTML = "";

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?query=${query}&first_air_date_year=${year}&sort_by=popularity.desc&page=${page}&api_key=${TMDB_API_KEY}`,
  );
  const lists = await response.json();

  showSeriesList(seriesSection, lists.results, "Favorite Series", imageBaseURL);
}

// show movie list when click on search button
searchButton.addEventListener("click", () => {
  const latestRelease = document.querySelector("#latest-release");
  latestRelease.style.display = "none";
  getMoviesList();
  getSeriesList();
});

// Show movie list when press enter key
inputMovie.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    const latestRelease = document.querySelector("#latest-release");
    latestRelease.style.display = "none";
    getMoviesList();
    getSeriesList();
  }
});

// Show popular list
async function getPopularList() {
  const popularSection = document.querySelector("#popular-list");
  popularSection.innerHTML = "";
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&page=1`,
  );
  const lists = await response.json();
  showPopularList(
    popularSection,
    lists.results,
    "Popular Movies",
    imageBaseURL,
  );
}

// Now playing list
async function getNowPlaying() {
  const nowPlayingSection = document.querySelector("#now-playing-list");
  nowPlayingSection.innerHTML = "";
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&page=1`,
  );
  const lists = await response.json();
  showNowPlayingList(
    nowPlayingSection,
    lists.results,
    "Currently in theaters",
    imageBaseURL,
  );
}

getNowPlaying();
getPopularList();
getLatestRelease();
