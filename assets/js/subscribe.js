var isClicked = false;

$(document).on('click', '.mc-closeModal', function() {
    isClicked = false;
});

$('.open-subscribe-popup').click(function() {
    if(!isClicked) {
        require(["mojo/signup-forms/Loader"], function(L) { 
            L.start({"baseUrl":"mc.us13.list-manage.com","uuid":"1f1ccfe804d7833ca1f07c968","lid":"519660a598"}) 
        })
        document.cookie = "MCEvilPopupClosed=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        isClicked = true;
    }
});

