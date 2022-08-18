var artistsearch = document.getElementById("artistbuttons");
var concertdisplay = document.getElementById("concertevent");
var concertdate = document.getElementById("concertdate");
var concertname = document.getElementById("concertname");
var venuename = document.getElementById("venuename");
var concerturl = document.getElementById("concerturl");


var Ticketmaster = function ()
{
var TicketUrlSearch = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=";
var TicketUrlAPI = "&countryCode=US&apikey=";
var TicketAPIKey = "fa4oEMRMib4vxQg2FPdmxH9JKdFeSeaC";
var UserInput = document.getElementById('artistinput').value;

var url = TicketUrlSearch + UserInput + TicketUrlAPI + TicketAPIKey;

    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(function(data)
    {
        console.log(data._embedded.events[0]);
        console.log(data._embedded.events[0].name);
        console.log(data._embedded.events[0].dates.start.localDate);
        console.log(data._embedded.events[0].products[0].name);
        console.log(data._embedded.events[0]._embedded.venues[0].name);
        console.log(data._embedded.events[0].url);


        var eventname = data._embedded.events[0].name;
        var eventdate = data._embedded.events[0].dates.start.localDate;
        var eventconcertname = data._embedded.events[0].products[0].name;
        var placename = data._embedded.events[0]._embedded.venues[0].name;
        var eventurl = data._embedded.events[0].url;

        concertdisplay.textContent += eventname;
        concertdate.textContent += eventdate;
        concertname.textContent += eventconcertname;
        venuename.textContent += placename;
        concerturl.textContent += eventurl;
   

    })
    .catch(function(error)
    {
        console.log("Error: ",error);
    })

    
}

artistsearch.addEventListener("click",Ticketmaster);
