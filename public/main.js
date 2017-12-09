const $inputField = $('#input');
const $searchButton = $('#search');
const $popularButton = $('#popular');
const $searchTable = $('#myTable2');
const $popularTable= $('#myTable');
const $searchLabel = $('#searchLabel');


// Immediately hides empty columns and data to be shown later (when data is requested)
$(document).ready(function() {
  $('.column1').hide();
  $('.column2').hide();
});


///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////


function search() {
  $('.column2').show();
  searchTune();

  // Search button and input form are hidden to prevent multiple data table error
  $('.button2').hide();
  $('#input').hide();
  return false;  
}

function popular() {
  $('.column1').show();
  popularTunes();

  // Top 50 button is hidden to prevent multiple data table error
  $('.button1').hide();
  return false;
}


///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////


// Function which calls DataTables plug-in to render information from AJAX call
function searchTune() {
  const searchURL = "https://thesession.org/tunes/search?q=" + $inputField.val() + "&format=json&perpage=20";

  // Changes the title so the searched term can be seen
  $searchLabel.append("Search for '" + $inputField.val() + "'"); 

  $.ajax({
    url: searchURL,
    type: 'GET',
    dataType: 'json',
    
    success(response) {
      $(response).ready(function(){
        let dataSet = [];
        let i = 0;

        // Data is in nonstandard JSON, so the specific sub-object must be passed into an array 
        // to be parsed by the DataTables plug-in
        for (let obj in response.tunes) {
          let tune2 = [i++,
                      response.tunes[obj].id,
                      response.tunes[obj].name,
                      response.tunes[obj].type];
          
          dataSet.push(tune2);
          // Use 'append' for this
        }
        $searchTable.DataTable({
          data: dataSet,
          columns: [{ title: "Index" },
                    { title: "ID" },
                    { title: "Name"},
                    { title: "Type"}],
          columnDefs: 
                   [{ "targets": [ 0 ],  // Index
                      "visible": false,
                      "searchable": false },

                    { "targets": [ 1 ],  // ID
                      "visible": false,
                      "searchable": false },  

                    { "targets": [ 2 ],  // Name
                      "mRender": function ( data, type, full ) {
                         return '<a id="tune" href="https://thesession.org/tunes/' + full[1] + '">' + data + '</a>';
                      }
                    }]
         });
    })},

    error(jqXHR, status, errorThrown) {
      console.log(jqXHR);
    }
  });
}


// Function which calls DataTables plug-in to render information from AJAX call
function popularTunes() {
  const popurl = "https://thesession.org/tunes/popular?format=json&perpage=50";

  $.ajax({
    url: popurl,
    type: 'GET',
    dataType: 'json',

    success(response) {
      $(response).ready(function(){
        let dataSet = [];
        let i = 0;

        // Data is in nonstandard JSON, so the specific sub-object must be passed into an array 
        // to be parsed by the DataTables plug-in
        for (let obj in response.tunes) {
          let tune = [i++,
                      response.tunes[obj].id,
                      response.tunes[obj].name,
                      response.tunes[obj].type,
                      response.tunes[obj].tunebooks];

	  dataSet.push(tune);
	}
	$popularTable.DataTable({
	  data: dataSet,
	  columns: [{ title: "Index" },
                    { title: "ID" },
                    { title: "Name"},
                    { title: "Type"},
                    { title: "In X Tunebooks"}],

              
          columnDefs: [{ "targets": [ 0 ],  // Index
                         "visible": false,
                         "searchable": false }, 

                       { "targets": [ 1 ],  // ID
                         "visible": false,
                         "searchable": false },  

                       { "targets": [ 2 ],  // Name

                         // Makes all name column elements link to their respective pages on TheSession.org
                         "mRender": function ( data, type, full ) {
                            return '<a id="tune" href="https://thesession.org/tunes/' + full[1] + '">' + data + '</a>';
                         }
                       },

                       { "targets": [ 4 ],  // Number of Tunebooks a specific tune is in
                         "searchable": false }]
	 });
    })},

    error(jqXHR, status, errorThrown) {
      console.log(jqXHR);
    }
  }); 
}


///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////


$searchButton.click(search);
$popularButton.click(popular);
