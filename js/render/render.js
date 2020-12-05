//main data render function
const renderData = (data = [], cards) => {
    if (data.length) {
      cards.innerHTML = data
        .map(({ Poster, Title, Year }) => {
          return `<div class="movie__cards-item">
          <div class="movie__img-wrapper">
              <img src="${Poster === "N/A" ? "./assets/images/default.jpg" : Poster}" alt="poster" class="movie__poster">
          </div>
          <div class="movie__info-wrapper">
              <h3 class="movie__title">Title: ${Title}</h3>
              <p class="movie__info">Release: ${Year}</p>
              <button class="movie__add-btn">Add to favorites <i class="fas fa-plus"></i></button>
              <a href="" class="movie__details flex-row-centered">See Details <i class="fas fa-eye movie__details-icon"></i></a>
          </div>
      </div>`;
        })
        .join("");
    }
  }

  //detail data render function
  const renderDetailsData = (data = [], container) => {
    if (data.length) {
      container.innerHTML = data
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
  }
  
  //favorite card render
  const renderFavCard = (data = [], container) => {
    if (data.length) {
      container.innerHTML = data
        .map(({ Poster, Title, Year, Actors, Plot, Genre }) => {
          return ` <div class="favorites__card">
                    <div class="movie__details-img">
                        <img src="${Poster}" alt="poster" class="movie__poster">
                    </div>
                    <div class="movie__details-info">
                      <h3 class="movie__details-title">Title: ${Title}</h3>
                      <p class="movie__info">Release: ${Year}</p>
                      <p class="movie__info">Genre: ${Genre}</p>
                      <p class="movie__info">Actors: ${Actors}</p>
                      <p class="movie__info">Description: ${Plot}</p>
                      <button class="favorites__rem-btn">Remove from favorites <i class="fas fa-trash-alt"></i></button>
                    </div> 
                  </div>`;
        })
        .join("");
    }
  }

  export  {renderData, renderDetailsData, renderFavCard};