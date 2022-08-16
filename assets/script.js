var myAPI = "";

//last.FM API Key under mad's account
var lastfmApiKey = "807f87e7dcc6c31a458c4ab1feb542c2";

// OVH API is a simple API that helps us retrieve the lyrics of a song. We use two parameters to fetch data (lyrics). These are:

// Artist’s name.
// Title of the song.
// When a request is made, data is returned in JSON format. We also get two status codes:

// Status code 200 means that the API call is successful.
// Status code 404 indicates that the API call failed.
// You can read more about the OVH API here.

// An example of the URL in action looks like this: https://api.lyrics.ovh/v1/Drake/Toosie Slide.

var lyricsovhApi = "https://api.lyrics.ovh";
// form with class/id of: 
// input with class/id of: 
// div (for search output) with class/id of: 

// check if search bar/input field is empty first
// form.addEventListener("submit", e => {
//     e.preventDefault();
//     searchValue = search.value.trim();

//     if (!searchValue) {
//         alert("Nothing to search");
//     } else {
//         startSearch(searchValue);
//     }
// })

// research async/await and how that differs from promise
// async function startSearch(searchValue) {
//     const searchResult = await fetch(`${api}/suggest/${searchValue}`);
//     const data = await searchResult.json();
//     console.log(data);
//     showData(data);
// }

// .map() method - creates a new array from calling a function for every array element

//Materialize related resizing transformation
$('#textarea1').val('New Text');
M.textareaAutoResize($('#textarea1'));

