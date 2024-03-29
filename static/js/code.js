// Steven Buccini, Nikita Kouevda, Eddie Lee
// 2012/10/02

$(function() {
    var overall_score = 0;
    var categories = ["Foreign Policy", "Economy"];
    var scores = {
        "Economy": 0,
        "Foreign Policy": 0,
    };

    $(".slider").slider({
        min: -100,
        max: 100,
    });

    $("#next_button").click(function() {
        if (categories.length == 1) {
            var data = scores;

            for (i = 0; i < data.length; i++) {
                var temp = data[i][0];
                if (data[i][1] < 0){
                    var padding = '<div class = "bar bar-warning" style="width:' + String(50+(data[i][1]/2)) +'%;"></div>';
                    var republicanbar = '<div class = "bar bar-danger" style="width:' + String(-1*(data[i][1]/2)) +'%;"></div>';
                    $(wrapper).append('<div id = "' +temp+ 'wrapper"><h2><center>'+temp+'</center></h2><div class="progress" id="' + temp + '">'+ padding + republicanbar + '</div></div>');
                } else if(data[i][1] > 0) {
                    var padding = '<div class = "bar bar-warning" style="width: 50%;"></div>';
                    var democratbar = '<div class = "bar bar-success" style="width:' + String(data[i][1]/2) +'%;"></div>';
                    $(wrapper).append('<div id = "' +temp+ 'wrapper"><h2><center>'+temp+'</center></h2><div class="progress" id="' + temp + '">'+ padding + democratbar + '</div></div>');
                }
            }

            $("#batting").html("<div id='wrapper'></div>");
        }

        var send_category = categories.pop();

        $("#batting").css("opacity","0");
        $("#batting").css("-webkit-transition","all 1s");

        var sliders = [];
        $(".slider").each(function(index) {
            sliders.push($(this).children("a").css("left"));
        });

        var box1_left = $(".box-0:nth-of-type(1) .quote").attr("person");
        var box2_left = $(".box-1:nth-of-type(1) .quote").attr("person");
        var box3_left = $(".box-2:nth-of-type(1) .quote").attr("person");

        sliders[0] = sliders[0].replace(/\%/, "");
        sliders[1] = sliders[1].replace(/\%/, "");
        sliders[2] = sliders[2].replace(/\%/, "");

        if (box1_left == "Romney") {
            sliders[0] = 100 - parseInt(sliders[0]);
        } else {
            sliders[0] = parseInt(sliders[0]);
        }

        if (box2_left == "Romney") {
            sliders[1] = 100 - parseInt(sliders[1]);
        } else {
            sliders[1] = parseInt(sliders[1]);
        }

        if (box3_left == "Romney") {
            sliders[2] = 100 - parseInt(sliders[2]);
        } else {
            sliders[2] = parseInt(sliders[2]);
        }

        var total = sliders[0] + sliders[1] + sliders[2];
        scores[send_category] = total / 3;

        $.ajax({
            type: 'GET',
            url: "/quotes",
            data: {category:send_category},
            success: function(result) {
                // FIXME: this is very unsafe; find a proper way to pass data
                var singleDouble = result.replace(/\'/g, "\"");
                var unicodeStr = singleDouble.replace(/u\"/g, "\"");
                var quoteNumbers = unicodeStr.replace(/(\d)\.(\d),/g, "\"$1.$2\",");
                var objectID = quoteNumbers.replace(/ObjectId\(\"(.*?)\"\)/g, "\"$1\"");
                var obj = $.parseJSON(objectID);

                var pair1 = obj["0"];
                var pair1_quote1 = pair1["0"];
                var pair1_quote2 = pair1["1"];
                var pair2 = obj["1"];
                var pair2_quote1 = pair1["0"];
                var pair2_quote2 = pair1["1"];
                var pair3 = obj["2"];
                var pair3_quote1 = pair1["0"];
                var pair3_quote2 = pair1["1"];

                $("h2").text(send_category);

                $(".box-0:nth-of-type(1) .quote").text("\"" + pair1_quote1["quote"] + "\"");
                $(".box-0:nth-of-type(2) .quote").text("\"" + pair1_quote2["quote"] + "\"");
                $(".box-1:nth-of-type(1) .quote").text("\"" + pair2_quote1["quote"] + "\"");
                $(".box-1:nth-of-type(2) .quote").text("\"" + pair2_quote2["quote"] + "\"");
                $(".box-2:nth-of-type(1) .quote").text("\"" + pair3_quote1["quote"] + "\"");
                $(".box-2:nth-of-type(2) .quote").text("\"" + pair3_quote2["quote"] + "\"");

                $(".box-0:nth-of-type(1) .quote").attr("person",pair1_quote1["person"]);
                $(".box-0:nth-of-type(2) .quote").attr("person",pair1_quote2["person"]);
                $(".box-1:nth-of-type(1) .quote").attr("person",pair2_quote1["person"]);
                $(".box-1:nth-of-type(2) .quote").attr("person",pair2_quote2["person"]);
                $(".box-2:nth-of-type(1) .quote").attr("person",pair3_quote1["person"]);
                $(".box-2:nth-of-type(2) .quote").attr("person",pair3_quote2["person"]);

                $(".box-0:nth-of-type(1) .quote").attr("weight",pair1_quote1["weight"]);
                $(".box-0:nth-of-type(2) .quote").attr("weight",pair1_quote2["weight"]);
                $(".box-1:nth-of-type(1) .quote").attr("weight",pair2_quote1["weight"]);
                $(".box-1:nth-of-type(2) .quote").attr("weight",pair2_quote2["weight"]);
                $(".box-2:nth-of-type(1) .quote").attr("weight",pair3_quote1["weight"]);
                $(".box-2:nth-of-type(2) .quote").attr("weight",pair3_quote2["weight"]);

                $("#batting").css("opacity","1");
            }
        });
    });
});
