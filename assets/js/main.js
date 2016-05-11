// jQuery for page scrolling feature
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top
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