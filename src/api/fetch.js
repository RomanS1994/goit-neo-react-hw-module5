import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDU3OTQxN2FmODZiM2VhZmVkMDg4Mjg1MzNkMjBlYiIsIm5iZiI6MTc1NjIzNjAyMy44MTEsInN1YiI6IjY4YWUwOGY3OGRkZDU2ZGMwYmZhOGU3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I0lyeYQJhus-evILey0i3Oq7GHBctCWnOufwxLi_vF0";

const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, options);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return null;
  }
};

export const getPopularMovies = async () => {
  const data = await fetchData("/trending/movie/day?language=en-US");
  return data ? data.results : [];
};

export const getMovieBySearch = async (query) => {
  const data = await fetchData(`/search/movie?query=${query}&language=en-US`);
  return data ? data.results : [];
};

export const getMovieById = async (movieId) => {
  return await fetchData(`/movie/${movieId}?language=en-US`);
};

export const getMovieCast = async (movieId) => {
  const data = await fetchData(`/movie/${movieId}/credits?language=en-US`);
  return data ? data.cast : [];
};

export const getMovieReviews = async (movieId) => {
  const data = await fetchData(`/movie/${movieId}/reviews?language=en-US`);
  return data ? data.results : [];
};
