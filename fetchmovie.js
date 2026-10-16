
const movies = document.getElementById("movie");

async function fetchmovies() {
    try {
        const response = await fetch(
            "https://api.tvmaze.com/shows"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch shows");
        }

        const data = await response.json();

        movies.innerHTML = "";

        data.slice(0, 20).forEach(element => {
            movies.innerHTML += `
                <div class="movies">
                    <img
                        src="${element.image?.medium || ""}"
                        alt="${element.name}"
                    >

                    <h1>${element.name}</h1>

                    <p>${element.premiered || "Unknown date"}</p>

                    <p>${element.summary || "No summary available"}</p>
                </div>
            `;
        });

    } catch (error) {
        console.log(error.message);
    }
}

fetchmovies();
