var TeoSinglePage = {
    slideCounter : 0,
    init : function() {
        jQuery('#send_message').click(function(e){
    
            e.preventDefault();
            var error = false;
            var $this = jQuery(this);
            var name = $this.parent().find('#contact-name').val();
            var email = $this.parent().find('#contact-email').val();
            var message = $this.parent().find('#contact-message').val();
        
            if(name.length === 0){
                error = true;
                jQuery('#contact-name').css('border','1px solid red');
            }
            else
            {
                jQuery('.light-form #contact-name').css('border','1px solid #E4E4E4');
                jQuery('.dark-form #contact-name').css('border','none');
            }
                
            if(email.length === 0 || email.indexOf('@') === '-1'){
                error = true;
                jQuery('#contact-email').css('border','1px solid red');
            }
            else
            {  
                
                jQuery('.light-form #contact-email').css('border','1px solid #E4E4E4');
                jQuery('.dark-form #contact-email').css('border','none');
            }
            
            if(message.length === 0){
                error = true;
                jQuery('#contact-message').css('border','1px solid red');
            }
            else
            {                   
                jQuery('.light-form #contact-message').css('border','1px solid #E4E4E4');
                jQuery('.dark-form #contact-message').css('border','none');
            }
            
            
            if(error === false){
                jQuery($this).attr({'disabled' : 'true'});

                jQuery.post("process.php", { bbsubmit: "1", bbname: name, bbemail: email, bbmessage: message }, function(result){
                    if(result === 'sent')
                    {
                        jQuery('.confirmation_message').fadeIn(500);
                    }
                    else
                    {
                        jQuery($this).removeAttr('disabled');
                    }
                });
            }
        });

        jQuery('input, textarea').placeholder();

        jQuery("a[rel^='prettyPhoto']").prettyPhoto({
        });

        jQuery("#mainNav > ul").tinyNav({
            active: 'active',
            header: 'Navigation'
        });
        jQuery('.l_tinynav1').addClass('hidden-phone');
        jQuery('#tinynav1').addClass('visible-phone');

        jQuery(window).scroll(function() {
            TeoSinglePage.hideScrollToTop();
        });
        jQuery('#portfolioSlider').flexslider({
            'controlNav': false,
            'directionNav' : false,
            "touch": true,
            "animation": "slide",
            "animationLoop": true,
            "slideshow" : true,
            keyboard: true,
            multipleKeyboard: true,
            drag : false,
            useCSS : false
        });
        jQuery("#portfolioSlider").delegate('li', 'click', function () {
            var activeIndex = $('#portfolioSlider li.flex-active-slide').index();
            var clickIndex = $(this).index();
            if(activeIndex > clickIndex) {
                $('#portfolioSlider').flexslider("prev");
            }
            if(activeIndex < clickIndex) {
                $('#portfolioSlider').flexslider("next");
            }
        });
        jQuery('.testimonials-box').flexslider({
            'controlNav': true,
            'directionNav' : false,
            "touch": true,
            "animation": "slide",
            "animationLoop": true,
            "slideshow" : true,
            useCSS : false
        });
        jQuery('.quote-slider').flexslider({
            'controlNav': false,
            'directionNav' : false,
            "touch": true,
            "animation": "slide",
            "animationLoop": true,
            "slideshow" : true,
            useCSS : false
        });
        jQuery('.homepage-slider').flexslider({
            'controlNav': false,
            'directionNav' : false,
            "touch": true,
            "animation": "fade",
            "animationLoop": true,
            "slideshow" : true,
            useCSS : false
        });
        jQuery('.portfolio-details figure a.add').click(function() {
            var rel = jQuery(this).attr('rel');
            jQuery('.project-details').hide();

            jQuery('.project-details[rel="'+rel+'"]').slideDown();
            var pos = jQuery('.project-details[rel="'+rel+'"]').position().top;
            jQuery('.project-details[rel="'+rel+'"] .screenshot-slider').flexslider({
                'controlNav': true,
                'directionNav' : false,
                "touch": true,
                "animation": "slide",
                "animationLoop": true,
                "slideshow" : true,
                useCSS : false
            });
            jQuery('body, html').animate({
                scrollTop:  pos+"px"
            }, 500);
            return false;
        });
        var isotopeContainer = $('.projects-slider');
        isotopeContainer.isotope({
            itemSelector : '.portfolio-box',
            layoutMode : 'fitRows'
        });
        $('.portfolio-menu a').click(function(){
            var selector = $(this).attr('data-filter');
            $('.portfolio-menu li.active').removeClass('active');
            $(this).parent().addClass('active');
            isotopeContainer.isotope({ filter: selector });
            return false;
        });
        jQuery('.back-to-top').click(TeoSinglePage.scrollTop);
        TeoSinglePage.activeIndicator();
        TeoSinglePage.commentsBorder();
        TeoSinglePage.resizeHomepageSlider();
        TeoSinglePage.resizeServiceBox();
        $('#mainNav').on('activate', function () {
            TeoSinglePage.activeIndicatorScrollSpy();
        });
//        $('body').scrollspy();
    },
    resizeHomepageSlider : function() {
        var windowH = jQuery(window).height();
        var headerH = jQuery('header').height();
        var height = windowH - headerH;
        var textH = jQuery('.homepage-slider .text-section .span12').height();
        jQuery('.homepage-slider').height((windowH - headerH));
        jQuery('.homepage-slider .slides li').height((windowH - headerH));
        jQuery('.homepage-slider .text-section .span12 .title').css({'marginTop' : (height/2 - textH/2) + "px"});

    },
    scrollTop : function() {
        jQuery('body, html').animate({
            scrollTop:  "0px"
        }, 500);
        return false;
    },
    resizeServiceBox : function() {
      jQuery('.services-box').each(function() {
          jQuery(this).height(jQuery(this).find('.services-diamond').height() + parseInt(jQuery(this).find('.services-diamond').css('marginTop')) + jQuery(this).find('.bottom').height() + 10);
      });
    },
    hideScrollToTop : function() {
        var windowH = jQuery(window).height();
        var scrollH = jQuery(window).scrollTop() + windowH - 100;
        if( windowH < scrollH ) {
            jQuery('.back-to-top').fadeIn('slow');
        } else {
            jQuery('.back-to-top').fadeOut('slow');
        }
    },
    activeIndicator : function() {
        $(window).bind("load", function() {
            var leftPos = $('#mainNav li.active').position().left;
            var activeW = $('#mainNav li.active').width();
            var setPosition = (activeW / 2) + leftPos - 5.5;
            $('.active-indicator').css({'left' : setPosition + 'px'});
            $('#mainNav li').hover(function() {
                var leftPos = $(this).position().left;
                var activeW = $(this).width();
                var setPosition = (activeW / 2) + leftPos - 5.5;
                $('.active-indicator').animate({'left' : setPosition + 'px'}, {queue : false, duration: 300});
            }, function() {
                var leftPos = $('#mainNav li.active').position().left;
                var activeW = $('#mainNav li.active').width();
                var setPosition = (activeW / 2) + leftPos - 5.5;
                $('.active-indicator').animate({'left' : setPosition + 'px'}, {queue : false, duration: 300});
            });
        });
    },
    activeIndicatorScrollSpy : function() {
        var leftPos = $('#mainNav li.active').position().left;
        var activeW = $('#mainNav li.active').width();
        var setPosition = (activeW / 2) + leftPos - 5.5;
        $('.active-indicator').animate({'left' : setPosition + 'px'}, {queue : false, duration: 300});
    },
    commentsBorder : function() {
        jQuery('.top-comment > .left').each(function() {
            var commentH = jQuery(this).parent().height();
            var lastComH = jQuery(this).next().find('>.last-comment').height();
            var figureH = jQuery(this).find('figure').first().height();
            jQuery(this).find('.border').height((commentH - lastComH - (figureH * 0.5) ));
        });
        jQuery('.inline-comment > .left').each(function() {
            var commentH = jQuery(this).parent().height();
            var lastComH = jQuery(this).next().find('>.last-comment').height();
            var figureH = jQuery(this).find('figure').first().height();
            jQuery(this).find('.border').height((commentH - lastComH - (figureH * 0.5) ));
        });
    }
}

jQuery(document).ready(function() {
   TeoSinglePage.init();

    function filterPath(string) {
        return string
            .replace(/^\//,'')
            .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
            .replace(/\/$/,'');
    }
    var locationPath = filterPath(location.pathname);
    var scrollElem = scrollableElement('.scrollable-container, html');

    $('#mainNav a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('body ,html').animate({
                    scrollTop: (target.offset().top - $('header').height())
                }, 1000);
                $('#mainNav li.active').removeClass('active');
                $(this).parent().addClass('active');
                return false;
            }
        }
    });

    // use the first element that is "scrollable"
    function scrollableElement(els) {
        for (var i = 0, argLength = arguments.length; i <argLength; i++) {
            var el = arguments[i],
                $scrollElement = $(el);
            if ($scrollElement.scrollTop()> 0) {
                return el;
            } else {
                $scrollElement.scrollTop(1);
                var isScrollable = $scrollElement.scrollTop()> 0;
                $scrollElement.scrollTop(0);
                if (isScrollable) {
                    return el;
                }
            }
        }
        return [];
    }
});

jQuery(window).resize(function() {
    TeoSinglePage.commentsBorder();
    TeoSinglePage.resizeHomepageSlider();
    TeoSinglePage.resizeServiceBox();
});