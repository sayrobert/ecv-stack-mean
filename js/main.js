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
			let div = document.createElement("div");
			let image = item.urlToImage;

			if (image) {
				image = `<img src='${item.urlToImage}'/>`;
			}
			else {
				image = '';
			}

		    div.innerHTML = `
			    ${image}
				<h2>'${item.title}'</h2>
				<p>'${item.description}'</p>
				<a target="blank" href='${item.url}'>Lire l'article</a>
			`		
			document.querySelector("main").appendChild(div);
		});
	  });
	});
};

loadArticles('abc-news');

select.addEventListener("change", function() {
	loadArticles(select.value);
});

