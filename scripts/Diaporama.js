dojo.provide("Diaporama");

dojo.require("dijit._Widget");
dojo.require("dojo.fx");
dojo.require("dojo.fx.easing");

dojo.declare("Diaporama", [dijit._Widget], {

    indice: 0,
    width: 580,
    timeout: null,
    slide: null,
    node: null,
    images: null,
    nbDiapo: 1,
    diaporama: null,
	buildRendering: function(){
		this.inherited(arguments);
		
		this.node = dojo.byId(this.node);
		this.diaporama = dojo.create("div",{
			"class": "diaporama"
		}, this.node);

		var boutons = dojo.create("div",{
			"class": "diaporamaBoutons"
		}, this.node, "after");
		
		var current = "current";
		dojo.forEach(this.images, function(image, i){
			var slide = dojo.create("div", {
				"class": "slide",
				id: "diaporama" + this.nbDiapo, 
				style: "background:url(" + image + ") no-repeat"
			}, this.diaporama);
			
			var bouton = dojo.create("div", {
				"class": "bouton " + current,
				id: "diaporamaBouton" + this.nbDiapo
				
			}, boutons);
			current = "";
			
			var numDiapo = this.nbDiapo; 
			this.connect(
				bouton,
				"onclick",
				dojo.hitch(this, function(){
					this.rewind(numDiapo - 1);
				})
			);
			this.nbDiapo++;
		}, this);
	},
	
	postCreate: function(){
		this.inherited(arguments);

        this.slideArgs = {
            node: this.diaporama,
            delay: 0,
            duration: 2000,
            unit: "px",
            onEnd: dojo.hitch(this, function(){
                this.indice++;
                if (! dojo.byId("diaporama" + (this.indice +1))) {
                    this.indice = 0;
                }
                this.timeout = setTimeout(
                	dojo.hitch(
                		this,
                		function(){
                			this.startDiaporama();
                		}
                	), 4000
                );		
            }),
            easing: dojo.fx.easing["backOut"]
        };

        this.slide = dojo.fx.slideTo(this.slideArgs);
        this.timeout = setTimeout(
        	dojo.hitch(
        		this,
        		function(){
        			this.startDiaporama();
        		}
        	), 1000
        );		
	},
	
    startDiaporama: function(){
    	
        dojo.toggleClass(dojo.query('.current')[0], "current");
        dojo.toggleClass("diaporamaBouton" + (this. indice +1), "current");
        this.slide.properties.left = (- this.indice * this.width).toString();
        this.slide.play();            
    },

    rewind: function(item){

        clearTimeout(this.timeout);
        this.indice = item;
        this.slide.stop();
        this.startDiaporama();
    }
	
});
