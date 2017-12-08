const $inputField = $('#input');
const $searchButton = $('#search');
const $popularButton = $('#popular');
const $responseField = $('#responseField');
var table;

/*
function searchTune() {
  const searchURL = "https://thesession.org/tunes/search?q=" + $inputField + "&format=json";

  $.ajax({
    url: searchURL,
    type: 'GET',
    dataType: 'json',

    success(response) {
      $(response.tunes).ready(function(){
        $('#myTable').DataTable();
      });
    },
    error(jqXHR, status, errorThrown) {
      console.log(jqXHR);
    }  
  });
}
*/

function search() {
  $responseField.empty();
  searchTune();
  return false;  
}

function searchTune() {
  const searchURL = "https://thesession.org/tunes/search?q=" + $inputField + "&format=json";
  const urlWithKey = url + '?key=' + apiKey;
  const searchTerm = $inputField.val();

  $.ajax({
    url: searchURL, 
    type: 'GET', 
    //data: JSON.stringify({longUrl: urlToShorten}), 
    dataType: 'json', 
    contentType: 'application/json', 

    success(response) {
      console.log(response);
      $(response["tunes"]).ready(function(){
        $('#myTable').DataTable();
      }); 
    },  
    error(jqXHR, status, errorThrown) {
      console.log(jqXHR);
    }
  }); 
}

function popular() {
  $responseField.empty();
  
  popularTunes();
  return false;
}

function popularTunes() {
  const popurl = "https://thesession.org/tunes/popular?format=json&perpage=10";

  $.ajax({
    url: popurl,
    type: 'GET',
    dataType: 'json',

    success(response) {
      $(response).ready(function(){
       	var dataSet = [];
	for (var obj in response.tunes) {
	  var tune = [response.tunes[obj].name,obj.type,obj.tunebooks];
	  dataSet.push(tune);
          // Use 'append' for this
	}
	 $('#myTable').DataTable({
		data: dataSet,
		columns:
		[
			{ title: "Name"},
			{ title: "Type"},
			{ title: "Tunebooks"}
     		]
	 });
    })},

    error(jqXHR, status, errorThrown) {
      console.log(jqXHR);
    }
  }); 
}

//$searchButton.
$searchButton.click(search);
$popularButton.click(popular);
