import "regenerator-runtime/runtime";
import { renderData, renderDetailsData } from "./render/render.js";
import { fetchMoviesById, fetchMovies } from "./requests/requests.js";

const search = document.getElementById("searchInput");
const form = document.getElementById("searchForm");
const pagWrapper = document.getElementById("pagWrapper");
const type = document.querySelector(".movie__type-selector:checked");
const details = document.getElementById("details");
const cards = document.getElementById("cards");

//detail func
function getDetails(search) {
  const detailLink = document.getElementsByClassName("movie__details");
  for (let i = 0; i != detailLink.length; i++) {
    detailLink[i].addEventListener("click", async (event) => {
      event.preventDefault();
      const detailsData = [];
      detailsData.push(await fetchMoviesById(search[i].imdbID));
      renderDetailsData(detailsData, details);
      window.scrollTo({
        top: 5000,
        behavior: "smooth"
      });
    });
  }
}

//add favourites
const favId = JSON.parse(localStorage.movieId || "[]");

function addFavourites(search) {
  const fav = document.getElementsByClassName("movie__add-btn");

  for (let i = 0; i != fav.length; i++) {
    fav[i].addEventListener("click", (event) => {
      event.preventDefault();
      if (favId.includes(search[i].imdbID)) {
        alert("you already added this movie to your favourites");
      } else {
        favId.push(search[i].imdbID);
        localStorage.setItem("movieId", JSON.stringify(favId));
      }
    });
  }
}

//pagination func
function getPagination(totalRes) {
  const prevPagination = document.querySelector(".uk-pagination"); //removing previous pagination
  prevPagination.remove();

  const pagination = document.createElement("ul"); //creating new pagination as list
  pagination.classList = "movie__pagination uk-pagination";
  pagination.id = "pagination";
  pagWrapper.appendChild(pagination);

  const newPagination = document.querySelector(".uk-pagination"); //cathing new pagination

  UIkit.pagination(newPagination, {
    //uikit component pagination
    items: totalRes,
    itemsOnPage: 10,
    displayedPages: 4,
  });

  const pages = pagination.childNodes; //select all li

  $(".uk-pagination").on("click", function () {
    //adding listeners to all pages  with getting their innertext as value
    for (let i = 0; i != pages.length; i++) {
      pages[i].addEventListener("click", async () => {
        const { Search } = await fetchMovies(
          search.value,
          type.value,
          pages[i].innerText
        );
        renderData(Search, cards);
        getDetails(Search);
      });
    }
  });
  pages[0].click();
}

form.addEventListener("submit", async (event) => {
  //creating request on submit with data render
  event.preventDefault();
  const type = document.querySelector(".movie__type-selector:checked");
  const { Search, Error, totalResults } = await fetchMovies(
    search.value,
    type.value
  );
  if (Search) {
    renderData(Search, cards);
    getDetails(Search);
    addFavourites(Search);
    getPagination(totalResults);
  }
  if (!Search && Error === "Movie not found!") {
    alert("Movie not found!");
  }
});
