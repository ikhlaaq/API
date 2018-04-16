
function openPage(pageName, elmnt, color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;


}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

//Books API
function bookSearch() {
    var search = document.getElementById("search").value
    document.getElementById("results").innerHTML = ""

    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
        dataType: "json",
        success: function (data) {

            console.log(data)
            for (var i = 0; i < data.items.length; i++) {
                var newData = data.items[i].volumeInfo
                var preview = data.items[i].searchInfo.textSnippet

                document.getElementById("results").innerHTML += "<h2>" + newData.title + "</h2>" +
                    "<h3> By " + newData.authors[0] + "</h3>" + "<h3> Synopsis: " + preview + "</h3><hr>"
            }
        },
        type: "GET"
    });

}
function dropDown() {
    document.getElementById("results").style.display = 'block';
}

var x = document.getElementById("button")
x.addEventListener("click", bookSearch, false)
// activates api function search
x.addEventListener("click", dropDown, false)
// brings background into view
$('.title').addClass('animated fadeInDown');
// hides results until click event happens


//Itunes API
var processData = function (data) {
    console.log(data);
    $("#output").empty();
    for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].artworkUrl100) {
            var $div = $("<div></div>");
            var $img = $("<img src='" + data.results[i].artworkUrl600 + "' />");
            var $link = $("<a href='" + data.results[i].trackViewUrl + "' target='_blank'></a>");
            $link.html($img);
            $("#output").append($div);
            $div.append(data.results[i].trackName)
                .append("<br>")
                .append($link)
                .append("<br>");
        }
    }
};
var submit = function () {
    var term = $("#term").val();
    $.getScript("https://itunes.apple.com/search?term=" + term + "&entity=podcast&callback=processData");
};

$("#submit").click(submit);
submit();


//Google Map API

function initMap() {
    var uluru = { lat: 56.0381844, lng: 12.6963136 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}
