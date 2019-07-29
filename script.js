var resource_url = "https://api.betterdoctor.com/2016-03-01/insurances?user_key=3100b109c4a9e2fdf5b47a749eb32965"


$.ajax({
    url: resource_url,
    method: "GET"
}).then(function (response1) {

    console.log("this is the insurance stuff")

    console.log(response1);

    // finna see if i can output the amerihealth plans


    for (let i = 0; i < 4; i++) {


        plans = response1.data[0].plans[i].uid + ",";

        plansString = JSON.stringify(plans);

        console.log(plansString);



    }



});






$("#clickme").click(function () {

    event.preventDefault();


    var api_key = '3100b109c4a9e2fdf5b47a749eb32965';

    // location of doctor

    var doctor_state = $("#state-input option:selected").val().toLowerCase();

    console.log(doctor_state);

    var doctor_city = $("#city-input").val().trim().replace(' ', '-').toLowerCase();

    console.log(doctor_city);

    // specialty

    var specialty = $("#specialty-input option:selected").val().toLowerCase();

    // insurance try?


    var insurance = $("#provider-input option:selected").val().toLowerCase();

    // user location

    var user_location = '';

    // this is the resource url we are using for the CLICK ONLY

    var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?' + 'insurance_uid=' + insurance
        + '&specialty_uid=' + specialty
        + '&location=' + doctor_state + "-" + doctor_city
        + '&user_location=' + user_location
        + '&skip=0&limit=10&user_key=' + api_key;

    console.log(resource_url);


    // clearing the results before 

    $(".thedocs").remove();
    $(".thedocsTR").remove();
    $(".thedocsaddress").remove();





    $.ajax({
        url: resource_url,
        method: "GET"
    }).then(function (response) {



        var count = response.meta.count;

        console.log("this is the count: " + count);
        console.log(response);

        if (count === 0) {

            $(".thedocs").remove();
            $(".thedocsTR").remove();



            var tr = $("<tr>");


            var docTd = $("<td class = 'thedocs' >").text("no doctors to show");


            tr.append(docTd);


            $(".table").append(tr);

        }

        else {

            $(".thedocs").remove();
            $(".thedocsTR").remove();





            // i'll put a loop so we can show a few

            for (let i = 0; i < response.data.length; i++) {







                var doctor_name = response.data[i].profile.first_name + " " + response.data[i].profile.last_name;

                // I did the variable below this way just to save us from needing another variable




                var doctor_img = $(" <td> <img class = 'thedocs' src=" + response.data[i].profile.image_url + ">");

                // gonna get some addy stuff

                var doctor_address_city = response.data[i].practices[0].visit_address.city;
                var doctor_address_state = response.data[i].practices[0].visit_address.state;
                var doctor_address_street = response.data[i].practices[0].visit_address.street;
                var doctor_address_zip = response.data[i].practices[0].visit_address.zip;
                var doctor_address_full = (doctor_address_city + " " + doctor_address_state + " " + doctor_address_street + " " + doctor_address_zip);
                var doctor_address_url = doctor_address_full.replace(/\s+/g, '+')




                console.log(doctor_name);
                console.log(doctor_img);

                // console.log("THIS WILL SHOW ONE CITY " + doctor_address_city);
                // console.log("THIS WILL SHOW ONE STATE " + doctor_address_state);
                // console.log("THIS WILL SHOW ONE street " + doctor_address_street);
                // console.log("THIS WILL SHOW ONE zip " + doctor_address_zip);
                console.log(doctor_address_full);
                console.log(doctor_address_url);
                var lat = response.data[i].practices[0].lat;
                var lon = response.data[i].practices[0].lon;
                console.log(lat);
                console.log(lon);



                var mapProp = {
                    center: new google.maps.LatLng(lat, lon),
                    zoom: 16,
                };
               


                console.log(map)
                var tr = $("<tr class = 'thedocsTR' >");


                var docTd = $("<td class = 'thedocs' >").text("doc: " + doctor_name);

                var docAddressTd = $("<td class = 'thedocsaddress' >").text(doctor_address_full);

                var mapTd = $("<td id = 'googleMap_" + i + "' >" + map);

                tr.append(docTd).append(doctor_img).append(docAddressTd).append(mapTd);



                $(".table").append(tr);
                var map = new google.maps.Map(document.getElementById("googleMap_" + i), mapProp);

            }



        }




    })









});



// google API Key: AIzaSyAxqUekZhoGLhnTT57LPgjezVUPWx02C0M
// hellp




