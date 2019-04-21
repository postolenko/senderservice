function getHeaderParams() {
 var headerSite = $(".header_site");
 if( bodyWidth < 900 ) {
     if( headerSite.offset().top > 1 ) {
         headerSite.addClass("js");
     } else {
         headerSite.removeClass("js");
     }
 }else {
     headerSite.removeClass("js");
 }
}

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
    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    if( $(".slider_2").length > 0 ) {
        sly.reload();
    }
    getHeaderParams();
});

$(document).scroll(function() {
    getHeaderParams();
});

$(document).ready(function() {

    getHeaderParams();

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

    $(".main_nav > li").each(function() {
        if($(this).find(".dropdown_box").length > 0) {
            $(this).append("<button type='button' class='menu_btn'><i class='fas fa-angle-down'></i></button>");
        }        
    });

    $(".main_nav > li").click(function(e) {
        if($(this).find(".dropdown_box").length > 0) {
            e.preventDefault();
            var dropdownMenu = $(this).find(".dropdown_box");
            if(dropdownMenu.is(":hidden")) {
                dropdownMenu.slideDown(300);
                $(this).addClass("active");
            } else {
                dropdownMenu.slideUp(300);
                $(this).removeClass("active");
            }
        }
    });

    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 ) {
            $(".dropdown_box").slideUp(300, function() {
                $(this).closest("li").removeClass("active");
            });
            if(bodyWidth <= 900) {
                $("#resp_nav").fadeOut(300);
                $(".respmenubtn").removeClass("active");
            }

        }
    });

    $(document).mouseup(function (e){
        var hide_element = $(".dropdown_box");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            hide_element.slideUp(300, function() {
                $(this).closest("li").removeClass("active");
            });
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

    // var countItems;

    // $(".number_list").each(function() {
    //     countItems = 0;
    //     $(this).find("li").each(function() {
    //         countItems++;
    //         $(this).prepend("<span class='number'>"+countItems+".</span>");
    //     });
    // });

    // ----------------

    $(".scroll_down").click(function(e) {
        e.preventDefault();
        var coord = $(this).attr("href");
        var top = $(coord).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

    // Smooth scroll
    $('.smooth_scroll').click(function(e){
        e.preventDefault();
        var coord = $(this).attr("href");
        var top = $(coord).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

    // ----------------
    // Sliders

    if( $(".slider_news").length > 0 ) {
        $(".slider_news").not(".slick-initialized").slick({
            dots: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true
        });
    }

    // Youtube BG

    if( $('#video').length > 0 ) {

        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        $('#video').YTPlayer({
            playerVars: {
                listType:'playlist',
                autoplay: 1,
                list: 'PLl9Dbw92gld_q8il6fzIGUbc2bdFu8w-8',
                modestbranding: 0,
                wmode: 'transparent',
                rel: 0,
                loop: 1,
                origin: location.origin
            }
        });

        $('.playVideo').click(function(e){
            e.preventDefault();

            let player = $('#video').data('ytPlayer').player,
                icon = $(this).children();

            if(icon.hasClass('fa-pause')) {
                player.pauseVideo();
                icon.removeClass('fa-pause').addClass('fa-play');
            } else {
                player.playVideo();
                icon.removeClass('fa-play').addClass('fa-pause');
            }
        });

        $(window).resize(function(){
            $(".promo_sect.video").css("max-height",$(window).height());
        }).resize();

        //  VK widget

        // if($("#vk_groups").length > 0) {
        //     try {
        //         VK.Widgets.Group("vk_groups", {mode: 0, width: "auto", height: "auto", color1: 'FFFFFF', color2: '000', color3: '8b0202'}, 86930753);
        //     } catch(error) {
        //         console.log("Error calling VK.Widgets.Group", error);
        //         $(".vk_widget").css({
        //             "display" : "none"
        //         });
        //         $(".thumb_3").addClass("w_2");
        //     }
        // }

        // Social

        $(this).on("click",".social_list a",function(e){
            e.preventDefault();

            let url=encodeURIComponent(location.href.split("#").shift()),
                desc=encodeURIComponent( $("meta[name=description]").attr("content") ),
                title=encodeURIComponent(document.title),
                info='scrollbars=yes,width=600,height=400';

            switch($(this).data("id"))
            {
                case'fb':
                    open('https://www.facebook.com/sharer/sharer.php?u='+url,'share',info);
                break;
                case'vk':
                    open('https://vk.com/share.php?url='+url+'&description='+title+'. '+desc,'share',info);
                break;
                case'tw':
                    var text = title || desc || '';

                    if(title.length > 0 && desc.length > 0)
                        text = title + ' - ' + desc;

                    if(text.length > 0)
                        text = '&text=' + text;

                    open('https://twitter.com/intent/tweet?url='+url+text,'share',info);
                break;
                case'gp':
                    open('https://plus.google.com/share?url='+url,'share',info);
                break;
                case'ok':
                    open('https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl='+url,'share',info);
                break;
            }
        })

    }

    // ---------------------------

    $("body").removeClass("fixed");

});