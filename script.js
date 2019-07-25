var api_key = '3100b109c4a9e2fdf5b47a749eb32965';

var doctor_state = "fl";

var doctor_city = "orlando";

// var doctor_location = 'fl-orlando';

var user_location = '28.493873%2C%20-81.597213';

var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=' + doctor_state + "-" + doctor_city + '&user_location=' + user_location + '&skip=0&limit=10&user_key=' + api_key;



$("#clickme").click(function () {

    event.preventDefault();


    $(".thedocs").remove();



    $.ajax({
        url: resource_url,
        method: "GET"
    }).then(function (response) {


        console.log(response);

        // should show first doctors full name 

        console.log(response.data[0].profile.first_name + " " + response.data[0].profile.last_name);

        console.log("---------------------")


        // i'll put a loop so we can show a few

        for (let i = 0; i < 10; i++) {


            var doctor_name = response.data[i].profile.first_name + " " + response.data[i].profile.last_name;


            console.log(doctor_name);

            var showDiv = $("<div>");


            var p = $("<p class = 'thedocs' >").text("doc: " + doctor_name);

                showDiv.append(p);


                $("#docs-appear-here").prepend(showDiv);


        }



    });



});




















