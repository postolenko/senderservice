"function" != typeof Object.create && (Object.create = function(e) {
    function t() {}
    return t.prototype = e,
    new t
}
),
function(e, t, o) {
    var a = function(e) {
        var a = o.createElement("script")
          , i = o.getElementsByTagName("head")[0];
        "file://" == t.location.origin ? a.src = "http://www.youtube.com/iframe_api" : a.src = "//www.youtube.com/iframe_api",
        i.appendChild(a),
        i = null,
        a = null,
        n(e)
    }
      , n = function(o) {
        "undefined" == typeof YT && void 0 === t.loadingPlayer ? (t.loadingPlayer = !0,
        t.dfd = e.Deferred(),
        t.onYouTubeIframeAPIReady = function() {
            t.onYouTubeIframeAPIReady = null,
            t.dfd.resolve("done"),
            o()
        }
        ) : "object" == typeof YT ? o() : t.dfd.done(function(e) {
            o()
        })
    };
    YTPlayer = {
        player: null,
        defaults: {
            ratio: 16 / 9,
            videoId: "",
            mute: !0,
            repeat: !0,
            width: e(t).width(),
            playButtonClass: "YTPlayer-play",
            pauseButtonClass: "YTPlayer-pause",
            muteButtonClass: "YTPlayer-mute",
            volumeUpClass: "YTPlayer-volume-up",
            volumeDownClass: "YTPlayer-volume-down",
            start: 0,
            pauseOnScroll: !1,
            fitToBackground: !0,
            playerVars: {
                iv_load_policy: 3,
                modestbranding: 1,
                autoplay: 1,
                controls: 0,
                showinfo: 0,
                wmode: "opaque",
                branding: 0,
                autohide: 0
            },
            events: null
        },
        init: function(o, n) {
            var i = this;
            return i.userOptions = n,
            i.$body = e("body"),
            i.$node = e(o),
            i.$window = e(t),
            i.defaults.events = {
                onReady: function(e) {
                    i.onPlayerReady(e),
                    i.options.pauseOnScroll && i.pauseOnScroll(),
                    "function" == typeof i.options.callback && i.options.callback.call(this)
                },
                onStateChange: function(e) {
                    1 === e.data ? (i.$node.find("img").fadeOut(400),
                    i.$node.addClass("loaded")) : 0 === e.data && i.options.repeat && i.player.seekTo(i.options.start)
                }
            },
            i.options = e.extend(!0, {}, i.defaults, i.userOptions),
            i.options.height = Math.ceil(i.options.width / i.options.ratio),
            i.ID = (new Date).getTime(),
            i.holderID = "YTPlayer-ID-" + i.ID,
            i.options.fitToBackground ? i.createBackgroundVideo() : i.createContainerVideo(),
            i.$window.on("resize.YTplayer" + i.ID, function() {
                i.resize(i)
            }),
            a(i.onYouTubeIframeAPIReady.bind(i)),
            i.resize(i),
            i
        },
        pauseOnScroll: function() {
            var e = this;
            e.$window.on("scroll.YTplayer" + e.ID, function() {
                1 === e.player.getPlayerState() && e.player.pauseVideo()
            }),
            e.$window.scrollStopped(function() {
                2 === e.player.getPlayerState() && e.player.playVideo()
            })
        },
        createContainerVideo: function() {
            var t = this
              , o = e('<div id="ytplayer-container' + t.ID + '" >                                    <div id="' + t.holderID + '" class="ytplayer-player-inline"></div>                                     </div>                                     <div id="ytplayer-shield" class="ytplayer-shield"></div>');
            t.$node.append(o),
            t.$YTPlayerString = o,
            o = null
        },
        createBackgroundVideo: function() {
            var t = this
              , o = e('<div id="ytplayer-container' + t.ID + '" class="ytplayer-container background">                                    <div id="' + t.holderID + '" class="ytplayer-player"></div>                                    </div>                                    <div id="ytplayer-shield" class="ytplayer-shield"></div>');
            t.$node.append(o),
            t.$YTPlayerString = o,
            o = null
        },
        resize: function(o) {
            var a = e(t);
            o.options.fitToBackground || (a = o.$node);
            var n, i, l = a.width(), r = a.height(), d = e("#" + o.holderID);
            l / o.options.ratio < r ? (n = Math.ceil(r * o.options.ratio),
            d.width(n).height(r).css({
                left: (l - n) / 2,
                top: 0
            })) : (i = Math.ceil(l / o.options.ratio),
            d.width(l).height(i).css({
                left: 0,
                top: (r - i) / 2
            })),
            d = null,
            a = null
        },
        onYouTubeIframeAPIReady: function() {
            var e = this;
            e.player = new t.YT.Player(e.holderID,e.options)
        },
        onPlayerReady: function(e) {
            this.options.mute && e.target.mute(),
            e.target.playVideo()
        },
        getPlayer: function() {
            return this.player
        },
        destroy: function() {
            var o = this;
            o.$node.removeData("yt-init").removeData("ytPlayer").removeClass("loaded"),
            o.$YTPlayerString.remove(),
            e(t).off("resize.YTplayer" + o.ID),
            e(t).off("scroll.YTplayer" + o.ID),
            o.$body = null,
            o.$node = null,
            o.$YTPlayerString = null,
            o.player.destroy(),
            o.player = null
        }
    },
    e.fn.scrollStopped = function(t) {
        var o = e(this)
          , a = this;
        o.scroll(function() {
            o.data("scrollTimeout") && clearTimeout(o.data("scrollTimeout")),
            o.data("scrollTimeout", setTimeout(t, 250, a))
        })
    }
    ,
    e.fn.YTPlayer = function(t) {
        return this.each(function() {
            var o = this;
            e(o).data("yt-init", !0);
            var a = Object.create(YTPlayer);
            a.init(o, t),
            e.data(o, "ytPlayer", a)
        })
    }
}(jQuery, window, document);
