var bsService = new BSAutoSwitch(['elkanacmmmdgbnhdjopfdeafchmhecbf', 'gdgmmfgjalcpnakohgcfflgccamjoipd ']);

var currentMenuId;
var menuOpen = false;
var favorites = [];
var products = [];
var productCards = [];
var filters = {
	"price":[false,false,false,false],
	"averageRating":[false,false,false,false]
};

var urls = [
    {"amazon":"https://www.amazon.com/Philips-BT3080B-37-Wireless-Bluetooth/dp/B010ND6PAC", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16855503074"},
    {"amazon":"https://www.amazon.com/Speaker-Bluetooth-Speakers-Portable-Wireless/dp/B00ES2BQ7M", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=9SIAAM84FZ9894"},
    {"amazon":"https://www.amazon.com/Cambridge-SoundWorks-OontZ-Angle-Generation/dp/B010OYASRG", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=9SIA45C4G62160"},
    {"amazon":"https://www.amazon.com/JBL-Portable-Splashproof-Bluetooth-Speaker/dp/B0147JTPY6", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=9SIA4X74SU5022"},
    {"amazon":"https://www.amazon.com/Philips-SB365B-37-Bluetooth-Rechargeable/dp/B0136RBIWM", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16855503069"},
    {"amazon":"https://www.amazon.com/Philips-BT2200B-27-Waterproof-Technology/dp/B00RK3T3OY", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16855503059"},
    {"amazon":"https://www.amazon.com/ARCTIC-Bluetooth-Speaker-Microphone-Hands-Free/dp/B00F4EONWS", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=9SIA4RE4KZ8056"},
    {"amazon":"https://www.amazon.com/GOgroove-Multimedia-Bluetooth-Technology-Removable/dp/B00Q3D085U", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16855681005"}
];

function product(brand, model, price, imageUrl, averageRating, reviews, specifications, id, amazonUrl, neweggUrl) {
    this.brand = brand;
	this.model = model;
	this.price = price;
	this.imageUrl = imageUrl;
	this.averageRating = averageRating;
	this.reviews = reviews;
	this.favorite = false;
	this.specifications = specifications;
    this.id = id;
	this.showOnPage = true;
    this.amazonUrl = amazonUrl;
    this.neweggUrl = neweggUrl;
}

window.onload = function() { 
	buildProducts();
   	/* buildProductCards(); */
};

function buildProducts() {
    for (i = 0; i < urls.length; i++) {
        products.push(new product("", "", 0, "", 0, [], {}, "product" + i, urls[i]["amazon"], urls[i]["newegg"]));
        bsService.loadMetadata(urls[i]["amazon"], {}, amazon);
        bsService.loadMetadata(urls[i]["newegg"], {}, newegg);
    }
/* 	for (i = 0; i < 5; i++)
	{
		
		products.push(new product("AXESS", "SPBT1031-RD", 119.99 - (25 * i), 
			"https://images-na.ssl-images-amazon.com/images/I/41u8vEGE9QL.jpg",
			1 + (0.5 * (i + 1)), productObj.reviews, false, productObj.specifications,
			"product" + i, true));
	} */
}

function amazon(err, metadataAndMetametaData)
{
	var unwrappedMetadata = BSUtils.unwrap(metadataAndMetametaData.metadata);
    
    var i = 0;
    for (i; i < products.length; i++)
    {
        if (products[i].amazonUrl == unwrappedMetadata["location"]) {
            break;
        }
    }

    try {
        var price = Number(unwrappedMetadata["price"].substring(1));
        var imageUrl = unwrappedMetadata["main_images"][0]["location"];
        var averageRating = Number(unwrappedMetadata["overall_rating"].substring(0, 3));

        products[i].price = price;
        products[i].imageUrl = imageUrl;
        products[i].averageRating = averageRating;
        
        var reviews = unwrappedMetadata["reviews"];
        
        for (j = 0; j < reviews.length; j++) {
            var rating = Number(reviews[j]["rating"].substring(0, 1));
            var title = reviews[j]["title"];
            var description = reviews[j]["description"];
            
            products[i].reviews.push({"rating":rating, "title":title, "description":description});
        }

    } catch (e) {
        
    }
    
    if (products[i].brand != "") {
        buildProductCard(products[i]);
    }
}

function newegg(err, metadataAndMetametaData) {
	var unwrappedMetadata = BSUtils.unwrap(metadataAndMetametaData.metadata);
    console.log(unwrappedMetadata);
    
    var i = 0;
    for (i; i < products.length; i++)
    {
        if (products[i].neweggUrl == unwrappedMetadata["location"]) {
            break;
        }
    }
    try {
        var specsTable = unwrappedMetadata["specifications_table"];
        
        for (j = 0; j < specsTable.length; j++)
        {
            var specifications = specsTable[j]["specifications"];
            for (k = 0; k < specifications.length; k++) {
                if (specifications[k]["name"] == "Brand")
                {
                    var brand = specifications[k]["value"];
                    products[i].brand = brand;
                } else if (specifications[k]["name"] == "Model") {
                    var model = specifications[k]["value"];
                    products[i].model = model;
                } else {
                    var name = specifications[k]["name"];
                    var value = specifications[k]["value"];
                    products[i].specifications[name] = value;
                }
            }
        }
    } catch (e) {
        
    }
    
    if (products[i].price != 0) {
        buildProductCard(products[i]);
    }

}

function buildProductCard(product) {
    var productsContainer = document.getElementById("products-container");
    
    var productCard = document.createElement("div");
    productCard.className = "product-card";        
    productCard.id = product.id;

    var container = document.createElement("div");
    container.className += "product-container";
    addTooltip(container, "Right&nbsp;click&nbsp;to&nbsp;view/close&nbsp;options&nbsp;menu");

    var imgContainer = document.createElement("div");
    imgContainer.className = "product-image-container";

    var image = document.createElement("img");
    image.src = product.imageUrl;

    var productName = document.createElement("div");
    productName.className = "product-name";
    productName.innerHTML = product.brand + " " + product.model + " ";
    
    var favoriteIcon = document.createElement("i");
    favoriteIcon.style.color = "red";
    favoriteIcon.className = "fa ";
    favoriteIcon.id = product.id + "Favorite";
    productName.appendChild(favoriteIcon);

    var starAndPriceContainer = document.createElement("div");
    starAndPriceContainer.className = "product-rating-and-price-container";
    
    var stars = document.createElement("div");
    stars.className = "product-rating";

    for (j = 0; j < 5; j++) {
        var star = document.createElement("i");
        if (j + 0.5 < product.averageRating) {
            star.className = "fa fa-star";
        } else if (j + 0.5 == product.averageRating) {
            star.className = "fa fa-star-half-o";
        } else {
            star.className = "fa fa-star-o";
        }
        stars.appendChild(star);
    }

    var price = document.createElement("div");
    price.className = "product-price";
    price.innerHTML = "$"+product.price.toFixed(2);

    var circularMenu = buildCircularMenu(products.indexOf(product));

    imgContainer.appendChild(image);
    container.appendChild(imgContainer);
    container.appendChild(productName);
    starAndPriceContainer.appendChild(stars);
    starAndPriceContainer.appendChild(price);
    container.appendChild(starAndPriceContainer);
    productCard.appendChild(container);
    productCard.appendChild(circularMenu);
    
    productCard.oncontextmenu = (function() {
        var currentId = productCard.id;
        return function() {
            openCircularMenu(currentId + "Menu");
        }
    })();
    
    
    var productCardId = productCard.id;
    productCards[productCardId] = productCard;
    
    
    productsContainer.appendChild(productCard);
    	
}

function buildCircularMenu(i) {
	var circularMenu = document.createElement("div");
	circularMenu.className = "circular-menu";        
	
	var circle = document.createElement("div");
	circle.className = "circle";
	circle.id = "product" + i + "Menu";
	
	var favorite = document.createElement("i");
	favorite.className = "fa fa-heart-o fa-2x";
	addTooltip(favorite, "Compare&nbsp;to&nbsp;favorites");
	
	var videos = document.createElement("i");
	videos.className = "fa fa-film fa-2x";
	addTooltip(videos, "View&nbsp;videos");
	
	var reviews = document.createElement("i");
	reviews.className = "fa fa-star fa-2x";
	addTooltip(reviews, "Read&nbsp;reviews");

	var specifications  = document.createElement("i");
	specifications.className = "fa fa-list-ul fa-2x";
	addTooltip(specifications, "View&nbsp;specifications");
	
	var menuItems = [favorite, videos, reviews, specifications];
	for (var j = 0, l = menuItems.length; j < l; j++)
	{
		menuItems[j].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*j*Math.PI)).toFixed(4) + "%";
		menuItems[j].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*j*Math.PI)).toFixed(4) + "%";        
		menuItems[j].onclick = (function() {
			var currentProduct = products[i];
			var iconId = 3-j;
			return function() { 
				openModal(currentProduct, iconId);
			}
		})();
	}
	
	circle.appendChild(favorite);
	circle.appendChild(videos);
	circle.appendChild(reviews);
	circle.appendChild(specifications);
	circularMenu.appendChild(circle);
	
	return circularMenu;
}

function addTooltip(element, tooltipText) {
	var tooltipTextElement = document.createElement("span");
	
	element.className += " tooltip";
	tooltipTextElement.className = "tooltip-text";
	tooltipTextElement.innerHTML = tooltipText;
	
	element.appendChild(tooltipTextElement);
}

function openCircularMenu(menuId) {
	if (currentMenuId == null)
	{
		currentMenuId = menuId;
        document.getElementById(currentMenuId).classList.toggle('open');
		menuOpen = true;
	}
    else 
	{
		if (currentMenuId == menuId)
		{
			document.getElementById(currentMenuId).classList.toggle('open');
			menuOpen = !menuOpen;
		}
		else
		{
			if (menuOpen)
			{
				document.getElementById(currentMenuId).classList.toggle('open');
				currentMenuId = menuId;
				document.getElementById(currentMenuId).classList.toggle('open');
			}
			else
			{
				currentMenuId = menuId;
				document.getElementById(currentMenuId).classList.toggle('open');
				menuOpen = true;
			}
		}
	}
	
    return false;
}

function closeCircularMenu() {
	if ((menuOpen) && (currentMenuId != null))
	{
        document.getElementById(currentMenuId).classList.toggle('open');
		menuOpen = false;
	}
}

function openModal(currentProduct, menuItem) {
    document.getElementById(currentMenuId).classList.toggle('open');
    currentMenuId = null;
    document.getElementById("modalWindow").style.display="block";
	populateModal(currentProduct);
	document.getElementsByClassName("tablink")[menuItem].click();
}

function populateModal(currentProduct) {
    document.getElementById("modalImage").src = currentProduct.imageUrl;
    document.getElementById("modalProductName").innerHTML = currentProduct.brand + " " + currentProduct.model;
    document.getElementById("modalPrice").innerHTML = "$"+currentProduct.price.toFixed(2);
    for (i = 1; i <= 5; i++) {
        var star = document.getElementById("modalStar" + i);
        if (i <= currentProduct.averageRating) {
            star.className = "fa fa-star";
        } else if (i == currentProduct.averageRating + 0.5) {
            star.className = "fa fa-star-half-o"
        } else {
            star.className = "fa fa-star-o";
        }
    }
	var favoriteIcon = document.getElementById("modalFavorite");
	favoriteIcon.className = "fa";
	if (currentProduct.favorite) {
		favoriteIcon.className += " fa-heart";
	} else {
		favoriteIcon.className += " fa-heart-o";
	}
	favoriteIcon.onclick = (function() {
		return function() {
			toggleFavorite(currentProduct)
		}
	})();
        
	populateModalSpecsTable(currentProduct);
	populateModalReviews(currentProduct);
	populateModalVideos(currentProduct);
	populateModalCompareFavorites(currentProduct); 
}

function populateModalSpecsTable(currentProduct) {
	var specsTable = document.getElementById("modalSecificationsTable");
    while (specsTable.firstChild) {
        specsTable.removeChild(specsTable.firstChild);
    }
    for (var i in currentProduct.specifications) {
        var row = document.createElement("tr");
        var spec = document.createElement("td");
        var details = document.createElement("td");
        
        spec.innerHTML = i;
        details.innerHTML = currentProduct.specifications[i];
        
        row.appendChild(spec);
        row.appendChild(details);
        specsTable.appendChild(row);
    }

}

function populateModalReviews(currentProduct) {
    var reviews = document.getElementById("reviewsContent");
    while (reviews.firstChild) {
        reviews.removeChild(reviews.firstChild);
    }
    if (currentProduct.reviews.length == 0) {
        reviews.appendChild(document.createTextNode("Could Not Retrieve Reviews"));
    } else {
        for (i = 0; i < currentProduct.reviews.length; i++)
        {
            var review = document.createElement("div");
            review.className = "review";
            
            var stars = document.createElement("div");
            stars.className = "stars";
            for (j = 0; j < 5; j++)
            {
                var star = document.createElement("i");
                if (j < currentProduct.reviews[i]["rating"]) {
                    star.className = "fa fa-star";
                } else {
                    star.className = "fa fa-star-o";
                }
                stars.appendChild(star);
            }
            review.appendChild(stars);
            
            var title = document.createElement("div");
            title.innerHTML = "<b>" + currentProduct.reviews[i]["title"] + "</b>";
            review.appendChild(title);
            
            var description = document.createElement("div");
            description.appendChild(document.createTextNode(currentProduct.reviews[i]["description"]));
            review.appendChild(description);
            
            reviews.appendChild(review);
        }
    }
}

function populateModalVideos(currentProduct) {
    var youtubeResultsScript = document.createElement("script");
    youtubeResultsScript.innerHTML = 
            "ytEmbed.init({'block':'ytThumbs','key':'AIzaSyAjRzrFIWUBkzGyca98NFNn3dfwLf6Bvh4','q':'" + currentProduct.brand + " " + 
            currentProduct.model + "','type':'search','results':5,'meta':true,'player':'embed','layout':'full'});";
    document.getElementById("modalVideosContainer").appendChild(youtubeResultsScript);
}

function populateModalCompareFavorites(currentProduct) {
	var favoritesTable = document.getElementById("modalFavoritesTable");
    while (favoritesTable.firstChild) {
        favoritesTable.removeChild(favoritesTable.firstChild);
    }
	var imageRow = document.createElement("tr");
	imageRow.appendChild(document.createElement("td"));
	var image = document.createElement("td");
	image.innerHTML = "<img src=\"" + currentProduct.imageUrl + "\" height=\"50\"/>";
	imageRow.appendChild(image);
	for (var i = 0; i < favorites.length; i++)
	{
		if (favorites[i].id != currentProduct.id) {
			image = document.createElement("td");
			image.innerHTML = "<img src=\"" + favorites[i].imageUrl + "\" height=\"50\"/>";
			imageRow.appendChild(image);		
		}
	}
	favoritesTable.appendChild(imageRow);
	
	var productRow = document.createElement("tr");
	var product = document.createElement("td");
	product.innerHTML = "Product";
	productRow.appendChild(product);
	product = document.createElement("td");
	product.innerHTML = currentProduct.brand + " " + currentProduct.model;
	productRow.appendChild(product);
	for (var i = 0; i < favorites.length; i++)
	{
		if (favorites[i].id != currentProduct.id) {
			product = document.createElement("td");
			product.innerHTML = favorites[i].brand + " " + favorites[i].model;
			productRow.appendChild(product);		
		}
	}
	favoritesTable.appendChild(productRow);
    
	var priceRow = document.createElement("tr");
	var price = document.createElement("td");
	price.innerHTML = "Price";
	priceRow.appendChild(price);
	price = document.createElement("td");
	price.innerHTML = "$" + currentProduct.price.toFixed(2);
	priceRow.appendChild(price);
	for (var i = 0; i < favorites.length; i++)
	{
		if (favorites[i].id != currentProduct.id) {
			price = document.createElement("td");
			price.innerHTML = "$" + favorites[i].price.toFixed(2);
			priceRow.appendChild(price);		
		}
	}
	favoritesTable.appendChild(priceRow);

	var ratingRow = document.createElement("tr");
	var rating = document.createElement("td");
	rating.innerHTML = "Average Rating";
	ratingRow.appendChild(rating);
	rating = document.createElement("td");
    for (j = 0; j < 5; j++) {
		var star = document.createElement("i");
		if (j + 0.5 < currentProduct.averageRating) {
			star.className = "fa fa-star stars";
		} else if (j + 0.5 == currentProduct.averageRating) {
			star.className = "fa fa-star-half-o stars";
		} else {
			star.className = "fa fa-star-o stars";
		}
		rating.appendChild(star);
	}
	ratingRow.appendChild(rating);
	
	for (var i = 0; i < favorites.length; i++)
	{
		if (favorites[i].id != currentProduct.id) {
			rating = document.createElement("td");
			for (j = 0; j < 5; j++) {
				var star = document.createElement("i");
				if (j + 0.5 < favorites[i].averageRating) {
					star.className = "fa fa-star stars";
				} else if (j + 0.5 == favorites[i].averageRating) {
					star.className = "fa fa-star-half-o stars";
				} else {
					star.className = "fa fa-star-o stars";
				}
				rating.appendChild(star);
			}
			ratingRow.appendChild(rating);
		}
	}
	favoritesTable.appendChild(ratingRow);

    for (var i in currentProduct.specifications) {
        var row = document.createElement("tr");
        var spec = document.createElement("td");
        var details = document.createElement("td");
        
        spec.innerHTML = i;
        details.innerHTML = currentProduct.specifications[i];
        
        row.appendChild(spec);
        row.appendChild(details);
		
		for (var j = 0; j < favorites.length; j++) {
			if (favorites[j].id != currentProduct.id) {
				details = document.createElement("td");
                if (favorites[j].specifications[i] === undefined)
                {
                    details.innerHTML = "N/A";
                } else {
                    details.innerHTML = favorites[j].specifications[i];
                }
				row.appendChild(details);
			}
		}
        favoritesTable.appendChild(row);
    }	
}

function toggleFavorite(product) {
	var favoriteIcon = document.getElementById("modalFavorite");
	var cardIcon = document.getElementById(product.id + "Favorite");
	product.favorite = !product.favorite;
	favoriteIcon.classList.toggle('fa-heart');
	favoriteIcon.classList.toggle('fa-heart-o');
	cardIcon.classList.toggle("fa-heart");
	
	if (product.favorite)
	{
		favorites.push(product);
	}
	else {
		var index = favorites.indexOf(product);
		favorites.splice(index,1);
	}
	
}

function sortProducts(sortIndex) {
    if (sortIndex == 1) {
        products.sort(dynamicSort("price"));
    } else if (sortIndex == 2) {
        products.sort(dynamicSort("-price"));
    } else if (sortIndex == 3) {
        products.sort(dynamicSort("-averageRating"));        
    } else if (sortIndex == 4) {
        products.sort(dynamicSort("brand"));
    }
	
	var productsContainer = document.getElementById("products-container");
    while (productsContainer.firstChild) {
        productsContainer.removeChild(productsContainer.firstChild);
    }
	
    for (var i = 0; i < products.length; i++) {
		var productCardId = products[i].id;
        productsContainer.appendChild(productCards[productCardId]);
    }
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function openTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("tab-content");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].classList.remove("w3-light-grey");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("w3-light-grey");
}

function toggleFilterCategory(filterCategoryId) {
    var filterCategory = document.getElementById(filterCategoryId);
    if (filterCategory.style.display == "block") {
        filterCategory.style.display = "none";
    } else {
        filterCategory.style.display = "block";        
    }
}

function filterCards(category, index) {
	console.log("filterCards"+category+index);
	filters[category][index] = !filters[category][index];
	for (var i = 0; i < products.length; i++) {
		if (!matchesPriceFilters(products[i]) || 
				!matchesReviewFilters(products[i])) {
			products[i].showOnPage = false;	
		} else {
			products[i].showOnPage = true;
		}
	}
	for (var i = 0; i < products.length; i++) {
		if (!products[i].showOnPage) {
			document.getElementById(products[i].id).style.display = "none";		
		} else {
			document.getElementById(products[i].id).style.display = "block";		
		}
	}
}

function matchesPriceFilters(product) {
	var filterMatch = false;
	// if all price filters are disabled
	if (! filters["price"][0] && !filters["price"][1] &&
			!filters["price"][2] && !filters["price"][3]) {
		filterMatch = true;
	} else if (filters["price"][0] && (product.price < 25)) {
		filterMatch = true;
	} else if (filters["price"][1] && (product.price >= 25 && product.price < 50)) {
		filterMatch = true;		
	} else if (filters["price"][2] && (product.price >= 50 && product.price < 100)) {
		filterMatch = true;		
	} else if (filters["price"][3] && (product.price >= 100)) {
		filterMatch = true;		
	}
	
	return filterMatch;
}

function matchesReviewFilters(product) {
	var filterMatch = false;
	// if all rating filters are disabled
	if (! filters["averageRating"][0] && !filters["averageRating"][1] &&
			!filters["averageRating"][2] && !filters["averageRating"][3]) {
		filterMatch = true;
	} else if (filters["averageRating"][3] && (product.averageRating >= 4)) {
		filterMatch = true;
	} else if (filters["averageRating"][2] && (product.averageRating >= 3)) {
		filterMatch = true;		
	} else if (filters["averageRating"][1] && (product.averageRating >= 2)) {
		filterMatch = true;		
	} else if (filters["averageRating"][0] && (product.averageRating >= 1)) {
		filterMatch = true;		
	}
	
	return filterMatch;
}