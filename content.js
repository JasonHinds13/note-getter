$(document).ready(function(){

	var link = "";

	chrome.tabs.getSelected(null, function(tab){
        link = tab.url;

        $.ajax(link, {
        	method: 'GET'
        }).done(function(res){
        	var list = "<ul>";
        	var notes = $(res).find(".modtype_resource");

        	$.each(notes, function(k, v){
        		list += "<li class='item'>";
        		list += "<input class='check' type='checkbox'/>";
        		var a = $(this).find("a").attr("href");
        		list += "<a class='note' href='"+a+"' download='"+a+"'>" + $(this).text() +"</a>";

        		list += '<br>';
        		list += '<script src="https://apis.google.com/js/platform.js" async defer></script>';
        		list += '<div class="g-savetodrive"';
                list += 'data-src="'+a+'"';
                list += 'data-filename="'+ $(this).text() +'"';
                list += 'data-sitename="OurVLE">';
                list += '</div>';

                list += "</li><br>";
        	});

        	list += "</ul>";

        	$("#main").html(list);
        	
        }).fail(function(err){
        	$("#main").html("<b>Error Occured</b>");
        });
    });

    //select all items
    $("#all").on('click', function(){
    	$(".check").click();
    });

    //download selected items
    $("#don").on('click', function(){
    	$.each($(".item"), function(){
    		var check = this.getElementsByClassName('check')[0];
    		if (check.checked == true){
    			var dl = this.getElementsByClassName('note')[0];
    			window.open(dl.href);
    		}
    	});
    });

    //save to google drive
    $("#dri").on('click', function(){
    	//
    });
});