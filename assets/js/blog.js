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


/* Switch between category and date filter */
$('.filter-toggle').click(function() {
    if ($('#category-list').hasClass('filter-hidden')) {        // Switch to categories
        $('#category-list').removeClass('filter-hidden');
        $('#date-list').addClass('filter-hidden');
    } else {                                                    // Switch to dates
        $('#date-list').removeClass('filter-hidden');
        $('#category-list').addClass('filter-hidden');
    }
    toggleAllPosts('on');
    lockFilterPane();
});

/* Lock category pane to window (C) Cameron Doyle */ 
$(window).scroll(function() {
    lockFilterPane();
});

$(window).resize(function() {
    lockFilterPane();
});

function lockFilterPane(){
    var filterList = $('#category-list');
    if ($('#category-list').hasClass('filter-hidden')) {
        filterList = $('#date-list');
    }
    
    if ((($(window).height()) > filterList.height() + 100) && ((filterList.height() + 130) < $('#blog-archive').height()) && document.documentElement.clientWidth > 1040) {
        var archiveTop          = $('#blog-archive').offset().top;
        var archiveBottom       = archiveTop + $('#blog-archive').height();
        var categoryListBottom  = $(window).scrollTop() + filterList.height(); 

        if (($(window).scrollTop() >= archiveTop) && (categoryListBottom <= archiveBottom)) {   // Enter Archive
            filterList.removeClass("list-bottom");
            filterList.addClass("list-fixed");
        } else if (categoryListBottom > archiveBottom){                                         // Exit Below Archive
            filterList.removeClass("list-fixed");
            filterList.addClass("list-bottom");
        } else {                                                                                // Exit Above Archive
            filterList.removeClass("list-bottom");
            filterList.removeClass("list-fixed");
        }
    } else {                                                                                    // Exit Above Archive
        filterList.removeClass("list-bottom");
        filterList.removeClass("list-fixed");
    }
}

/* Toggle blog categories on/off (C) Cameron Doyle */

// Click filter in archive list
$('.category').click(function() {
    toggleFilter($(this));
});

$('.date').click(function() {
    toggleFilter($(this));
});

// Click Select All or Clear All (category list)
$('.all-posts').click(function() {
    if($(this).hasClass('selectall')) {
        toggleAllPosts('on');
    }
    else {
        toggleAllPosts('off');
    }
    scrollToTop();
});

// Click category on archive (not category list)
$('.archive-filter').click(function() {
    var category = $(this).attr('class').split(' ')[1];
    toggleSingleCategory(category);
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
    
    
    // Loop through the blog posts, and un-hide any blog posts that match any selected filter
    var filterList = $('#category-list');
    if ($('#category-list').hasClass('filter-hidden')) {
        filterList = $('#date-list');
        $('.date').each(function() {
            var date = $(this).attr('id');
            if ($(this).hasClass('selected')) {
                $('.archive-excerpt').each(function() {
                    if ($(this).hasClass('#'+date)) {
                        if ($(this).hasClass('hidden')) {
                            $(this).removeClass('hidden');
                            none = false;
                        }
                    }
                });
            }
        });
    } else {
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
    }
    
    // If no blog posts match the selected categories, show the "No Posts Found" default post
    if (none) {
        filterList.removeClass("list-bottom");
        filterList.removeClass("list-fixed");
        if($("#no-blog-posts").hasClass("hidden")) {
            $("#no-blog-posts").removeClass("hidden");
        }
    } else if(!$("#no-blog-posts").hasClass("hidden")) {
        $("#no-blog-posts").addClass("hidden");  
    }
    
    scrollToTop();
}

function toggleFilter(filter) {
    var allSelected = true;
    var noneSelected = true;
    var filterList = $('.category');
    if ($('#category-list').hasClass('filter-hidden')) {
        filterList = $('.date');
    }
    
    // Loop through each category and check it's status
    filterList.each(function() {
        // If any are not selected, then we can't be clearing + selecting a single category
        if (!$(this).hasClass('selected')) {
            allSelected = false;
        }
        
        // If any are selected, then we can't be selecting all unless ONLY the current category is selected
        if ($(this).hasClass('selected') && filter.attr('id') != $(this).attr('id')) {
            noneSelected = false;
        }
    });
    
    // If the current category is not selected, and neither is any other category, we only want to select one category, not all of them
    if (!filter.hasClass('selected') && noneSelected) {
        noneSelected = false;
    }
    
    if (allSelected) {
        toggleAllPosts('off');
        filter.addClass('selected');
        filter.find($(".fa")).removeClass('fa-square').addClass('fa-check-square');
    } 
    else if (noneSelected) {
        toggleAllPosts('on');
    }    
    else {
        if (filter.hasClass('selected')) {
            filter.removeClass('selected');
            filter.find($(".fa")).removeClass('fa-check-square').addClass('fa-square');
        } else {
            filter.addClass('selected');
            filter.find($(".fa")).removeClass('fa-square').addClass('fa-check-square');
        }
    }
    
    applyToggles();
}

function toggleSingleCategory(categoryFilter) {
    $("#category-list").removeClass("list-bottom");
    $("#category-list").removeClass("list-fixed");
    
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

function toggleAllPosts(toggle) {
    var filterList = $('#category-list');
    if ($('#category-list').hasClass('filter-hidden')) {
        filterList = $('#date-list');
    }
    
    if (toggle == 'on') {
        $('.category').each(function() {
            if (!$(this).hasClass('selected')) {
                $(this).addClass('selected');
                $(this).find($(".fa")).removeClass('fa-square').addClass('fa-check-square');
            }
        });
        
        $('.date').each(function() {
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
        filterList.removeClass("list-bottom");
        filterList.removeClass("list-fixed");
        $('.category').each(function() {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                $(this).find($(".fa")).removeClass('fa-check-square').addClass('fa-square');
            }
        });
        
        $('.date').each(function() {
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
}