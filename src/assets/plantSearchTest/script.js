function getPlantImage(plant) {
  let inputVal = document.getElementById("text-input").value;
  var wikiSearch = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${inputVal}&origin=*`;
  // Execute a general search for the plant term on Wikipedia's API.
  fetch(wikiSearch)
    .then(function (response) {
      return response.json();
    })
    // With the results returned, get the first result returned (usually the best fit).
    .then(function (data) {
      console.log(data);
      var wikiPageId = data.query.search[0].pageid;
      console.log("ID: ", wikiPageId);
      var wikiTitle = data.query.search[0].title;
      var wikiPageSection = `http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${wikiTitle}&origin=*`;
      // Fetch the data for the particular plant page we obtained from the previous more general search. This data is more rich, and
      // contains the image URL we want to obtain.
      fetch(wikiPageSection)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          let pagesObj = data.query.pages;
          let imgLink =
            pagesObj[Object.getOwnPropertyNames(pagesObj)[0]].original.source;
          displayResults(imgLink, inputVal);
        });
    });
}

function displayResults(image, plantName) {
  const plantImgEl = document.getElementById("plant");
  console.log(plantImgEl);
  plantImgEl.setAttribute("src", "");
  plantImgEl.setAttribute("src", image);
  plantImgEl.setAttribute("id", plantName);
  plantImgEl.removeAttribute("hidden");
}
