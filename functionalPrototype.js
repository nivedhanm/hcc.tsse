var currentMenuId;
var menuOpen = false;
var favorites = [];
var products = [];
var productObj = {
    brand: "AXESS",
	model: "SPBT1031-RD",
	price: 129.99, 
	imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41u8vEGE9QL.jpg",
	averageRating: 4, 
	reviews: [
        {"rating":3,
		"title":"Better options available for less money",
		"description":"Disappointing, for several reasons:1. Vocals are kind of muddy; sounds like the speaker is playing from inside of a cardboard box (as if the speaker was put in a box & then put on play...weird-sounding like that, like it's a bit boxed in).2. Nearly zero bass. I'm really surprised at how little bass there is; I've built Sonosubs before (subwoofers in tubes) & would have thought it would have had at least SOME bass or mid-bass in this. Nope. Stuff that's a bit more acoustic like George Ezra's \"Budapest\" sounds pretty good, but throwing on something like Soulja Boy is pretty disappointing. All that volume & no thump :(3. Doesn't get nearly as loud as I'd like. I was hoping to use this for outdoor movies with a mini LED Android projector, but the volume combined with the lack of bass is just disappointing. My little palm-sized Bluetooth speakers are nearly as loud as this is. I think part of the problem is that there's a speaker on each end, so you don't really get the full effect of a left & right speaker if you place it horizontally (the manual shows it in both horizontal & vertical configurations, with the vertical pointing the control button side up). I've found it actually sounds better standing up vertical in kind of an omni-speaker setup - not to compare it to a high-end Linkwitz, but kind of the same idea where it can at least disperse the sound a bit better. Oddly enough, it sounds best with the control button side down - gives it a throatier sound (especially for male voices, like Hozier's \"Take me to church\"), which actually points the drivers down & the \"sub\" up.On the plus side...it does work, it's a cool design (feels fairly durable!), and the price is pretty decent.Read more"},
        {"rating":4,
		"title":"Better options available for less money",
		"description":"Disappointing, for several reasons:1. Vocals are kind of muddy; sounds like the speaker is playing from inside of a cardboard box (as if the speaker was put in a box & then put on play...weird-sounding like that, like it's a bit boxed in).2. Nearly zero bass. I'm really surprised at how little bass there is; I've built Sonosubs before (subwoofers in tubes) & would have thought it would have had at least SOME bass or mid-bass in this. Nope. Stuff that's a bit more acoustic like George Ezra's \"Budapest\" sounds pretty good, but throwing on something like Soulja Boy is pretty disappointing. All that volume & no thump :(3. Doesn't get nearly as loud as I'd like. I was hoping to use this for outdoor movies with a mini LED Android projector, but the volume combined with the lack of bass is just disappointing. My little palm-sized Bluetooth speakers are nearly as loud as this is. I think part of the problem is that there's a speaker on each end, so you don't really get the full effect of a left & right speaker if you place it horizontally (the manual shows it in both horizontal & vertical configurations, with the vertical pointing the control button side up). I've found it actually sounds better standing up vertical in kind of an omni-speaker setup - not to compare it to a high-end Linkwitz, but kind of the same idea where it can at least disperse the sound a bit better. Oddly enough, it sounds best with the control button side down - gives it a throatier sound (especially for male voices, like Hozier's \"Take me to church\"), which actually points the drivers down & the \"sub\" up.On the plus side...it does work, it's a cool design (feels fairly durable!), and the price is pretty decent.Read more"}
    ],
	favorite: false,
	specifications: {
		"productDimensions":"11.4 x 6.2 x 6.6 inches",
		"itemWeight":"3.5 pounds",
		"manufacturer":"AXESS",
		"batteries":"1 Lithium ion batteries required. (included)"
	}
};

function specifications(key, value) {
    
}

function product(brand, model, price, imageUrl, averageRating, reviews, favorite, specifications) {
    this.brand = brand;
	this.model = model;
	this.price = price;
	this.imageUrl = imageUrl;
	this.averageRating = averageRating;
	this.reviews = reviews;
	this.favorite = favorite;
	this.specifications = specifications;
}

