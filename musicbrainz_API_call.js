
let artistNameForDisplay = "";

// http get method that sends a query to the API of Musicbrainz
function httpGet(theURL, cbFunction) {
    
    let xmlHttp = new XMLHttpRequest();
    
    xmlHttp.open("GET", theURL);
    xmlHttp.send();
    
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cbFunction(this);
        }
    };
}

// First need to query artist to the MB API to retrieve the artist MBID
function queryArtist() {

    let params = (new URL(document.location)).searchParams;
    if (params.has('artist')) {
        let artistName = params.get('artist');
        let mbBaseURL = "https://musicbrainz.org/ws/2/";
        let mbResource = "artist?query=";
        let queryURL = mbBaseURL + mbResource + artistName;

        httpGet(queryURL, getMBID);
    }
}

// A method that retrieves the MBID of an artists from the XML response
function getMBID(xhttp) {
    let retrievedData = xhttp.responseXML;
    
    let artistData = retrievedData.getElementsByTagName("artist")[0];
    artistNameForDisplay = artistData.getElementsByTagName("name")[0].innerHTML;
    let artistMBID = artistData.id;
    console.log("Artist Id: "+artistMBID);

    document.getElementById("loading").innerHTML = "Loading...";
    
    // We then send another API call to get the albums of the artists 
    queryAlbumFromMBID(artistMBID);
}

// A method that queries Music brainz API to retrieves albums from a MBID
function queryAlbumFromMBID(artistID){
    let mbBaseURL = "https://musicbrainz.org/ws/2/";
    let mbResource = "release-group?artist="
    let type = "&type=album|ep"
    let queryURL = mbBaseURL + mbResource + artistID + type

    httpGet(queryURL, getAlbums)
}

// A mehtod that retrieves albums from the xml response and adds it to the HTML 
function getAlbums(xhttp) {
    let retrievedData = xhttp.responseXML;
    console.log(retrievedData)

    // retrieving the albums list in the XML
    let albumsList = retrievedData.getElementsByTagName("release-group-list")[0];
    let albums = albumsList.getElementsByTagName("release-group");
    let numberOfAlbums = albums.length;
    console.log("Number of Albums: "+numberOfAlbums);

    let albumNames = [numberOfAlbums];
    let albumDates = [numberOfAlbums];

    // Storing each album names and release dates in two arrays
    for (let i=0; i<numberOfAlbums; i++){
        let currentAlbum = albumsList.getElementsByTagName("release-group")[i];
        let currentName = currentAlbum.getElementsByTagName("title")[0].innerHTML;
        let currentDate = currentAlbum.getElementsByTagName("first-release-date")[0].innerHTML;
        
        albumNames[i] = currentName;
        albumDates[i] = currentDate;
    }

    console.log(albumNames);
    console.log(albumDates);

    // creating an html table and adding the header row 
    table = "<tr><th>Album Name</th>"
    table += "<th>Release Date</th></tr>";

    // Adding each albums and release dates in a specfic line on the the table
    for (let i=0; i<albumNames.length; i++) {
        table+="<tr><td> "+albumNames[i]+"</td>";
        table+="<td> "+albumDates[i]+"</td></tr>";
    }

    document.getElementById("loading").innerHTML = "";
    document.getElementById("artist_name").innerHTML = "Here is a list of album names and their release dates for "+artistNameForDisplay+": ";
    document.getElementById('placeholder').innerHTML = table;
    
}

window.onload = queryArtist;
    