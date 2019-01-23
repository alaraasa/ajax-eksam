function getTimeFromServer(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
        }
    };
    xhttp.open("GET", "http://localhost:8080/time/", true);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.send();

    xhttp.onreadystatechange=(e)=>{
        document.getElementById("serverTime").innerHTML = "<p>" + xhttp.responseText + "</p>";
    }
}

class NewsReader {

    static getAllTitles(allNews) {
        //console.log(allNews.valueOf());
        allNews = JSON.parse(allNews);
        for(let i=0; allNews.length > i; i++) {
            console.log(allNews[i].title);
            NewsReader.renderTitle(allNews[i].id, allNews[i].title);
        }
    }

    getAllNews() {
        var request = new XMLHttpRequest();
        request.onreadystatechange=function(){
            if (request.readyState==4 && request.status==200){
                // To get the response use request.responseText;
                NewsReader.getAllTitles(request.responseText);
            }
        };
        request.open("GET", "http://localhost:8080/news/");
        request.send(null);
    }

    static renderTitle(id, title) {
        document.body.innerHTML += this.createAnchor(id, title);
    }

    static createAnchor(id, content) {
        return "<a href='readNews.html?id=" + id + "'>" + content + "</a><br>";
    }

}

document.addEventListener("DOMContentLoaded", function(event) {
    let newsReader = new NewsReader();
    newsReader.getAllNews();
});
