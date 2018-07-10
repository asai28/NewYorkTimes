$(document).ready(function(){
    $("form").on("submit", function (e) {
        e.preventDefault();
        var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        queryUrl += '?' + $.param({
            'api-key': "5c7ebdeb23d84167b5e4c923e06fd2ab",
            'q': $("#searchTerm").val(),
            'begin_date': $("#startYear").val()+"0101",
            'end_date': $("#endYear").val()+"1231"
        });
        console.log(queryUrl);
        $.ajax({
            url: queryUrl,
            method: 'GET',
        }).then(function(response){
            console.log(response.response.docs[0]);
            var mainContainer = $("#display");
            for(var i = 0; i < parseInt($("#numRecords").val()); ++i){
                var article = $("<div>");
                article.append("<h1>" + response.response.docs[i].headline.main + "</h1>");
                article.append("<p>"+ response.response.docs[i].snippet+"</p>");
                console.log(article);
                var articleImage = $("<img>");
                articleImage.attr("src", "https://nytimes.com/" + response.response.docs[i].multimedia[0].legacy.xlarge);
                article.append(articleImage);
                mainContainer.append(article);
            }
        });
    });

    $("#clear").on("click", function () {
        $("#display").empty();
        $("#text").empty();
    })
});