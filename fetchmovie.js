const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", fetchMovie);
const searchinput = document.getElementById("searchInput");
const movies = document.getElementById("movie");

async function fetchMovie() {
    try {
        const query = searchinput.value.trim();

        if (query === "") {
            movies.innerHTML = "<p>Please enter a show name.</p>";
            return;
        }

        const response = await fetch(
            `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch shows");
        }

        const data = await response.json();

        movies.innerHTML = "";

        if (data.length === 0) {
            movies.innerHTML = "<p>No shows found.</p>";
            return;
        }

        data.forEach(item => {
            const show = item.show;

            movies.innerHTML += `
                <div class="movie">
                    <img
                        src="${show.image?.medium || ""}"
                        alt="${show.name}"
                    >

                    <h2>${show.name}</h2>

                    <p>${show.premiered || "Unknown date"}</p>

                    <p>${show.summary || "No summary available"}</p>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
        movies.innerHTML = "<p>Something went wrong. Please try again.</p>";
    }
}
