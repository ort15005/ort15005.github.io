$.ajax({
    url: "/sandbox/acme/acme.json",
    dataType: "json",
    success: function (data) {
        console.log(data);

        var home = data['nav']['home'];
        var anvils = data['nav']['anvils'];
        var explosives = data['nav']['explosives'];
        var decoys = data['nav']['decoys'];
        var traps = data['nav']['traps'];
        var output='#list-nav';
        console.log(traps);

        $('#list-nav').html("<li><a href='#'>Home</a></li><li><a href='#'>Anvils</a></li><li><a href='#'>Explosives</a></li><li><a href='#'>Decoys</a></li><li><a href='#'>Traps</a></li>");


        $('#list-nav').on("click", "a", function (evt) {
            evt.preventDefault();
            var navClick = $(this).text();
            console.log(navClick);

            var maker = 'Manufacurer: ' + data[navClick]['manufacturer'];
            var price = 'Price: $ ' + data[navClick]['price'];
            var reviews = 'Average User Reviews: ' + data[navClick]['reviews'];
            var name = data[navClick]['name'];
            var picture = data[navClick]['path'];
            var description = data[navClick]['description'];
            console.log(name);
            console.log(picture);
            console.log(description);
            console.log(maker);
            console.log(price);
            console.log(reviews);

            $("#only-home").hide();

            $("#item-name").html(name);
            $("#page-title").html(name + " | ACME");
            $("#item-picture").html(picture);
            $("#item-description").html(description);
            $("#item-maker").html(maker);
            $("#item-price").html(price);
            $("#item-reviews").text(reviews);
        })
    }
});
