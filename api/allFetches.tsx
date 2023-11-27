import axios from "axios";

// Homepage Requests
export async function getNowPlaying() {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getPopular(type: string) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/popular?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getTrending(type: string) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/week?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getTopRated(type: string) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/top_rated?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUpcoming() {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// Fetch by URl
export async function getByURL(
  type: string = "movie",
  categoryParam: string | null = "now-playing"
) {
  let url: string;
  // const categoryParam: string = category?.split("-").join("_");
  if (categoryParam === "trending") {
    url = `https://api.themoviedb.org/3/${categoryParam}/${type}/week?api_key=6f687067231f0a6ceb9c0cae600a334c`;
  } else {
    url = `https://api.themoviedb.org/3/${type}/${categoryParam}?api_key=6f687067231f0a6ceb9c0cae600a334c`;
  }

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// Fetch Popular people
export async function getPopularPeople() {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// Get single movie details
export async function getMovieOrTvDetails(type: string, movieID: string) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/${movieID}?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// Get movie credit details
export async function getMovieOrTvCredits(type: string, movieID: string) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/${movieID}/credits?api_key=6f687067231f0a6ceb9c0cae600a334c`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// Get trailer video
export async function getTrailerVideo(title: string) {
  try {
    const res = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?q=${title}+trailer&key=AIzaSyDJ7tq6AzfN5SOm2ZL9Clov3kmdGzq35y4`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// Get recommendations
export async function getSimilarRecommendations(type: string, id: number) {
  const url: string = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=6f687067231f0a6ceb9c0cae600a334c`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
