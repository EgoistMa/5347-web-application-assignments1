// listening to searches
document.getElementById("search-input").addEventListener("input", processSearch);

function processSearch(event) {
  var searchValue = event.target.value;
  console.log(searchValue);
  search(searchValue);
}

function search(searchValue){
	// TODO: search JSON data for the searchValue
}