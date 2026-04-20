function showReleaseList(lists, title, baseURL) {
  console.log("lists => ", lists);

  const latestRelease = document.querySelector("#latest-release");
  // release title
  const h1 = document.createElement("h1");
  h1.classList.add("release-title");
  h1.textContent = title;
  latestRelease.appendChild(h1);

  const releaseElmDiv = document.createElement("div");
  releaseElmDiv.classList.add("release-list");

  h1.after(releaseElmDiv);

  // loop the movies, series, and episode
  lists?.slice(0, 10).forEach(list => {
    const releaseItem = document.createElement("div");
    releaseItem.classList.add("list-item");
    const imageBaseURL = baseURL + list.poster_path;
    releaseItem.innerHTML = `             
        <img src="${imageBaseURL}" alt="${list.title} poster" />
        <h2>${list.title}</h2>
        <p class="rating">      
          <span>${list.release_date}</span>
          <span>⭐ ${list.vote_average.toFixed(2)}</span>
        </p>
    `;
    releaseElmDiv.appendChild(releaseItem);
  });
}

export default showReleaseList;