for (i = 0; i < 5; i++)
{
	products.push(new product("AXESS", "SPBT1031-RD", 129.99 - (10 * i), 
		"https://images-na.ssl-images-amazon.com/images/I/41u8vEGE9QL.jpg",
		i+1, productObj.reviews, false, productObj.specifications));
	console.log(products[i]);
}

window.onload = function() {
    var productsContainer = document.getElementById("products-container");
    for (i = 0; i < products.length; i++) {
		var currentProduct = i;
        var productCard = document.createElement("div");
        productCard.className += "w3-col one-col two-col three-col w3-card-2 w3-white";
        productCard.style.height = "300px";
        productCard.style.margin = "15px";
        productCard.style.minWidth = "350px";
        productCard.style.width = "100%-285px";
        productCard.style.position = "relative";
        
        productCard.id = "product" + i;

        var container = document.createElement("div");
        container.className += "w3-container w3-center w3-margin";
        container.style.position = "absolute";
        container.style.top = "0px";
        container.style.left = "0px";
        container.style.right = "0px";

        var imgContainer = document.createElement("div");
        imgContainer.className += "w3-margin";
        imgContainer.style.height = "150px";

        var image = document.createElement("img");
        image.src = products[currentProduct].imageUrl;
        image.style.maxWidth = "300px";
        image.style.maxHeight = "150px";

        var productName = document.createElement("div");
        productName.className += "w3-xlarge w3-margin";
        productName.appendChild(document.createTextNode(
                products[currentProduct].brand + " " + products[currentProduct].model));

        var starAndPriceContainer = document.createElement("div");
        starAndPriceContainer.className += "star-and-price";
        
        var stars = document.createElement("div");
        stars.className += "w3-large";
        stars.style.float = "left";
        stars.style.marginLeft = "30px";
        stars.style.color = "rgb(255, 153, 0)";

        for (j = 0; j < 5; j++)
        {
            var star = document.createElement("i");
            if (j < products[currentProduct].averageRating)
            {
                star.className += "fa fa-star";
            }
            else
            {
                star.className += "fa fa-star-o";
            }
            stars.appendChild(star);
        }

        var price = document.createElement("div");
        price.className += "w3-large";
        price.style.float = "right";
        price.style.marginRight = "30px";
        price.appendChild(document.createTextNode("$"+products[currentProduct].price.toFixed(2)));
        
        var circularMenu = document.createElement("div");
        circularMenu.className += "circular-menu";
        
        
        var circle = document.createElement("div");
        circle.className += "circle";
        circle.id = "product" + i + "Menu";
        
        var favorite = document.createElement("i");
        favorite.className += "fa fa-heart-o fa-2x";
		favorite.style.color = "red";
        
        var videos = document.createElement("i");
        videos.className += "fa fa-film fa-2x";
        
        var reviews = document.createElement("i");
        reviews.className += "fa fa-star fa-2x";
        reviews.style.color = "rgb(255, 153, 0)";

        var specifications  = document.createElement("i");
        specifications.className += "fa fa-list-ul fa-2x";
        
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

        imgContainer.appendChild(image);
        container.appendChild(imgContainer);
        container.appendChild(productName);
        starAndPriceContainer.appendChild(stars);
        starAndPriceContainer.appendChild(price);
        container.appendChild(starAndPriceContainer);
        productCard.appendChild(container);
        productCard.appendChild(circularMenu);
        productsContainer.appendChild(productCard);
        
        productCard.oncontextmenu = (function() {
            var currentId = productCard.id;
            return function() {
                openCircularMenu(currentId + "Menu");
            }
        })();
    }
};

function openCircularMenu(menuId)
{
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

function openModal(currentProduct, menuItem)
{
    document.getElementById(currentMenuId).classList.toggle('open');
    currentMenuId = null;
    document.getElementById("id01").style.display="block";
	populateModal(currentProduct);
	document.getElementsByClassName("tablink")[menuItem].click();
}

function populateModal(currentProduct)
{
	console.log(currentProduct.averageRating);
}

function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].classList.remove("w3-light-grey");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.classList.add("w3-light-grey");
}

function myAccFunc(accordionMenu) {
    var x = document.getElementById(accordionMenu);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-grey";
    } else {
        x.className = x.className.replace(" w3-show", "");
        x.previousElementSibling.className =
        x.previousElementSibling.className.replace(" w3-grey", "");
    }
}