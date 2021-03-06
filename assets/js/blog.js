/* Toggle the 'Read more' and 'Read less' links */
$('.read-more').click(function() {
    if ($(this).attr("aria-expanded") == "false") {
        $(this).find($(".fa")).removeClass('fa-toggle-down').addClass('fa-toggle-up');
        $(this).find($('span')).text($(this).text().replace('more','less'));
        $(this).find($('span')).text().trim();
    }
    else if($(this).attr("aria-expanded") == "true") {
        $(this).find($(".fa")).removeClass('fa-toggle-up').addClass('fa-toggle-down');
        $(this).find($('span')).text($(this).text().replace('less','more'));        
        $(this).find($('span')).text().trim();
    }
});


/* Switch between category and date filter */
$('.filter-switch').click(function() {
    if ($(this).hasClass('filter-off')) {
        switchFilterRadioButton($(this));
        
        if ($(this).is('#category-switch')) {
            $('#category-list').removeClass('filter-hidden');
            $('#date-list').addClass('filter-hidden');
            $('#tag-list').addClass('filter-hidden');
            $('#select-all-posts').removeClass('filter-hidden');
        } else if ($(this).is('#date-switch')) {
            $('#date-list').removeClass('filter-hidden');
            $('#category-list').addClass('filter-hidden');
            $('#tag-list').addClass('filter-hidden');
            $('#select-all-posts').removeClass('filter-hidden');
        } else if ($(this).is('#tag-switch')) {
            $('#tag-list').removeClass('filter-hidden');
            $('#category-list').addClass('filter-hidden');
            $('#date-list').addClass('filter-hidden');
            $('#select-all-posts').addClass('filter-hidden');
        }
        toggleAllPosts('on'); 
        scrollToTop();
        lockFilterPane();
    }
});

function switchFilterRadioButton(switchTo) {
    /* Toggle all radios off */
    $('.filter-on').each(function() {
        $(this).addClass('filter-off');
        $(this).removeClass('filter-on');
        $(this).find($(".fa")).removeClass('fa-check-circle-o').addClass('fa-circle-o');
    });
    
    /* Toggle on selection */
    $(switchTo).addClass('filter-on');
    $(switchTo).removeClass('filter-off');
    $(switchTo).find($(".fa")).removeClass('fa-circle-o').addClass('fa-check-circle-o');
}

/* Lock category pane to window (C) Cameron Doyle */ 
$(window).scroll(function() {
    lockFilterPane();
});

$(window).resize(function() {
    lockFilterPane();
});

