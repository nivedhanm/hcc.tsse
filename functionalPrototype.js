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
    //{"amazon":"https://www.amazon.com/ARCTIC-Bluetooth-Speaker-Microphone-Hands-Free/dp/B00F4EONWS", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=9SIA4RE4KZ8056"},
    {"amazon":"https://www.amazon.com/GOgroove-Multimedia-Bluetooth-Technology-Removable/dp/B00Q3D085U", "newegg":"http://www.newegg.com/Product/Product.aspx?Item=N82E16855681005"}
];
var dummyReviews = {
    "https://www.amazon.com/Philips-BT3080B-37-Wireless-Bluetooth/dp/B010ND6PAC":{"rating":4 , "title":"Good sound for its size" , "description":"Prior to receiving this device, my primary concern was the sticker residue that previous reviewers complained about. Fortunately, Philips made the change and I had no problem removing the sticker - no stickiness left behind! The speaker is a decent size and sits nicely on my bedside table without taking up too much room. It has a certain weight to it that makes it feel like the materials aren't cheap. I really like the simplicity of the design - minimalist with only a few buttons."},
    "https://www.amazon.com/Speaker-Bluetooth-Speakers-Portable-Wireless/dp/B00ES2BQ7M":{"rating":5 , "title":"Unbiased: You can't beat the volume, functionality, or quality-for-price of this device with anything I've tested sub-$200." , "description":"First, I am not a paid or \"free sample\" reviewer for SHARKK; I bought this speaker dock all by-my-big-boy with my own money. Impressive, I know. So now for the review portion. I should start by stating that I am an audiophile... on a budget. I love accuracy. I love two-channel stereo. Yes, you heard me - I'm a purist and would rather have two quality speakers than 5, 6, or 7 speakers attempting to throw as much sound around the room as possible. I love big, warm, crisp sound. I want bass (*ahem*... that's \"bass\" not \"base,\" by the way), but I don't want as much thump as possible just to have it - I want the bass to match the original audio, not to over-amplify it. If the recording thumps, so should the speakers. I want tight mid-tones - not the muddy, mushy stuff. I want crisp, clear highs, not the tinny pinch of some speakers. By my definition, the best speakers are the ones that can match the original audio without losing or distorting content."},
    "https://www.amazon.com/Cambridge-SoundWorks-OontZ-Angle-Generation/dp/B010OYASRG":{"rating":4 , "title":"Three speakers, three different approaches" , "description":"I bought three Bluetooth speakers hoping ONE would be usable. All three ended up being keepers for different reasons. I bought the Cambridge SoundWorks Oontz Angle 3, the Anker Classic Portable, and the Boombotix REX. Portability: All three are fantastic, no real difference. If you want to nitpick, the Boombotix is the smallest, the Anker is next, and the Cambridge is the largest. But again, none of them are really different. I give an edge to the Boombotix for it's clip, it's more flexible. The clip is super hard to get open though. You aren't clipping it to anything thick. Construction and Ergonomics: All three seem durable and well built. The Anker is clearly the best of the three. It's classy, attractive, and feels substantial. And it doesn't walk itself around too much with vibration. But the On/Off switch is terrible. It's tiny and hard to use, you have to use your fingernail. The other buttons are functional, but not as easy to use as the other two. The Boombotix is sturdy and easy to use, the buttons are a little close together, but they work well. It's walks around a little on a hard table, but not terribly. You will have to watch it though, or it will eventually fall off a table. The Cambridge Angle 3 is sturdy and I love the shape. It works really well being able to either lay it down or stand it up. The function buttons are easy to use. The On/Off button is not great, it's too small and in an obscure location. So much so that they have to put a little sticker pointing to it. The rubber end caps are a mixed blessing. I think they will help protect it, but they get really dirty really fast. They pick up every tiny little bit of dust.Read more"},
    "https://www.amazon.com/JBL-Portable-Splashproof-Bluetooth-Speaker/dp/B0147JTPY6":{"rating":4 , "title":"I am disappointed with the lighting effects" , "description":"Sound quality is much improved and that is the main reason this has been purchased however; I am disappointed with the lighting effects. Awful, just awful compared to the original. I hope JBL is paying attention. UPDATE YOUR APP!"},
    "https://www.amazon.com/Philips-SB365B-37-Bluetooth-Rechargeable/dp/B0136RBIWM":{"rating":4 , "title":"Lacks rechargeable battery but sounds good" , "description":"bThis is an interesting product at this price range. To begin with, this does not come with a rechargeable battery. Instead, you need 4 AA batteries for portable use. I did test this speaker with Energizer Rechargeable AA batteries, and the first thing I noticed was that the volume got throttled significantly. On battery-power, this speaker is not very loud, and in a noisy environment, this speaker will be hard to hear. Plugged into a wall outlet, this speaker is pretty loud and can easily fill medium-sized spaces. Running on rechargeable AA batteries, I was able to get about two hours of music playback. The rechargeable batteries I used for the battery-life test were fully charged but not brand new. So with brand new rechargeable batteries, I would expect to get better results. The sound is pretty nice on these speakers. This speaker definitely does a good job of representing a wide dynamic range and delivers sound comparable to $200 speakers I've tested. Unlike the smaller form-factor speakers found in the $100 price category, this is a rather large bluetooth speaker. It's about the same size as the Big Jambox. The larger form factor does allow for larger drivers, and the sound definitely benefits from this. With no battery brick in the enclosure, this speaker is pretty light--0.5kg (just over 1 lb). The interface is rather simple. There is a power button, bluetooth scan button, and two volume buttons. This speaker does support NFC connectivity. Just tap your phone to the NFC logo to connect to the speaker. For those unfamiliar with NFC, NFC just negotiates the handshake between your device and the speaker. The sound is still transmitted using bluetooth. One major plus for this speaker is bluetooth 4.0 support"},
    "https://www.amazon.com/Philips-BT2200B-27-Waterproof-Technology/dp/B00RK3T3OY":{"rating":4 , "title":"A+ waterproofing, A- sound, B controls" , "description":"bBluetooth speakers, being a dime-a-dozen nowadays, need to have something unique to stand out from the pack. For this Shoqbox, it is clearly it's waterproofing, which allows it to be more than splashed or sprinkled - it can be submerged briefly and even put face-up and allowed to float. That makes it superior to most other \"water-resistant\" shower speakers which are really just splash-proof. However, this speaker is not perfect - while it does have on-speaker controls, you can only control volume and answer calls. Many speakers (notably the Philips ShoqBox 7300, and 7200)also have play/pause/FF/REW controls (without any extra buttons), and you can also usually trigger a call (or Siri) from the speaker as well. The Bluetooth range is great (I was able to walk the full 30 feet without really getting any drops, I even went around a wall), so it's nice to be able to just pick up the speaker and control the music from there in case the music source has wandered off. I can even see a case where the speaker is floating in the pool with me and my phone is safely high and dry and I want to skip a track and will sorely miss having those controls at my fingertips. The nice thing is that it also sounds remarkably good and is very loud - surprisingly so, for a speaker of this size. It's about the size of an avocado and just about as heavy. For comparison, I have the Philips DOT, which is bigger but less waterproof. That one has a touch more bass, but is not louder and I think sounds more muffled. I also have the Philips Soundshooter, which is about the same size as this one, but is lighter and not nearly as loud, and not officially waterproof at all (and discontinued)."},
    //"https://www.amazon.com/ARCTIC-Bluetooth-Speaker-Microphone-Hands-Free/dp/B00F4EONWS":{"rating":5 , "title":"This is a very good speaker that is well made with good quality sound output!" , "description":"This is a very nice Bluetooth stereo speaker. It is available in multiple colors but my unit was black. The speaker contains a lithium battery that has 1200 mAh capacity and you can charge it in about 2 or 3 hours to get a full charge. Fully charged it has a play time of 8 hours and a standby time of 700 hours. You can charge the speaker with your computer's USB port or with any USB AC wall charger that you own. The speaker can be paired with your smart device using NFC (Near Field Communication), USB 4.0 or using the auxiliary cable that is provided. The speaker comes with a two year manufacturer's warranty. Using the Bluetooth connection on an iPhone 5S I can even tell the battery charge level of the speaker as it is shown on the front of the phone's display. On the end of the speaker you will find the on/off switch, the input charging port and the auxiliary audio input port. The exterior of the case has a rubberized protective layer that is resistant to moisture, dust, and shock. I show that in my video for your information. The layer is very resilient and can protect the speaker from being dropped. It is about 0.225 inches thick and it is wrapped around 4 sides of the speaker but not the front and back grill areas. On the front of the speaker you have the volume up and down buttons that can also act as the skip forward and skip back buttons. There is also a center button that is a multifunction button. In my video I pair my iPhone 5S with the speaker and I show how it is done. It was fast and easy to accomplish. You turn the power on and then you press the multifunction button for 8 seconds and a LED will begin plashing red and blue."},
    "https://www.amazon.com/GOgroove-Multimedia-Bluetooth-Technology-Removable/dp/B00Q3D085U":{"rating":4 , "title":"Really Good But Could Be Great Without the Mini USB Plug" , "description":"I owned a previous version for quite a long time but found I didn't use it all that much mostly because I never felt like messing with the wires that model required. I thought I might try a newer bluetooth version and see if I used it more. The price was pretty reasonable after all.\nPros:\nSounds REALLY good for such a compact and portable speaker.\nSimulated wood grain finish looks really nice.\nBluetooth and NFC pairing works well with my Galaxy Note 4.\nCons: (not many)\nUSES older out of date mini usb not micro usb most phones now use. (biggest issue by far for me)\nNo SD card slot anymore.\nThe great sound and nice looks really make this an excellent purchase despite the minor little things that bug me. My older model had a SD card slot in addition to the USB plug for playing files. Even though I NEVER used this I still felt a slight twinge of loss when I took it out of the box and first noticed that slot not cut out for use. The HUGE disappointment though was seeing the mini usb plug still there for charging. If they had updated this to micro usb this would have been five stars for sure. Everything else in my life all charges on micro usb. phones, tablets, whatever. The last thing I wanted was to have to keep track of one special cord for just this one device. I have several plugs in the car already, it would have been nice to not have to keep this speakers special mini usb cord with it all the time where ever I take it. Perhaps minor but still annoying.\nBottom line though: Great sound from a small, inexpensive package that looks good and pairs up easy with bluetooth and NFC. Just keep special old style mini usb cable handy for charging once in a while and you'll be 4 stars worth of happy just like me. :)"}
};

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

        // due to issues with some reviews containing embeded images and videos and some pages
        // not returning reviews, we have set up dummy reviews taken directly from the product page
        products[i].reviews.push(dummyReviews[products[i].amazonUrl]);

