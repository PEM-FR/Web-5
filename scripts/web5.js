
dojo.require("dojo.fx");
dojo.require("dojo.fx.easing");
dojo.require("dojox.fx.ext-dojo.complex");
dojo.require("dojo.window");

dojo.ready(function(){
	var sessionLocale = sessionStorage.getItem('locale'),
	    pageLocale = location.pathname.match(/\/en\//) ? "en" : "fr",
		djLocale = (((dojo.locale.length > 2) ? dojo.locale.substring(0, 2) : dojo.locale) == "fr") ? "fr" : "en",
		currentPage = (location.pathname == "/" || location.pathname == "/en/") 
			? "" 
			: (djLocale != "fr") 
				? location.pathname.substring(location.pathname.lastIndexOf("/") + 1) 
				: location.pathname.substring(1);
	// console.log("curentPage = ", currentPage);
	// if we are on the homepage without locale defined,
	// we redirect to the right homepage
	if(null == sessionLocale && pageLocale != djLocale && djLocale != "fr"){
		window.location.href = "/en/" + currentPage;
	}else{

		// depending on the page we are on, we might want need to display a form or not
		switch(currentPage){
			case "":
        		var viewport = dojo.window.getBox(dojo.doc),
        	    anim8target = dojo.byId("logo");
        		dojo.animateProperty({
        		    // use the bounceOut easing routine to have the box accelerate
        		    // and then bounce back a little before stopping
        		    easing: dojo.fx.easing.bounceOut,
        		    duration: 1000,
        		    node: anim8target,
        		    properties: {
        		        // calculate the 'floor'
        		        // and subtract the height of the node
        		        // to get the distance from top we need
        		        top: { start: -200, end: -45 }
        		    },
                    beforeBegin: function(){
                      anim8target.style.display = "block";
                    }
        		}).play();
                // let's load a few speakers randomly from the list
                var speakerList = [{
                        name: "Robert Nyman",
                        theme: "Html5",
                        topic: "Open Web and what it means",
                        link: "RobertNyman",
                        image: "robertnyman.jpg"
                    }, {
                        name: "Michal Budzynski",
                        theme: "Html5",
                        topic: "Can we now replace Flash ?",
                        link: "MichalBudzynski",
                        image: "michal-budzynski.jpg"
                    }, {
                        name: "Dylan Schiemann",
                        theme: "Dojo, Mobile",
                        topic: "Modular, Mobile, and Reinventing Web App Development",
                        link: "DylanSchiemann",
                        image: "dylanschiemann.jpeg"
                    }, {
                        name: "Morten Nielsen",
                        theme: "Html5, Mobile",
                        topic: "Mobile offline capabilities thanks to HTML5 and JavaScript",
                        link: "MortenNielsen",
                        image: "mortennielsen.png"
                    }, {
                        name: "Peter Svensson",
                        theme: "Dojo, Html5",
                        topic: "How to build large web applications in client-side JavaScript",
                        link: "PeterSvensson",
                        image: "psvensson.png"
                    }, {
                        name: "Karolina Szczur",
                        theme: "CSS4",
                        topic: "The Future is Now!",
                        link: "KarolinaSzczur",
                        image: "karolina_szczur.png"
                    }, {
                        name: "Jerome Etienne",
                        theme: "WebGL",
                        topic: "How to make games with WebGL !",
                        link: "JeromeEtienne",
                        image: "jetienne.jpg"
                    }, {
                        name: "Jakub Siemiatkowski",
                        theme: "WebGL",
                        topic: "Why WebGL is the future and why this doesn't suck?",
                        link: "JakubSiemiatkowski",
                        image: "jakub_siemiatkowski.jpg"
                    }, {
                        name: "Sam Foster",
                        theme: "Dojo",
                        topic: "Lessons we can learn and carry with us from the Dojo Toolkit",
                        link: "SamFoster",
                        image: "sfoster.png"
                    }, {
                        name: "Arnout Kazemier",
                        theme: "JavaScript",
                        topic: "Pushing the web forward with Socket.IO",
                        link: "ArnoutKazemier",
                        image: "3rdEden.png"
                    }, {
                        name: "Christophe Jolif",
                        theme: "Dojo, Mobile",
                        topic: "Enabling the mobile Web for a Dojo component",
                        link: "ChristopheJolif",
                        image: "cjolif.png"
                    }, {
                        name: "Kamil Trebunia",
                        theme: "WebGL",
                        topic: "General patterns to deal with complex applications",
                        link: "KamilTrebunia",
                        image: "kamil_trebunia.jpg"
                    }, {
                        name: "Maciej Malecki",
                        theme: "JavaScript",
                        topic: "How about moving your templates to the client-side?",
                        link: "MaciejMalecki",
                        image: "maciejmalecki.jpg"
                    }, {
                        name: "Philip Tellis",
                        theme: "JavaScript, Performance",
                        topic: "Messing with JavaScript and the DOM to measure various Network Characteristics",
                        link: "PhilipTellis",
                        image: "philiptellis.jpg"
                    }, {
                        name: "Paul Panserrieu",
                        theme: "Html5, Mobile",
                        topic: "How can we build a dead simple multitouch mobile app based on web standards?",
                        link: "PaulPanserrieu",
                        image: "paulpanserrieu.png"
                    }, {
                        name: "Patrick Ruzand",
                        theme: "Html5, Dojo, WebGL, Mobile",
                        topic: "dojox.gfx, the fundation for your cross-browser visualization needs",
                        link: "PatrickRuzand",
                        image: "patrickruzand.jpg"
                    }, {
                        name: "Pierre Spring",
                        theme: "Html5, JavaScript, Performance",
                        topic: "Frontend Performance Optimization",
                        link: "PierreSpring",
                        image: "pierrespring.jpg"
                    }, {
                        name: "Andrew J Baker",
                        theme: "Html5, JavaScript, Performance",
                        topic: "Holistic Web app design and development with HTML5",
                        link: "AndrewJBaker",
                        image: "andrewbaker.png"
                    }, {
                        name: "Chris Barrett",
                        theme: "Dojo",
                        topic: "Changing the game with dgrid and eventd",
                        link: "ChrisBarrett",
                        image: "chrisbarrett.jpg"
                    }, {
                        name: "Charlie Robbins",
                        theme: "JavaScript, Performance",
                        topic: "Scaling Isomorphic Javascript Applications",
                        link: "CharlieRobbins",
                        image: "charlierobbins.png"
                    }];
                    // then we choose at random 9 speakers ?
                    shuffle = function(v){
                        for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
                        return v;
                    };
                    speakerList = shuffle(speakerList);
                    var thumbnail = dojo.byId('speakersThumbnail');
                    for(var i = 0; i < speakerList.length; i++){
                        var divContent = "<a href=\"" + location.pathname + "speakers.html#" + speakerList[i].link + "\" title=\"" 
                            + speakerList[i].name + " (" + speakerList[i].theme + ") : " + speakerList[i].topic + "\">" 
                            + "<br/><img src=\"" + (pageLocale == "en" ? "../" : "") + "images/avatars/small/" + speakerList[i].image + "\" alt=\"" + speakerList[i].topic + "\"/></a>",
                            divSpeaker = dojo.create("div", {innerHTML: divContent, "class" : "speakersThumbnail"});
                        thumbnail.appendChild(divSpeaker);
                    }
                break;
			case "speakers":
			case "partners":
			case "about":
			default:
		}
		
	}
	var soleil = dojo.byId("soleil");
	dojo.connect(soleil, "onmouseover", this, function(){
		dojo.removeClass(soleil, "soleil");
		dojo.addClass(soleil, "soleilJaune");
		var anim8target = soleil.firstChild;
		dojo.animateProperty({
			duration: 5000,
			node: anim8target,
			properties: {
				// calculate the 'floor'
				// and subtract the height of the node
				// to get the distance from top we need
				"transform": { start: "rotate(0deg)", end: "rotate(360deg)" },
				"-webkit-transform": { start: "rotate(0deg)", end: "rotate(360deg)" },
				"-moz-transform":  { start: "rotate(0deg)", end: "rotate(360deg)" },
				"-o-transform":  { start: "rotate(0deg)", end: "rotate(360deg)" },
				"-ms-transform":  { start: "rotate(0deg)", end: "rotate(360deg)" }
//				top: { start: -200, end: -45 }
			}
		}).play();
	});
	dojo.connect(soleil, "onmouseout", this, function(){
		dojo.removeClass(soleil, "soleilJaune");
		dojo.addClass(soleil, "soleil");
	});
});