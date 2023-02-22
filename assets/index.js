let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//function to fetch data from api

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Por favor coloque o nome do filme. </h3>`;
    } else {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.Response == "True") {
                    let plot = data.Plot;

                    // Make a request to Google Translate API to translate the plot to Portuguese
                    fetch(`https://translation.googleapis.com/language/translate/v2?key=${teste.json}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            q: plot,
                            source: 'en',
                            target: 'pt',
                            format: 'text'
                        })
                    })
                        .then((response) => response.json())
                        .then((translatedData) => {
                            // Update the result HTML with the translated plot
                            result.innerHTML = `
                                <div class="info">
                                    <img src=${data.Poster} class="poster">
                                    <div>
                                        <h2>${data.Title}</h2>
                                        <div class="rating">
                                            <img src="star-icon.svg">
                                            <h4>${data.imdbRating}</h4>
                                        </div>
                                        <div class="details">
                                            <span>${data.Rated}</span>
                                            <span>${data.Year}</span>
                                            <span>${data.Runtime}</span>
                                        </div>
                                        <div class="genre">
                                            <div>${data.Genre.split(",").join("</div><div>")}</div>
                                        </div>
                                    </div>
                                </div>
                                <h3>Sinopse:</h3>
                                <p>${translatedData.data.translations[0].translatedText}</p>
                                <h3>Elenco:</h3>
                                <p>${data.Actors}</p>
                            `;
                        })
                        .catch(() => {
                            result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
                        });
                } else {
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);