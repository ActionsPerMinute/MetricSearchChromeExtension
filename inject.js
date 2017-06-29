$(function(){
	if($('#treesearch').length == 0){
	    var url = document.URL
	    if(url.indexOf("METRIC_BROWSER")>-1 && $('div[id^="headercontainer-"]:not([id$="targetEl"]):not([id$="innerCt"])').length > 0) {
	        $('div[id^="headercontainer-"]:not([id$="targetEl"]):not([id$="innerCt"])').after( '<div id="treesearchdiv" style="overflow:auto;max-height:150px;"><div id="treesearchCurrent" style="color:red;font-size:70%;text-align:left"></div><input style="width:100%" id="treesearch"></div>')
	        $("#treesearch").keypress(function(event) {
				if (event.which == 13) { 
		            var appstring = "application="
		            var apppos=url.indexOf(appstring)
		            var appposend =url.indexOf("&",apppos)
		            if(appposend==-1) appposend=url.length
		            var app=url.substring(apppos+appstring.length, appposend);
					$(".treesearchfind").remove();
					if($("#treesearch")[0].value.length!=0) go(app) 
				}
	        })
	    }
	}
})

function go(app){
    $.getJSON( location.protocol+"//"+location.host+"/controller/rest/applications/"+app+"/metrics?output=JSON", function (o) {
    $(".treesearchfind").remove();
    function processNode(node, patharray, app) {
        var searchstring = $("#treesearch")[0].value
        if(searchstring.trim() == "")return;
        if(!!node.name){
			var path = patharray.join("|")+"|"+node.name
			$('#treesearchCurrent').text(path)
			if( path.toLowerCase().indexOf(searchstring.toLowerCase())>-1 && (!!node.childcount || !node.hasChildren))
	        {
	            console.log(node)
	            console.log(patharray, node.name);
	            $("#treesearch").after("<div class='treesearchfind' style='font-size:70%;text-align:left' >"+path+"\n"+"</div>");
	        }
		}
        if (node.hasChildren && !node.childcount)
        {
            patharray.push(node.name);
            //console.log(patharray);
            $.ajax({
                type: 'POST',
                url: location.protocol+'//'+location.host+'/controller/restui/metricBrowser/'+app,
                data: JSON.stringify(patharray),
                success: function(data) {
                    
                    for (i in data) {
                         data[i].parent = node;
                    };
                    node.children = data; 
                    node.childcount=1;
                    //console.log("callback", node);
                    if(data.length==0)
                    {
                        patharray.pop();
                        processNode(node, patharray, app)
                    }
                    else
                        processNode(node.children[0], patharray, app)
                },
                contentType: "application/json",
                dataType: 'json'
            });
        }
        else if (node.parent != -1 && node.parent.childcount < node.parent.children.length)
        {
            //console.log("sibling");
            nextnode = node.parent.children[node.parent.childcount]; 
            node.parent.childcount++;
            processNode(nextnode, patharray, app);
        }
        else if (node.parent != -1)
        {
            //console.log("parent");
            patharray.pop();
            nextnode = node.parent ; 
            processNode(nextnode, patharray, app);
        } 
        else { console.log(node); }
    }
    

    var root= new Object();
    for (i in o) {
         o[i].hasChildren = true;
         o[i].parent = root;
    };
    root.hasChildren = true;
    root.parent = -1;
    root.children = o;
    root.childcount = 1;
    //console.log(root,o);
    processNode(root.children[0], [], app);
})
}

