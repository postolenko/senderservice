var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

var sly;

$(window).on("load", function (e) {

    if( $(".scrollbar_box").length > 0 ) {
        $(".scrollbar_box").mCustomScrollbar();
    }    

});

$(window).resize(function() {

    if( $(".slider_2").length > 0 ) {
        sly.reload();
    }

});

$(document).scroll(function() {



});

$(document).ready(function() {

    $("body").addClass("fixed");

    if( $(".sly_block_wrapp").length > 0 ) {

        $slyWrapp = $(".sly_block_wrapp");

        $frame = $slyWrapp.find(".sly_block");
        sly = new Sly($frame, {
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 2,
            startAt: 3,
            scrollBar: $slyWrapp.find(".scrollbar"),
            scrollBy: 1,
            activatePageOn: "click",
            speed: 300,
            elasticBounds: 1,
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1

        }).init();

    }

    $(".main_nav > li ul").each(function() {
        $(this).addClass("sub-menu");
    });

    $(".main_nav > li").each(function() {
        if($(this).find(".sub-menu").length > 0) {
            $(this).append("<button type='button' class='menu_btn'><i class='fas fa-angle-down'></i></button>");
        }        
    });

    $(".main_nav").find(".menu_btn").on("click", function(e) {
        e.preventDefault();
        var menuItem = $(this).closest("li").find(".sub-menu");
        if(menuItem.is(":hidden")) {
            menuItem.slideDown(300);
            $(this).addClass("active");
        } else {
            menuItem.slideUp(300);
            $(this).removeClass("active");
        }
    });

    $(".respmenubtn").click(function() {
        if( $("#resp_nav").is(":hidden") ) {
            $("#resp_nav").fadeIn(300);
            $(this).addClass("active");
        } else {
            $("#resp_nav").fadeOut(300);
            $(this).removeClass("active");
        }
    });

    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 &&
            $("#resp_nav").is(":visible") ) {
                $("#resp_nav").fadeOut(300);
                $(".respmenubtn").removeClass("active");
        }
    });

    // -- Tabs --

    $(".tabs").each(function() {
        $(this).find(".tab_link").each(function() {
            if( $(this).hasClass("active") ) {
                indexActiveTab = $(this).index(".tab_link");
                $(this).click();
                return false;
            } else {
                indexActiveTab = 0;
            }
        });
        attrForTabLink = $(this).find(".tab_link").eq(indexActiveTab).attr("for");
        activeTabRadio = $(this).find(".radio_tab[id = '"+ attrForTabLink +"']");
        activeTabRadio.prop("checked", true);
        $(this).find(".tab_link").eq(indexActiveTab).addClass("active");
        $(this).addClass("activated");

    });

    $(".tab_link").click(function (e) {
        if( $(this).hasClass("active") ) {
            e.preventDefault();
        } else {
            tabsParent = $(this).closest(".tabs");
            attrForTabLink = $(this).attr("for");
            activeTabRadio = tabsParent.find(".radio_tab[id = '"+ attrForTabLink +"']");
            activeTabRadio.prop("checked", true);
            tabsParent.find(".tab_link").each(function () {                
                if( $(this).hasClass("active") ) {
                    $(this).removeClass("active");
                }
            });
            $(this).addClass("active");
        }

    });

    // ----------------

    var countItems;

    $(".number_list").each(function() {
        countItems = 0;
        $(this).find("li").each(function() {
            countItems++;
            $(this).prepend("<span class='number'>"+countItems+".</span>");
        });
    });

    // ----------------

    if( $("#promoVideo").length > 0 ) {
        var v = document.getElementById('promoVideo');
        var vv = document.getElementById('playVideo');
        v.volume = 0.5;
        v.firstChild.nodeValue = "Play";
        vv.addEventListener('click',function(e){
            if (v.paused) {
                v.play();
                v.firstChild.nodeValue = 'Play';
                $("#playVideo").addClass("active");
            } else {
                v.pause();
                v.firstChild.nodeValue = 'Pause';
                $("#playVideo").removeClass("active");
            }
        });
        if ( $("#promoVideo").attr("autoplay") == "autoplay" ) {
            $("#playVideo").addClass("active");
        }
    }

    // ----------------

    $(".scroll_down").click(function(e) {
        e.preventDefault();
        var coord = $(this).attr("href");
        var top = $(coord).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

    // ----------------
    // Sliders

    if( $(".slider_news").length > 0 ) {
        $(".slider_news").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true
        });
    }

    $("body").removeClass("fixed");

});