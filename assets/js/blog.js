/* Toggle the 'Read more' and 'Read less' links (C) Cameron Doyle */
$('.read-more').click(function() {
    if ($(this).attr("aria-expanded") == "false") {
        $(this).find($(".fa")).removeClass('fa-toggle-down').addClass('fa-toggle-up');    // Switch the font-awesome up/down arrow
        $(this).find($('span')).text($(this).text().replace('more','less'));              // Change text from 'more' to 'less'
        $(this).find($('span')).text().trim();                                            // Trim trailing whitespace
    }
    else if($(this).attr("aria-expanded") == "true") {
        $(this).find($(".fa")).removeClass('fa-toggle-up').addClass('fa-toggle-down');
        $(this).find($('span')).text($(this).text().replace('less','more'));        
        $(this).find($('span')).text().trim();
    }
});

/* Lock category pane to window (C) Cameron Doyle */ 
$(window).scroll(function() {
    if ((($(window).height()) > $('#category-list').height() + 100) && (($('#category-list').height() + 130) < $('#blog-archive').height()) && document.documentElement.clientWidth > 1040) {
        var archiveTop          = $('#blog-archive').offset().top;
        var archiveBottom       = archiveTop + $('#blog-archive').height();
        var categoryListBottom  = $(window).scrollTop() + $('#category-list').height(); 

        if (($(window).scrollTop() >= archiveTop) && (categoryListBottom <= archiveBottom)) {   // Enter Archive
            $("#category-list").removeClass("category-list-bottom");
            $("#category-list").addClass("category-list-fixed");
        } else if (categoryListBottom > archiveBottom){                                         // Exit Below Archive
            $("#category-list").removeClass("category-list-fixed");
            $("#category-list").addClass("category-list-bottom");
        } else {                                                                                // Exit Above Archive
            $("#category-list").removeClass("category-list-bottom");
            $("#category-list").removeClass("category-list-fixed");
        }
    } else {                                                                                    // Exit Above Archive
        $("#category-list").removeClass("category-list-bottom");
        $("#category-list").removeClass("category-list-fixed");
    }
});

/* Toggle blog categories on/off (C) Cameron Doyle */

// Click category in archive (category list)
$('.category').click(function() {
    toggleCategory($(this));
});

// Click category on archive (not category list)
$('.archive-filter').click(function() {
    var category = $(this).attr('class').split(' ')[1];
    toggleSingleCategory(category);
});

// Click Select All or Clear All (category list)
$('.all-categories').click(function() {
    if($(this).hasClass('selectall')) {
        toggleAllCategories('on');
    }
    else {
        toggleAllCategories('off');
    }
    scrollToTop();
});

// Click category on external page (e.g. blog post)
function archiveFilterFromHash() {
    if(window.location.hash) {
        toggleSingleCategory(window.location.hash);
        scrollToTop();
    }
} window.onload = archiveFilterFromHash();


/* Toggle blog categories helper functions */

function scrollToTop() {
    $('html, body').animate({
        scrollTop: $('#post-list').offset().top-50
    }, 'slow');
}

function applyToggles() {
    // Hide all blog posts in the archive
    $('.archive-excerpt').each(function() {
        if (!$(this).hasClass('hidden')) {
            $(this).addClass('hidden');
        }
    });    
    
    // Loop through the blog posts, and un-hide any blog posts that match any selected categories
    var none = true;
    $('.category').each(function() {
        var category = $(this).attr('id');
        if ($(this).hasClass('selected')) {
            $('.archive-excerpt').each(function() {
                if ($(this).find('tr>td>span>a').hasClass('#'+category)) {
                    if ($(this).hasClass('hidden')) {
                        $(this).removeClass('hidden');
                        none = false;
                    }
                }
            });
        }
    });
    
    // If no blog posts match the selected categories, show the "No Posts Found" default post
    if (none) {
        $("#category-list").removeClass("category-list-bottom");
        $("#category-list").removeClass("category-list-fixed");
        if($("#no-blog-posts").hasClass("hidden")) {
            $("#no-blog-posts").removeClass("hidden");
        }
    } else if(!$("#no-blog-posts").hasClass("hidden")) {
        $("#no-blog-posts").addClass("hidden");  
    }
    
    scrollToTop();
}

function toggleCategory(categoryFilter) {
    var allSelected = true;
    var noneSelected = true;
    
    // Loop through each category and check it's status
    $('.category').each(function() {
        // If any are not selected, then we can't be clearing + selecting a single category
        if (!$(this).hasClass('selected')) {
            allSelected = false;
        }
        
        // If any are selected, then we can't be selecting all unless ONLY the current category is selected
        if ($(this).hasClass('selected') && categoryFilter.attr('id') != $(this).attr('id')) {
            noneSelected = false;
        }
    });
    
    // If the current category is not selected, and neither is any other category, we only want to select one category, not all of them
    if (!categoryFilter.hasClass('selected') && noneSelected) {
        noneSelected = false;
    }
    
    if (allSelected) {
        toggleAllCategories('off');
        categoryFilter.addClass('selected');
        categoryFilter.find($(".fa")).removeClass('fa-square').addClass('fa-check-square');
    } 
    else if (noneSelected) {
        toggleAllCategories('on');
    }    
    else {
        if (categoryFilter.hasClass('selected')) {
            categoryFilter.removeClass('selected');
            categoryFilter.find($(".fa")).removeClass('fa-check-square').addClass('fa-square');
        } else {
            categoryFilter.addClass('selected');
            categoryFilter.find($(".fa")).removeClass('fa-square').addClass('fa-check-square');
        }
    }
    
    applyToggles();
}

function toggleSingleCategory(categoryFilter) {
    $("#category-list").removeClass("category-list-bottom");
    $("#category-list").removeClass("category-list-fixed");
    
    $('.category').each(function() {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            $(this).find($(".fa")).removeClass('fa-check-square').addClass('fa-square');
        }
    });
    
    if (!$(categoryFilter).hasClass('selected')) {
        $(categoryFilter).addClass('selected');
        $(categoryFilter).find($(".fa")).removeClass('fa-square').addClass('fa-check-square');
    }      
    
    applyToggles();
}

function toggleAllCategories(toggle) {
    if (toggle == 'on') {
        $('.category').each(function() {
            if (!$(this).hasClass('selected')) {
                $(this).addClass('selected');
                $(this).find($(".fa")).removeClass('fa-square').addClass('fa-check-square');
            }
        });
        
        $('.archive-excerpt').each(function() {
            if ($(this).hasClass('hidden')) {
                $(this).removeClass('hidden');
            }
        });
        
        if(!$("#no-blog-posts").hasClass("hidden")) {
            $("#no-blog-posts").addClass("hidden");  
        }
    } else if (toggle == 'off') {
        $("#category-list").removeClass("category-list-bottom");
        $("#category-list").removeClass("category-list-fixed");
        $('.category').each(function() {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                $(this).find($(".fa")).removeClass('fa-check-square').addClass('fa-square');
            }
        });
        
        $('.archive-excerpt').each(function() {
            if (!$(this).hasClass('hidden')) {
                $(this).addClass('hidden');
            }
        });
        
        if($("#no-blog-posts").hasClass("hidden")) {
            $("#no-blog-posts").removeClass("hidden");
        }
    }    
    $(".tag-dropdown-caption").text("Select Category");
}