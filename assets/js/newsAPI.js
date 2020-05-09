
// var key = '0b6a7f4a5eba4bdda60557b4792450bb';

// function loadNews(category) {

//     var url = 'http://newsapi.org/v2/top-headlines?' +
//     'country=us&' +
//     'apiKey=0b6a7f4a5eba4bdda60557b4792450bb';
//     document.getElementById('nav1').className = "active";
/*jslint node:true */
'use strict';

var newsStories = new XMLHttpRequest();
var newsObject;
var currentPage = 1;
var key = '0b6a7f4a5eba4bdda60557b4792450bb';

function loadNews(category) {

    var url = 'http://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        'apiKey=0b6a7f4a5eba4bdda60557b4792450bb';
    document.getElementById('nav1').className = "active";
    
    
    if (category === 1) { //featured
        url = '//newsapi.org/v2/top-headlines?' +
            'country=us&' +
            'apiKey=' + key;
        document.getElementById('nav1').className = "active";
        document.getElementById('nav2').className = "";
        document.getElementById('nav3').className = "";
        document.getElementById('nav4').className = "";
        document.getElementById('nav5').className = "";
        document.getElementById('nav6').className = "";
        document.getElementById('nav7').className = "";
        currentPage = category;
        
    } else if (category === 2) { //tech
        url = '//newsapi.org/v2/top-headlines?' +
            'country=us&' +
            'category=technology&' +
            'apiKey=' + key;
        document.getElementById('nav1').className = "";
        document.getElementById('nav2').className = "active";
        document.getElementById('nav3').className = "";
        document.getElementById('nav4').className = "";
        document.getElementById('nav5').className = "";
        document.getElementById('nav6').className = "";
        document.getElementById('nav7').className = "";
        currentPage = category;
    } else if (category === 3) { //business
        url = '//newsapi.org/v2/top-headlines?' +
            'country=us&' +
            'category=business&' +
            'apiKey=' + key;
        document.getElementById('nav1').className = "";
        document.getElementById('nav2').className = "";
        document.getElementById('nav3').className = "active";
        document.getElementById('nav4').className = "";
        document.getElementById('nav5').className = "";
        document.getElementById('nav6').className = "";
        document.getElementById('nav7').className = "";
        currentPage = category;
    } else if (category === 4) { //entertainment
        url = '//newsapi.org/v2/top-headlines?' +
            'country=us&' +
            'category=entertainment&' +
            'apiKey=' + key;
        document.getElementById('nav1').className = "";
        document.getElementById('nav2').className = "";
        document.getElementById('nav3').className = "";
        document.getElementById('nav4').className = "active";
        document.getElementById('nav5').className = "";
        document.getElementById('nav6').className = "";
        document.getElementById('nav7').className = "";
        currentPage = category;
    } else if (category === 5) { //health
        url = '//newsapi.org/v2/top-headlines?' +
            'country=us&' +
            'category=health&' +
            'apiKey=' + key;
        document.getElementById('nav1').className = "";
        document.getElementById('nav2').className = "";
        document.getElementById('nav3').className = "";
        document.getElementById('nav4').className = "";
        document.getElementById('nav5').className = "active";
        document.getElementById('nav6').className = "";
        document.getElementById('nav7').className = "";
        currentPage = category;
    } else if (category === 6) { //science
        url = '//newsapi.org/v2/top-headlines?' +
            'country=us&' +
            'category=science&' +
            'apiKey=' + key;
        document.getElementById('nav1').className = "";
        document.getElementById('nav2').className = "";
        document.getElementById('nav3').className = "";
        document.getElementById('nav4').className = "";
        document.getElementById('nav5').className = "";
        document.getElementById('nav6').className = "active";
        document.getElementById('nav7').className = "";
        currentPage = category;
    } else if (category === 7) { //sports
        url = '//newsapi.org/v2/top-headlines?' +
            'country=us&' +
            'category=sports&' +
            'apiKey=' + key;
        document.getElementById('nav1').className = "";
        document.getElementById('nav2').className = "";
        document.getElementById('nav3').className = "";
        document.getElementById('nav4').className = "";
        document.getElementById('nav5').className = "";
        document.getElementById('nav6').className = "";
        document.getElementById('nav7').className = "active";
        currentPage = category;
    }
    
    //get news data
    newsStories.open('GET', url, true);
    newsStories.responseType = 'text';
    newsStories.send(null);
}

newsStories.onload = function () {
    var imgPath, i = 0, desc, diff, diffInHours, hoursRounded, pubDate, currentDate;
    if (newsStories.status === 200) {
        newsObject = JSON.parse(newsStories.responseText);
        console.log(newsObject);
        for (i; i < newsObject.articles.length; i += 1) {
            document.getElementById('headline-' + i).innerHTML = newsObject.articles[i].title;
            imgPath = newsObject.articles[i].urlToImage;
            if (imgPath !== null) {
                document.getElementById('headline-' + i + '-image').src = imgPath;
                document.getElementById('headline-' + i + '-image').style.display = "block";
            } else {
                document.getElementById('headline-' + i + '-image').style.display = "none";
            }
            desc = newsObject.articles[i].description;
            if (desc !== null && desc !== "") {
                if (desc.length <= 94) {
                    desc = desc.substring(0, 94);
                } else {
                    desc = desc.substring(0, 94) + "...";
                }
            }
            document.getElementById('description-' + i).innerHTML = desc;
            document.getElementById('source-' + i).innerHTML = newsObject.articles[i].source.name;
            pubDate = newsObject.articles[i].publishedAt;
            currentDate = new Date();
            diff = currentDate.valueOf() - Date.parse(pubDate);
            diffInHours = diff / 1000 / 60 / 60;
            if (diffInHours < 1) {
                hoursRounded = (diffInHours * 60).toFixed(0) + "m";
            } else if (diffInHours >= 24) {
                hoursRounded = (diffInHours / 24).toFixed(0) + "d";
            } else {
                hoursRounded = Math.floor(diffInHours) + "h";
            }
            document.getElementById('time-' + i).innerHTML = hoursRounded;
        }
    } //end if
}; //end function

function clickCard(articleNumber) {
    var storyUrl = newsObject.articles[articleNumber].url;
    window.open(storyUrl, "_blank");
}

//navigate by swiping left and right. Doesn't work well with Safari
/*
var pageWidth = window.innerWidth || document.body.clientWidth;
var treshold = Math.max(1, Math.floor(0.25 * (pageWidth)));
var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;
var limit = Math.tan(45 * 1.5 / 180 * Math.PI);
var gestureZone = document.getElementById('main-body');
gestureZone.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);
gestureZone.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture(event);
}, false);
function handleGesture(e) {
    var x = touchendX - touchstartX;
    var y = touchendY - touchstartY;
    var xy = Math.abs(x / y);
    var yx = Math.abs(y / x);
    if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
        if (yx <= limit && y < 50 && y > -50) {
            if (x < 0) {
                if (currentPage < 7) {
                //left swipe
                    loadNews(currentPage + 1);
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                }
            } else {
                if (currentPage > 1) {
                //right swipe
                    loadNews(currentPage - 1);
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                }
            }
            document.getElementById("nav" + currentPage).scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
        }
    }
}
*/


loadNews(currentPage);
