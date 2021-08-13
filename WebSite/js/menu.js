const parent = document.getElementsByClassName("ship1_teams");

var node = Array.prototype.slice.call(parent, 0);

node.forEach(element => {
    element.addEventListener("mouseover", function() {
        element.querySelector(".ship1_teams_dropdown").classList.add("active");
    }, false);

    element.addEventListener("mouseout", function() {
        element.querySelector(".ship1_teams_dropdown").classList.remove("active");
    }, false);
});

