let latestnews = document.getElementById('latestnews');
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://newsapi.org/v2/everything?q=apple&from=2021-10-13&to=2021-10-13&sortBy=popularity&apiKey=a75a6479a4054449ba796f591994903e', true);
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        //console.log(json);
        let mainNews = "";
        articles.forEach(function (element, index) {

            let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                        aria-expanded="true" aria-controls="#collapse${index}">
                                        &nbsp${element["title"]}.<img src=${element["urlToImage"]} width="100px" height="100px" align="left">
                                    </button>
                                </h2>
                            </div>

                            <div id="collapse${index}" class="collapse show" aria-labelledby="heading${index}" data-parent="#latestnews">
                                <div class="card-body">${element["description"]}. <a href="${element['url']}" target="_blank">Click here to read more</a></div>
                            </div>
                        </div>`;
            mainNews += news;
        });
        latestnews.innerHTML = mainNews;

        var state = {
            'querySet': articles,
            'page': 1,
            'rows': 5
        }
        function pagination(querySet, page, rows) {
            var trimStart = (page - 1) * rows
            var trimEnd = trimStart + rows

            var trimData = querySet.slice(trimStart, trimEnd)

            var pages = Math.ceil(querySet.length / rows)

            return {
                'querySet': trimData,
                'pages': pages
            }
        }
        var data = pagination(state.querySet, state.page, state.rows)
    }
    else {
        console.log("Some error occured")
    }
}
xhr.send()