function lockFilterPane(){
    var filterList = $('#filter-wrapper');
    var postList = $('#blog-archive');
    $('.archive-left-side').height(filterList.height());
    
    if ((($(window).height()) > filterList.height() + 100) && ((filterList.height() + 130) < postList.height()) && document.documentElement.clientWidth > 1040) {
        var archiveTop          = postList.offset().top;
        var archiveBottom       = archiveTop + postList.height();
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

$('.tag').click(function() {
    toggleSingleTag($(this));
});

// Click Select All or Clear All (category/date list)
$('.all-posts').click(function() {
    if($(this).hasClass('selectall')) {
        toggleAllPosts('on');
    } else {
        toggleAllPosts('off');
    }
    scrollToTop();
});

// Click category on archive (not category list)
$('.archive-filter').click(function() {
    var category = $(this).attr('class').split(' ')[1];
    
    if ($('#category-switch').hasClass('filter-off')) {
        switchFilterRadioButton('#category-switch');   
        $('#category-list').removeClass('filter-hidden');
        $('#date-list').addClass('filter-hidden');
        $('#tag-list').addClass('filter-hidden');
        $('#select-all-posts').removeClass('filter-hidden');       
        toggleAllPosts('on');
    }
    
    toggleSingleCategory(category);
    clearHash();
});

/* Click category on external page (e.g. blog post) */
function archiveFilterFromHash() {
    if(window.location.hash) {
        toggleSingleCategory(window.location.hash);
        scrollToTop();
    }
} window.onload = archiveFilterFromHash();


/* Toggle blog categories helper functions */

function clearHash() {
    history.pushState('','', window.location.pathname);
}

function scrollToTop() {
    $('html, body').animate({
        scrollTop: $('#post-list').offset().top-50
    }, 'slow');
}

function resetFilters() {
    $('.category').each(function() {
        if (!$(this).hasClass('selected')) {
            $(this).addClass('selected');
            $(this).find($(".fa")).removeClass('fa-square').addClass('fa-check-square');
            $(this).removeClass('tag-unselected');
        }
    });
    
    $('.date').each(function() {
        if (!$(this).hasClass('selected')) {
            $(this).addClass('selected');
            $(this).find($(".fa")).removeClass('fa-square').addClass('fa-check-square');
            $(this).removeClass('tag-unselected');
        }
    });
    
    $('.tag').each(function() {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        $(this).addClass('tag-unselected');
    });
}

function applyToggles() {
    // Hide all blog posts in the archive
    $('.archive-excerpt').each(function() {
        if (!$(this).hasClass('hidden')) {
            $(this).addClass('hidden');
        }
    });
    
    var none = true;
    var filterList;
    // Loop through the blog posts, and un-hide any blog posts that match any selected filter
    if (!$('#category-list').hasClass('filter-hidden') && $('#date-list').hasClass('filter-hidden') && $('#tag-list').hasClass('filter-hidden')) {
        none = applyCategoryToggles();
        filterList = $('#category-list');
    } else if ($('#category-list').hasClass('filter-hidden') && $('#date-list').hasClass('filter-hidden') && !$('#tag-list').hasClass('filter-hidden')) {
        none = applyTagToggles();
        filterList = $('#tag-list');
    } else if ($('#category-list').hasClass('filter-hidden') && !$('#date-list').hasClass('filter-hidden') && $('#tag-list').hasClass('filter-hidden')) {
        none = applyDateToggles();
        filterList = $('#date-list');
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

function applyCategoryToggles() {
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

function applyDateToggles() {
    var none = true;
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
    return none;
}

function applyTagToggles() {
    var none = true;
    $('.tag').each(function() {
        var tag = $(this).attr('id');
        if ($(this).hasClass('selected')) {
            $('.archive-excerpt').each(function() {
                if ($(this).find('tr>td>span').hasClass('tag-'+tag)) {
                    if ($(this).hasClass('hidden')) {
                        $(this).removeClass('hidden');
                        none = false;
                    }
                }
            });
        }
    });
    return none;
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
        filter.removeClass('tag-unselected');
    } else if (noneSelected) {
        toggleAllPosts('on');
    } else {
        if (filter.hasClass('selected')) {
            filter.removeClass('selected');
            filter.find($(".fa")).removeClass('fa-check-square').addClass('fa-square');
            filter.addClass('tag-unselected');
        } else {
            filter.addClass('selected');
            filter.find($(".fa")).removeClass('fa-square').addClass('fa-check-square');
            filter.removeClass('tag-unselected');
        }
    }
    
    applyToggles();
    clearHash();
}

function toggleSingleCategory(categoryFilter) {
    $("#category-list").removeClass("list-bottom");
    $("#category-list").removeClass("list-fixed");
    
    $('.category').each(function() {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            $(this).find($(".fa")).removeClass('fa-check-square').addClass('fa-square');
            $(this).addClass('tag-unselected');
        }
    });
    
    if (!$(categoryFilter).hasClass('selected')) {
        $(categoryFilter).addClass('selected');
        $(categoryFilter).find($(".fa")).removeClass('fa-square').addClass('fa-check-square');
        $(categoryFilter).removeClass('tag-unselected');
    }
    
    applyToggles();
}

function toggleSingleTag(tagFilter) {
    resetFilters();
    $("#tag-list").removeClass("list-bottom");
    $("#tag-list").removeClass("list-fixed");    
    
    if (!$(tagFilter).hasClass('selected')) {
        $(tagFilter).addClass('selected');
        $(tagFilter).removeClass('tag-unselected');
    }
    
    applyToggles();
}

function toggleAllPosts(toggle) {
    var filterList = $('#category-list');
    if ($('#category-list').hasClass('filter-hidden')) {
        filterList = $('#date-list');
    }
    
    if (toggle == 'on') {
        resetFilters();
        
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
                $(this).addClass('tag-unselected');
            }
        });
        
        $('.date').each(function() {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                $(this).find($(".fa")).removeClass('fa-check-square').addClass('fa-square');
                $(this).addClass('tag-unselected');
            }
        });
        
        $('.archive-excerpt').each(function() {
            if (!$(this).hasClass('hidden')) {
                $(this).addClass('hidden');
            }
        });
        
        if ($("#no-blog-posts").hasClass("hidden")) {
            $("#no-blog-posts").removeClass("hidden");
        }
    }
    clearHash();
}