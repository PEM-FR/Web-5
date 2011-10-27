
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-26108024-1']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

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
                break;        		
			case "speakers":
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