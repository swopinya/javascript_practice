(function(){
    window.onclick = function(e){
        var element = document.elementFromPoint(e.x, e.y);
        var tag = element.tagName;

        var attrs = Array.prototype.map.call(element.attributes, function(i){
            return {
                name: i.name,
                value: i.nodeValue
            }
        });

        console.log(attrs);

        //var attrs = Array.prototype.slice.call(element.attributes, 0);
        //console.log(tag);
        //console.log(attrs);
        //attrs.forEach(function(i){
        //    console.log(i);
        //});

        //console.log(tag, attrs);
    }
})();
