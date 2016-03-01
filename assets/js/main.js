/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * Modified by Cameron Doyle 2015
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */
 
// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Open contextual collapsed sections
function openCollapsed() {
    if(window.location.hash) {
        var $target = $('body').find(window.location.hash);
        if($target.hasClass('collapse') && !($target.hasClass('in'))) {
            $target.addClass('in');
        }
    }
} window.onload = openCollapsed();

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Closes the Responsive Menu on click-off (C) Cameron Doyle
$('body').click(function() {
    if ($('.navbar-collapse').hasClass('collapse in')) {
        $('.navbar-collapse').collapse('hide');
    }
});