/*         var reviews = unwrappedMetadata["reviews"];

        for (j = 0; j < reviews.length; j++) {
            var rating = Number(reviews[j]["rating"].substring(0, 1));
            var title = reviews[j]["title"];
            var description = reviews[j]["description"];

            products[i].reviews.push({"rating":rating, "title":title, "description":description});
        } */

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
    //addTooltip(container, "Right&nbsp;click&nbsp;to&nbsp;view/close&nbsp;options&nbsp;menu");

    var imgContainer = document.createElement("div");
    imgContainer.className = "product-image-container";
		//addTooltip(imgContainer, "Right&nbsp;click&nbsp;to&nbsp;view/close&nbsp;options&nbsp;menu");

    var image = document.createElement("img");
    image.src = product.imageUrl;
		addTooltip(image, "Right&nbsp;click&nbsp;to&nbsp;view/close&nbsp;options&nbsp;menu");

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

    productCard.onmouseenter = (function() {
        var currentId = productCard.id;
        return function() {
            openCircularMenu(currentId + "Menu");
        }
    })();

		productCard.onmouseleave = (function() {
        var currentId = productCard.id;
        return function() {
					closeCircularMenu()
				}
		})();


    var productCardId = productCard.id;
    productCards[productCardId] = productCard;


    productsContainer.appendChild(productCard);

}

