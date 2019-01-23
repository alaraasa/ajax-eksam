class NewsComponent {
    getNewsData() {
        let id = NewsComponent.findGetParameter("id");
        this.getNews(id);
        this.getComments(id);
    }

    static renderNewsContent(content) {
        let allNews = JSON.parse(content);
        console.log("Rendering news.");
        console.log(allNews);
        let title = "<h1>" + allNews.title + "</h1>";
        let newsContent = "<h2>"+ allNews.content + "</h2>";
        let time = "<i>Posted at: " + allNews.time + " </i>";
        document.body.innerHTML += title + " " + newsContent + " " + time + "<br>";
    }

    static renderComments(content) {
        let allComments = JSON.parse(content);
        console.log("Rendering comments.");
        document.body.innerHTML += "<br>_________________________________<br>" +
            "<br><br> COMMENTS: <br><br>";
        for(let i=0; allComments.length > i; i++) {
            let username = "<b>Username: " + allComments[i].name + "</b>";
            let content = "<p>"+ allComments[i].content + "</p>";
            document.body.innerHTML += username + " " + content + "<br>";
        }
    }

    static findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }

    getNews(id) {
        let request = new XMLHttpRequest();
        request.onreadystatechange=function(){
            if (request.readyState==4 && request.status==200){
                // To get the response use request.responseText;
                NewsComponent.renderNewsContent(request.responseText);
            }
        };
        let url = "http://localhost:8080/news/single?id=" + id;
        request.open("GET", url);
        request.send(null);
    }

    getComments(id) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                // To get the response use request.responseText;
                NewsComponent.renderComments(request.responseText);
            }
        };
        let url = "http://localhost:8080/comments?id=" + id;

        request.open("GET", url);
        request.send(null);
    }

}

document.addEventListener("DOMContentLoaded", function(event) {
    let news = new NewsComponent();
    news.getNewsData();
});
