//Materialize related resizing transformation
$('#textarea1').val('New Text');
M.textareaAutoResize($('#textarea1'));


var TicketUrlSearch = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=";
var TicketUrlAPI = "&source=universe&countryCode=US&apikey=";
var TicketAPIKey = "zqWzIQbmGAVkCr0Mp3CKpqAAy7b1wHwL";
var UserInput = "";



var url = TicketUrlSearch + UserInput + TicketUrlAPI + TicketAPIKey;

