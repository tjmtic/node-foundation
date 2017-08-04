(function() {
    var header = new Headroom(document.querySelector("#headerNav"), {
        tolerance: 5,
        offset : 205,
        classes: {
          initial: "animated",
          pinned: "slideUp",
          unpinned: "slideDown"
        }
    });
    header.init();

    console.log("HEADER INIT");

    var bttHeadroom = new Headroom(document.getElementById("btt"), {
        tolerance : 0,
        offset : 500,
        classes : {
            initial : "slide",
            pinned : "slide--reset",
            unpinned : "slide--up"
        }
    });
    bttHeadroom.init();
}());
