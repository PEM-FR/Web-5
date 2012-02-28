dojo.ready(function(){
    
    var tags = {
            html5 : [],
            webgl : [],
            dojo  : [],
            javascript : [],
            perfs  : [],
            mobile  : [],
            scala  : [],
            css4  : [],
        },
        filteredNodes = []
    ;
    
    dojo.query(".tagHeader").forEach(function(tagHeader){
        var idTagHeader = dojo.attr(tagHeader, "id");
        if(idTagHeader != "all"){
            tags[idTagHeader] = dojo.query("div[data-tag-list~=\"" + idTagHeader + "\"]");
            tagHeader.innerHTML += " (" + tags[idTagHeader].length + ")";
        }
        dojo.connect(tagHeader, "onclick", dojo.hitch(this, function(){
            dojo.query(".tagHeader").forEach(function(tagHeaderUnselected){
                dojo.removeClass(tagHeaderUnselected, "selected");
            }, this);
            dojo.addClass(tagHeader, " selected");
            filteredNodes = [];
            if(idTagHeader == "all"){
                for(tagType in tags){
                    tags[tagType].forEach(function(node){
                        dojo.style(node, "display", "block");
                    }, this);
                }
            }else{
                for(tagType in tags){
                    tags[tagType].forEach(function(node){
                        if(tagType == idTagHeader){
                            filteredNodes.push(node);
                        }
                        dojo.style(node, "display", ((tagType != idTagHeader && filteredNodes.indexOf(node) == -1) ? "none" : "block"));
                    }, this);
                }
            }
        }));
    }, this);
});