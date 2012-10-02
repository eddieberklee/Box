// Steven Buccini, Nikita Kouevda, Eddie Lee
// 2012/10/02

var data = [["Overall",-20],["Overall",-40],["Overall",-39],["Overall",-80],["Overall",-100],["Economy",40],["Health Care", 70]];
$(document).ready(function() {
    
    for (i=0; i<data.length; i++) {
        var temp = data[i][0];
        //$(wrapper).append('<div class="progress" id="' + temp + '"></div>'); //couldn't insert other divs into this one, but keeping it to improve readability later
        if (data[i][1] < 0){
                //couldn't get this method to work, so hacking putting it all into one statement.  Now assigning them to strings and putting them in one statement
                //$(wrapper).prepend('<div class = "bar bar-warning" style="width:' + String(50+data[i][1]) +'%;"></div>'); 
                //$(wrapper).append('<div class = "bar bar-danger" style="width:' + String(-1*data[i][1]) +'%;"></div>');
                
                console.log(data[i][1]);
                var padding = '<div class = "bar bar-warning" style="width:' + String(50+(data[i][1]/2)) +'%;"></div>';
                var republicanbar = '<div class = "bar bar-danger" style="width:' + String(-1*(data[i][1]/2)) +'%;"></div>';               
                $(wrapper).append('<div id = "' +temp+ 'wrapper"><h2><center>'+temp+'</center></h2><div class="progress" id="' + temp + '">'+ padding + republicanbar + '</div></div>');
            }
        else if(data[i][1] > 0)
            {
                console.log(data[i][1]);
                //see above comments
                //$(wrapper).prepend('<div class = "bar bar-warning" style="width: 50%;"></div>');
                //$(wrapper).append('<div class = "bar bar-success" style="width:' + String(data[i][1]) +'%;"></div>');
                var padding = '<div class = "bar bar-warning" style="width: 50%;"></div>';
                var democratbar = '<div class = "bar bar-success" style="width:' + String(data[i][1]/2) +'%;"></div>';
                $(wrapper).append('<div id = "' +temp+ 'wrapper"><h2><center>'+temp+'</center></h2><div class="progress" id="' + temp + '">'+ padding + democratbar + '</div></div>');
            }
        
        }
        
     
});    