function buildCircularMenu(i) {
	var currentProduct = products[i];
	var circularMenu = document.createElement("div");
	circularMenu.className = "circular-menu";

	var circle = document.createElement("div");
	circle.className = "circle";
	circle.id = "product" + i + "Menu";

	var favoriteIcon = document.createElement("i");
	favoriteIcon.className = "fa";
	if (currentProduct.favorite) {
		favoriteIcon.className += " fa-heart fa-2x";
	} else {
		favoriteIcon.className += " fa-heart-o fa-2x";
	}
	//favoriteIcon.className = "fa fa-heart-o fa-2x";
	addTooltip(favoriteIcon, "Add&nbsp;to&nbsp;favorites");

	var videos = document.createElement("i");
	videos.className = "fa fa-film fa-2x";
	addTooltip(videos, "View&nbsp;videos");

	var reviews = document.createElement("i");
	reviews.className = "fa fa-star fa-2x";
	addTooltip(reviews, "Read&nbsp;reviews");

	var specifications  = document.createElement("i");
	specifications.className = "fa fa-list-ul fa-2x";
	addTooltip(specifications, "View&nbsp;specifications");

	var compare  = document.createElement("i");
	compare.className = "fa fa-exchange fa-2x";
	addTooltip(compare, "View&nbsp; comparison");

	var menuItems = [favoriteIcon, compare, videos, reviews, specifications];
	for (var j = 0, l = menuItems.length; j < l; j++)
	{
		menuItems[j].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*j*Math.PI)).toFixed(4) + "%";
		menuItems[j].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*j*Math.PI)).toFixed(4) + "%";
		menuItems[j].onclick = (function() {
			//var currentProduct = products[i];
			var iconId = 4-j;
			return function() {
				if (iconId==4) {
								toggleFavorite(currentProduct)
								//openModal(currentProduct, iconId);
								console.log("Test"+iconId);
							}
				else {
						openModal(currentProduct, iconId);
						console.log("potato"+iconId);
				}
			}
		})();
	}

	circle.appendChild(favoriteIcon);
	circle.appendChild(videos);
	circle.appendChild(reviews);
	circle.appendChild(specifications);
	circle.appendChild(compare);
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
