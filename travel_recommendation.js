async function fetchData() {
  const response = await fetch("./travel_recommendation.json");
  return response.json();
}

async function searchFunction() {
  let query = document.getElementById("search").value.trim().toLowerCase();
  let data = await fetchData();
  let resultsHTML = "";

  if (query === "beach" || query === "beaches") {
    data.beaches.forEach((beach) => {
      resultsHTML += `
                <div class="result-item">
                    <h3>${beach.name}</h3>
                    <img src="${beach.imageUrl}" alt="${beach.name}" width="200">
                    <p>${beach.description}</p>
                    <button>View</button>
                </div>
            `;
    });
  } else if (query === "temple" || query === "temples") {
    data.temples.forEach((temple) => {
      resultsHTML += `
                <div class="result-item">
                    <h3>${temple.name}</h3>
                    <img src="${temple.imageUrl}" alt="${temple.name}" width="200">
                    <p>${temple.description}</p>
                    <button>View</button>
                </div>
            `;
    });
  } else if (query === "country" || query === "countries") {
    data.countries.forEach((country) => {
      resultsHTML += `<h3>${country.name}</h3>`;
      country.cities.forEach((city) => {
        resultsHTML += `
                    <div class="result-item">
                        <h4>${city.name}</h4>
                        <img src="${city.imageUrl}" alt="${city.name}" width="200">
                        <p>${city.description}</p>
                        <button>View</button>
                    </div>
                `;
      });
    });
  } else {
    // Search for specific names
    data.countries.forEach((country) => {
      if (country.name.toLowerCase().includes(query)) {
        resultsHTML += `<h3>${country.name}</h3>`;
      }
      country.cities.forEach((city) => {
        if (city.name.toLowerCase().includes(query)) {
          resultsHTML += `
                        <div class="result-item">
                            <h3>${city.name}</h3>
                            <img src="${city.imageUrl}" alt="${city.name}" width="200">
                            <p>${city.description}</p>
                            <button>View</button>
                        </div>
                    `;
        }
      });
    });

    data.temples.forEach((temple) => {
      if (temple.name.toLowerCase().includes(query)) {
        resultsHTML += `
                    <div class="result-item">
                        <h3>${temple.name}</h3>
                        <img src="${temple.imageUrl}" alt="${temple.name}" width="200">
                        <p>${temple.description}</p>
                        <button>View</button>
                    </div>
                `;
      }
    });

    data.beaches.forEach((beach) => {
      if (beach.name.toLowerCase().includes(query)) {
        resultsHTML += `
                    <div class="result-item">
                        <h3>${beach.name}</h3>
                        <img src="${beach.imageUrl}" alt="${beach.name}" width="200">
                        <p>${beach.description}</p>
                        <button>View</button>
                    </div>
                `;
      }
    });
  }

  document.getElementById("results").innerHTML =
    resultsHTML || "No results found";
}

function resetFunction() {
  document.getElementById("search").value = "";
  document.getElementById("results").innerHTML = "";
}
