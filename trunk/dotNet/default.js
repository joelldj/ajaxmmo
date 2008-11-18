$(document).ready(function(){
    jQuery('a[rel*=rounded]').corner("25px");
    jQuery('div[rel*=rounded]').corner("notch");
    
    $.getJSON('jsonbackend.aspx?getmap=1', function(json){
     jQuery.each(json, function(i, val) {       
        $("<div class='tile'>").appendTo("body").html("hi").click(function(){
                $.getJSON('jsonbackend.aspx?id=' + val.Id);
            });
        });
    }); 
});