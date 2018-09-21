fetch('https://newsapi.org/v2/sources?&apiKey=22b62039f48f4efa8b63080ec997b2f4').then(response => {
  response.json().then(json => {
    let data = json;
    let sources = data.sources;
   	var sel = document.getElementById("news-selector");

    sources.forEach(function(element) {
	 	let opt = document.createElement("option");

	 	opt.value = element.id;
		opt.text = element.name;
		sel.add(opt, null);
	});
  });
});

var select = document.getElementById("news-selector");

const loadArticles = (name) => {
	document.querySelector("main").innerHTML = '';

	fetch('https://newsapi.org/v2/everything?sources=' + name + '&apiKey=22b62039f48f4efa8b63080ec997b2f4').then(response => {
	  response.json().then(json => {
	    let data = json;
	    let articles = data.articles;

	    articles.forEach(function (item, key) {
			let article = document.createElement("article");
			let image = item.urlToImage;

			if (image) {
				image = `<figure><img src='${item.urlToImage}'/></figure>`;
			}
			else {
				image = '';
			}

		    article.innerHTML = `
			    ${image}
				<h2>'${item.title}'</h2>
				<p>'${item.description}'</p>
				<a class="cta" target="blank" href='${item.url}'>Lire l'article</a>
			`		
			document.querySelector("main").appendChild(article);
		});
	  });
	});
};

loadArticles('abc-news');

select.addEventListener("change", function() {
	loadArticles(select.value);
});

