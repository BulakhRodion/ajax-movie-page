import "regenerator-runtime/runtime";
import { renderFavCard } from "./render/render.js";
import { fetchMoviesById } from "./requests/requests.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const favId = JSON.parse(localStorage.movieId || "[]");

  async function getFavDetails(search) {
    const favorites = [];
    for (let i = 0; i != search.length; i++) {
      favorites.push(await fetchMoviesById(search[i]));
      renderFavCard(favorites, container);
    }
    const btn = document.querySelectorAll(".favorites__rem-btn");
    const card = document.querySelectorAll(".favorites__card");
    for (let i = 0; i != btn.length; i++) {
      btn[i].id = favId[i];
      btn[i].addEventListener("click", () => {
        favId.includes(btn[i].id)
          ? favId.splice(btn[i].id, 1)
          : alert("alredy removed");
        localStorage.setItem("movieId", JSON.stringify(favId));
        card[i].style.opacity = 0;
        setTimeout( function () {card[i].remove()}, 400);
      });
    }
  }
  getFavDetails(favId);
});
