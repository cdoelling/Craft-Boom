$(document).ready(function() { //when the document is ready...


    //save selectors as variables to increase performance
    var $window = $(window);
    var bg1 = $(".under-portfolio .bg-image");
    var bg2 = $(".under-about .bg-image");
    var bg3 = $(".under-blog .bg-image");

    var windowHeight = $window.height(); //get the height of the window

    /*arguments:
     x = horizontal position of background
     windowHeight = height of the viewport
     pos = position of the scrollbar
     adjuster = adjust the position of the background
     inertia = how fast the background moves in relation to scrolling
     */
    function newPos(x, windowHeight, pos, adjuster, inertia){
        return x + "% " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
    }

    //function to be called whenever the window is scrolled or resized
    function Move(){
        var pos = $window.scrollTop(); //position of the scrollbar

        bg1.css({'backgroundPosition': newPos(50, windowHeight, pos, 3000, 0.2)});
        bg2.css({'backgroundPosition': newPos(70, windowHeight, pos, 4000, 0.2)});
        bg3.css({'backgroundPosition': newPos(50, windowHeight, pos, 6000, 0.2)});

    }

    $window.resize(function(){ //if the user resizes the window...
        if(jQuery(window).width() > 766) {
            Move(); //move the background images in relation to the movement of the scrollbar
        }
    });

    $window.bind('scroll', function(){ //when the user is scrolling...
        if(jQuery(window).width() > 766) {
            Move(); //move the background images in relation to the movement of the scrollbar
        }
    });

});