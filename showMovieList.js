function showMovieList(movieSection, lists, title, baseURL) {
  console.log("lists => ", lists);

  // release title
  const h1 = document.createElement("h1");
  h1.classList.add("movie-title");
  h1.textContent = `${title}`;
  movieSection.appendChild(h1);

  // movie list div
  const movieList = document.createElement("div");
  movieList.classList.add("movie-list");

  h1.after(movieList);

  // loop the movies, series, and episode
  lists?.slice(0, 10).forEach(list => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("list-item");
    const imageBaseURL = baseURL + list.poster_path;

    const fallbackImg = `https://i5.walmartimages.com/seo/The-Batman-Movie-Poster-Glossy-Quality-Print-Photo-Wall-Art-Robert-Pattinson-Zo-Kravitz-Riddler-Size-Size-11x17-Inches_fdbcf150-178f-4f5d-9bba-63de1e9f51df.de478aa3eeb5a9772dc98cab5c907948.jpeg`;
    const image = list.poster_path === null ? fallbackImg : imageBaseURL;
    movieItem.innerHTML = `             
        <img src="${image}" alt="${list.title} poster" />
        <h2>${list.title}</h2>
        <p class="rating">
          <span>${list.release_date}</span>
          <span>⭐ ${list.vote_average.toFixed(2)}</span>
        </p>      
    `;
    movieList.appendChild(movieItem);
  });
}

export default showMovieList;
