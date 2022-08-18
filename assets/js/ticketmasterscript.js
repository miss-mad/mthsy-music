var artistsearch = document.getElementById("artistbuttons");

var Ticketmaster = function ()
{
var TicketUrlSearch = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=";
var TicketUrlAPI = "&countryCode=US&apikey=";
var TicketAPIKey = "fa4oEMRMib4vxQg2FPdmxH9JKdFeSeaC";
var UserInput = document.getElementById('artistinput').value;

var url = TicketUrlSearch + UserInput + TicketUrlAPI + TicketAPIKey;

    fetch(url)
    .then(response => {
        return response.json();
    })
    
    console.log(UserInput);
    console.log(url);
    console.log("yo");

}

artistsearch.addEventListener("click",Ticketmaster);