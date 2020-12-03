import "regenerator-runtime/runtime";

const BASE_URL = "http://www.omdbapi.com/?apikey=1320d6a&";
const search = document.getElementById("searchInput");
const form = document.getElementById("searchForm");
const cards = document.getElementById("cards");
const details = document.getElementById("details");
const pagWrapper = document.getElementById("pagWrapper");
const type = document.querySelector(".movie__type-selector:checked");

//fetch movies by title
async function fetchMovies(search, type, page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}&s=${search}&type=${type}&page=${page}`
    );
    const receivedData = await response.json();
    return receivedData;
  } catch (error) {
    console.log(error);
  }
}

//fetch movies by id
async function fetchMoviesById(movieId) {
  try {
    const response = await fetch(`${BASE_URL}&i=${movieId}`);
    const receivedData = await response.json();
    return receivedData;
  } catch (error) {
    console.log(error);
  }
}

//detail func
function getDetails(search) {
  const detailLink = document.getElementsByClassName("movie__details");
  for (let i = 0; i != detailLink.length; i++) {
    detailLink[i].addEventListener("click", async (event) => {
      event.preventDefault();
      const detailsData = [];
      detailsData.push(await fetchMoviesById(search[i].imdbID));
      renderDetailsData(detailsData);
    });
  }
}

//remove func
function remove() {
  const prevPagination = document.querySelector(".uk-pagination");
  return prevPagination.remove();
}

//pagination func
function getPagination(totalRes) {
  remove();

  const pagination = document.createElement("ul");
  pagination.classList = "movie__pagination uk-pagination"; 
  pagination.id = "pagination";
  pagWrapper.appendChild(pagination);

  const pagElem = document.querySelector(".uk-pagination");

  UIkit.pagination(pagElem, {
    items: totalRes,
    itemsOnPage: 10,
    displayedPages: 4,
  });

  const pages = pagination.childNodes;

  $(".uk-pagination").on("click", function () {
    for (let i = 0; i != pages.length; i++) {
      pages[i].addEventListener("click", async () => {
        const { Search } = await fetchMovies(
          search.value,
          type.value,
          pages[i].innerText
        );
        renderData(Search);
        getDetails(Search);
      });
    }
  });
  pages[1].click();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const type = document.querySelector(".movie__type-selector:checked");
  const { Search, Error, totalResults } = await fetchMovies(
    search.value,
    type.value
  );

  if (Search) {
    renderData(Search);

    //Details
    getDetails(Search);

    //Pagination
    getPagination(totalResults);
  }
  if (!Search && Error === "Movie not found!") {
    alert("Movie not found!");
  }
});

//main data render
const renderData = (data = []) => {
  if (data.length) {
    cards.innerHTML = data
      .map(({ Poster, Title, Year }) => {
        return `<div class="movie__cards-item">
        <div class="movie__img-wrapper">
            <img src="${Poster === "N/A"? "./assets/images/image-replacer.jpg": Poster}" alt="poster" class="movie__poster">
        </div>
        <div class="movie__info-wrapper">
            <h3 class="movie__title">Title: ${Title}</h3>
            <p class="movie__info">Release: ${Year}</p>
            <a href="" class="movie__details">See Details <i class="fas fa-eye movie__details-icon"></i></a>
        </div>
    </div>`;
      })
      .join("");
  }
};

//details render
const renderDetailsData = (data = []) => {
  if (data.length) {
    details.innerHTML = data
      .map(({ Poster, Title, Year, Actors, Plot, Genre }) => {
        return ` <div class="movie__details-img">
                    <img src="${Poster}" alt="poster" class="movie__poster">
                </div>
                <div class="movie__details-info">
                  <h3 class="movie__details-title">Title: ${Title}</h3>
                  <p class="movie__info">Release: ${Year}</p>
                  <p class="movie__info">Genre: ${Genre}</p>
                  <p class="movie__info">Actors: ${Actors}</p>
                  <p class="movie__info">Description: ${Plot}</p>
                </div> `;
      })
      .join("");
  }
};

//image test