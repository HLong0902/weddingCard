var Neela;
! function(u) {
    "use strict";
    (Neela = {
        initialized: !1,
        cDays: c_days,
        cHours: c_hours,
        cMinutes: c_minutes,
        cSeconds: c_seconds,
        countdownEndMsg: countdown_end_msg,
        contactFormErrorMsg: contact_form_error_msg,
        contactFormRecaptchaErrorMsg: contact_form_recaptcha_error_msg,
        contactFormSuccessMsg: contact_form_success_msg,
        sendingMail: !1,
        heroFullScreen: hero_full_screen,
        mapColor: map_color,
        mapInitialLatitude: map_initial_latitude,
        mapInitialLongitude: map_initial_longitude,
        mapInitialZoom: map_initial_zoom,
        mapMarkers: map_markers,
        useDefaultMapStyle: use_default_map_style,
        mobMenuFlag: !1,
        mobileMenuTitle: mobile_menu_title,
        onepageNav: onepage_nav,
        rtlFlag: rtl,
        slidehowImages: slidehow_images,
        timelineParallax: timeline_parallax,
        init: function() {
            var e = this;
            e.initialized || (e.initialized = !0, e.build(), e.events())
        },
        build: function() {
            var e = this;
            e.neelaStyle(), e.preloader(), e.navigation(), e.wtcheck(), e.createMobileMenu(), e.heroHeight(), u("input, textarea").placeholder(), e.googleMap(), e.createLightboxGallery(), e.createBackgroundSlideshow(), e.createOwlSliders(), e.createGallery(), e.bgImageGrid(), e.countdown(), e.parallaxBg()
        },
        events: function() {
            var e, t, a = this;
            a.windowResize(), e = setInterval(function() {
                /loaded|complete/.test(document.readyState) && (clearInterval(e), a.resizeVideos())
            }, 4), a.contactForm(), a.objEvents(), a.parallaxTimeline(), t = setInterval(function() {
                /loaded|complete/.test(document.readyState) && (clearInterval(t), a.animateElems())
            }, 4)
        },
        neelaStyle: function() {
            u(".neela-style, .btn.btn-primary, .btn.btn-light, .btn.btn-dark").prepend('<span class="h-lines"></span><span class="v-lines"></span>')
        },
        preloader: function() {
            var e = setInterval(function() {
                /loaded|complete/.test(document.readyState) && (clearInterval(e), u("#preloader").fadeOut(1e3))
            }, 4)
        },
        navigation: function() {
            u(".nav li a").on("click", function(e) {
                var t = u(this),
                    a = 0;
                if (u.browser.mobile && (!t.closest(".dropdown").hasClass("open") || "block" === t.closest(".dropdown-menu").css("display") || !t.parent().parent().hasClass("nav"))) return e.preventDefault(), !1;
                "#" === t.attr("href").charAt(0) && u(t.attr("href")).length ? (e.preventDefault(), "#hero" !== t.attr("href") && null !== u(t.attr("href")).offset() && (a = u(t.attr("href")).offset().top - 55), u("html, body").stop().animate({
                    scrollTop: a
                }, 800, "easeOutExpo", function() {
                    t.blur()
                })) : window.open(t.attr("href"), "_self")
            }), void 0 !== window.Waypoint && new Waypoint.Sticky({
                element: u(".nav-section"),
                offset: -1
            }), u(".nav-section.light").length && u(window).on("scroll load", function() {
                180 < u(window).scrollTop() ? u(".nav-section.light").addClass("sticky") : u(".nav-section.light").removeClass("sticky")
            }), 0 !== u("#wrapper > section, #wrapper > div#hero").length && this.onepageNav && jQuery().waypoint && u("#wrapper > section, #wrapper > div#hero").waypoint({
                element: u("#wrapper > section"),
                handler: function(e) {
                    var t = u(this),
                        a = t[0].element.id;
                    "up" === e && (a = t[0].element.previousElementSibling.id), u(".nav a").removeClass("active"), (u(window).scrollTop() < 100 ? u('.nav a[href="#hero"]') : u('.nav a[href="#' + a + '"]')).addClass("active")
                },
                offset: "50%"
            }), u(window).on("load", function() {
                var e = location.hash.replace("#", "");
                "" !== e && (location.hash = "", u("html, body").stop().animate({
                    scrollTop: u("#" + e).offset().top - 65
                }, 800, "easeInOutExpo")), void 0 !== window.Waypoint && new Waypoint.Sticky({
                    element: u(".nav-section")
                })
            })
        },
        createMobileMenu: function(e) {
            var n, t = this,
                o = u("#wrapper"),
                i = u.browser.mobile ? "touchstart" : "click";
            null !== e && (e = u(window).innerWidth()), e <= 975 && !t.mobMenuFlag && (u("body").prepend('<nav class="nav-mobile"><i class="fa fa-times"></i><h2>' + t.mobileMenuTitle + "</h2><ul></ul></nav>"), u(".nav-mobile > ul").html(u(".nav").html()), u(".nav-mobile b, .nav-mobile .nav-logo").remove(), u(".nav-mobile ul.dropdown-menu").removeClass().addClass("dropdown-mobile"), u(".navbar > a.btn").length && (u(".navbar > a.btn").each(function() {
                u(".nav-mobile").append(u(this).clone())
            }), u(".nav-mobile > a.btn").removeClass("btn-light").addClass("btn-primary btn-sm")), n = u(".nav-mobile"), u("#nav-mobile-btn").on(i, function(e) {
                e.stopPropagation(), e.preventDefault(), setTimeout(function() {
                    o.addClass("open"), n.addClass("open")
                }, 25), u(document).on(i, function(e) {
                    u(e.target).hasClass("nav-mobile") || u(e.target).parents(".nav-mobile").length || (o.removeClass("open"), n.removeClass("open"), u(document).off(i))
                }), u(">i", n).on(i, function() {
                    o.removeClass("open"), n.removeClass("open"), u(document).off(i)
                })
            }), t.mobMenuFlag = !0, u(".nav-mobile li a").on("click", function(e) {
                var t = u(this),
                    a = 0;
                "#hero" !== t.attr("href") && (a = u(t.attr("href")).offset().top - 65), u("html, body").stop().animate({
                    scrollTop: a
                }, 800, "easeInOutExpo", function() {
                    t.blur()
                }), o.removeClass("open"), n.removeClass("open"), u(document).off(i), e.preventDefault()
            }))
        },
        heroHeight: function() {
            this.heroFullScreen && (u("#hero").css({
                minHeight: u(window).innerHeight() + "px"
            }), u(window).resize(function() {
                var e = parseInt(u("#hero").css("padding-bottom")) + 70,
                    t = parseInt(u("#hero").next("section").css("margin-top")),
                    a = u(window).innerHeight() - e,
                    n = u("#hero >.container").height(),
                    o = -10;
                t < 0 && !Number.isNaN(t) && (a += t + e), n = a - n, u(".nav-section.light").length && (o = 10), 0 < n && u(".v-center").length && u("#hero >.container").css({
                    "margin-top": n / 2 + o + "px"
                }), u("#hero").css({
                    minHeight: u(window).innerHeight() + "px"
                })
            }))
        },
        bgImageGrid: function() {
            u("#freewall").length && (u("#freewall .item").each(function() {
                var e = u(this);
                e.width(Math.floor(260 + 200 * Math.random())), e.css({
                    "background-image": "url(" + u(">img", e).attr("src") + ")"
                }), u(">img", e).remove()
            }), u("#freewall").appendTo("#wrapper"), u(document).ready(function() {
                var e = new Freewall("#freewall");
                e.reset({
                    selector: ".item",
                    animate: !1,
                    cellW: 20,
                    cellH: 320,
                    gutterX: 1,
                    gutterY: 1,
                    onResize: function() {
                        e.fitWidth()
                    }
                }), e.fitWidth()
            }))
        },
        googleMap: function() {
            var e, t, a, s, n, o, i, r, l = this,
                c = [],
                d = 0;
            if (0 === u(".gmap").length || "undefined" === l.mapMarkers || 0 === l.mapMarkers.length || void 0 === window.google) return !1;
            /^\d|\.|-$/.test(l.mapInitialLatitude) && /^\d|\.|-$/.test(l.mapInitialLongitude) || (l.mapInitialLatitude = l.mapMarkers[0].latitude, l.mapInitialLongitude = l.mapMarkers[0].longitude), t = new google.maps.LatLng(l.mapInitialLatitude, l.mapInitialLongitude), l.useDefaultMapStyle || (c = [{
                stylers: [{
                    hue: l.mapColor
                }, {
                    saturation: -75
                }, {
                    lightness: 5
                }]
            }, {
                featureType: "administrative",
                elementType: "labels.text.fill",
                stylers: [{
                    saturation: 20
                }, {
                    lightness: -70
                }]
            }, {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    saturation: -50
                }, {
                    lightness: 40
                }]
            }, {
                featureType: "road",
                elementType: "geometry",
                stylers: [{
                    hue: l.mapColor
                }, {
                    saturation: -100
                }, {
                    lightness: 0
                }]
            }, {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{
                    hue: l.mapColor
                }, {
                    saturation: 5
                }, {
                    lightness: 5
                }]
            }, {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{
                    saturation: 10
                }, {
                    lightness: 0
                }]
            }, {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    saturation: 0
                }, {
                    lightness: 20
                }]
            }, {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    hue: l.mapColor
                }, {
                    saturation: 30
                }, {
                    lightness: -30
                }]
            }]), e = new google.maps.StyledMapType(c, {
                name: "Neela"
            }), i = google.maps.ControlPosition.RIGHT_CENTER, r = google.maps.ControlPosition.RIGHT_BOTTOM, c = google.maps.ControlPosition.RIGHT_TOP, l.rtlFlag && (i = google.maps.ControlPosition.LEFT_CENTER, r = google.maps.ControlPosition.LEFT_BOTTOM, c = google.maps.ControlPosition.LEFT_TOP), a = {
                center: t,
                zoom: l.mapInitialZoom,
                scrollwheel: !1,
                panControl: !1,
                mapTypeControl: !1,
                zoomControl: !0,
                zoomControlOptions: {
                    position: i
                },
                streetViewControlOptions: {
                    position: r
                },
                fullscreenControlOptions: {
                    position: c
                }
            }, u(".gmap").each(function() {
                for (n = u(this).attr("id"), (s = new google.maps.Map(document.getElementById(n), a)).mapTypes.set("map_style", e), s.setMapTypeId("map_style"), o = function(e) {
                        var t = e.latitude,
                            a = e.longitude,
                            n = e.icon,
                            e = e.infoWindow,
                            o = new google.maps.InfoWindow({
                                content: '<div class="infoWindow">' + e + "</div>"
                            }),
                            i = new RichMarker({
                                position: new google.maps.LatLng(t, a),
                                map: s,
                                anchor: 8,
                                anchorPoint: new google.maps.Point(0, -50),
                                shadow: "none",
                                content: '<div class="marker"><i class="fa ' + n + '"></i></div>'
                            });
                        google.maps.event.addListener(i, "click", function() {
                            o.open(s, i)
                        })
                    }; d < l.mapMarkers.length;) o(l.mapMarkers[d]), d += 1
            })
        },
        wtcheck: function() {
            return true;
        },
        createBackgroundSlideshow: function() {
            u(".bg-slideshow").length && this.slidehowImages.length && u(".bg-slideshow").zoomSlider({
                src: this.slidehowImages,
                bullets: !1,
                speed: 1e4,
                switchSpeed: 1e3,
                interval: 6e3
            })
        },
        createLightboxGallery: function() {
            void 0 !== window.lightbox && lightbox.option({
                resizeDuration: 200,
                wrapAround: !0,
                disableScrolling: !0,
                showImageNumberLabel: !1,
                positionFromBottom: 150
            })
        },
        createOwlSliders: function() {
            u(".timeline-gallery").length && u(".timeline-gallery").owlCarousel({
                nav: !0,
                dots: !1,
                responsive: {
                    0: {
                        items: 1
                    }
                },
                rtl: this.rtlFlag
            }), u(".testimonials").length && u(".testimonials").owlCarousel({
                nav: !1,
                dots: !0,
                responsive: {
                    0: {
                        items: 1
                    }
                },
                rtl: this.rtlFlag
            })
        },
        createGallery: function() {
            var e = u(".gallery-scroller"),
                t = !1;
            u(".gallery-scroller").length && (u(".gallery-right").on("click", function() {
                return !t && (t = !0, void e.animate({
                    scrollLeft: e.scrollLeft() + 380
                }, function() {
                    t = !1
                }))
            }), u(".gallery-left").on("click", function() {
                return !t && (t = !0, void e.animate({
                    scrollLeft: e.scrollLeft() - 380
                }, function() {
                    t = !1
                }))
            }), u(document).ready(function() {
                u(".gallery-scroller").niceScroll({
                    cursorcolor: "#fff",
                    cursorwidth: "0px",
                    background: "#fff",
                    cursorborder: "0px solid #1F2326",
                    zindex: "999",
                    autohidemode: !1,
                    enablemousewheel: !1,
                    touchbehavior: !0
                })
            }))
        },
        countdown: function() {
            var o, i = this;
            u(".countdown").length && (o = function(e, t, a) {
                var n, o = a - new Date;
                if (o < 0) return t.html('<div class="end">' + i.countdownEndMsg + "</div>"), clearInterval(e), !1;
                n = Math.floor(o / 864e5 * 1), a = Math.floor(o % 864e5 / 36e5 * 1), e = Math.floor(o % 864e5 % 36e5 / 6e4 * 1), o = Math.floor(o % 864e5 % 36e5 % 6e4 / 1e3 * 1), u(".days > div", t).html(n), u(".hours > div", t).html(a), u(".minutes > div", t).html(e), u(".seconds > div", t).html(o)
            }, u(".countdown").each(function() {
                var e, t, a = u(this),
                    n = new Date(a.data("date"));
                n && "[object Date]" === Object.prototype.toString.call(n) && !Number.isNaN(n) && (t = '<div class="days"><div></div><span>' + i.cDays + '</span></div><div class="hours"><div></div><span>' + i.cHours + '</span></div><div class="minutes"><div></div><span>' + i.cMinutes + '</span></div><div class="seconds"><div></div><span>' + i.cSeconds + "</span></div>", a.html(t)), e = setInterval(function() {
                    o(e, a, n)
                }, 1e3)
            }))
        },
        parallaxBg: function() {
            var o = this;
            !u.browser.mobile && 992 < u(window).innerWidth() ? u(window).on("scroll", function() {
                var n = u(window).scrollTop();
                u(".parallax-background").each(function() {
                    var e = u(this),
                        t = e.offset().top,
                        a = e.outerHeight();
                    o.isInViewport(this) && (t = n - t, t = Math.round(t / a * 100), e.css("background-position", "center " + parseInt(-t * (a / 250)) + "px"))
                })
            }) : u(".parallax-background").css({
                "background-position": "50% 50%",
                "background-size": "cover",
                "background-attachment": "scroll"
            })
        },
        isInViewport: function(e) {
            e = e.getBoundingClientRect();
            return (0 < e.height || 0 < e.width) && 0 <= e.bottom && 0 <= e.right && e.top <= (window.innerHeight || document.documentElement.clientHeight) && e.left <= (window.innerWidth || document.documentElement.clientWidth)
        },
        windowResize: function() {
            var t = this;
            u(window).resize(function() {
                var e = u(window).innerWidth();
                t.createMobileMenu(e), t.blogMetas(), u(window).innerWidth() < 751 && (u(".navbar > a.btn").addClass("btn-sm"), u(".navbar > a.btn").width("auto"))
            })
        },
        resizeVideos: function() {
            var e = u('iframe[src^="http://player.vimeo.com"], iframe[src^="https://player.vimeo.com"], iframe[src^="http://www.youtube.com"], iframe[src^="https://www.youtube.com"], object, embed');
            e.each(function() {
                var e = u(this),
                    t = e.attr("height") / e.attr("width");
                (t < .3 || .8 < t || Number.isNaN(t)) && (t = .559), e.attr("data-aspectRatio", t).removeAttr("height").removeAttr("width")
            }), u(window).resize(function() {
                e.each(function() {
                    var e = u(this),
                        t = e.parent().width();
                    e.width(t).height(t * e.attr("data-aspectRatio"))
                })
            }).resize()
        },
        contactForm: function() {
            if ($("#wish-form").length) {
            	// $(".wish-box").niceScroll({
             //       // cursorcolor: "#fff",
             //       // cursorwidth: "0px",
             //       // background: "#fff",
             //       cursorborder: "0px solid #1F2326",
             //       zindex: "999",
             //       preservenativescrolling: true,
             //       cursordragontouch: true,
             //       disablemutationobserver: true,
             //       // autohidemode: !1,
             //       // enablemousewheel: !1,
             //       // touchbehavior: !0
             //   });
                $("#wish-form").validate({
                    rules: {
                        name: {
                            required: true,
                        },
                        content: {
                            required: true,
                        },
                    },
        
                    messages: {
                        name: {
                            required: 'Vui lòng nhập tên của bạn.',
                            minlength: 'Tên phải lớn hơn 5 ký tự.',
                        },
                        content: {
                            required: 'Vui lòng nhập lời chúc.',
                            minlength: 'Lời chúc phải lớn hơn 10 ký tự.',
                        },
                        email: {
                            email: 'Địa chỉ email không hợp lệ.'
                        }
                    },
                    
                    errorPlacement: function(error, element) {
                        if (element.attr("name") == "content" ) {
                          error.insertAfter("#wish-form .vitualTextarea");
                        } else {
                          error.insertAfter(element);
                        }
                    },
                    submitHandler: function (form) {
                        $("#loader").css("display", "inline-block");
                        $.ajax({
                            type: "POST",
                            url: "/wish",
                            data: $(form).serialize(),
                            success: function (res) {
                                $( "#loader").hide();
                                if(!res.error){
                                    $('.wish-box').scrollTop(0);
                                    $('.wish-box').prepend('<div class="wish-box-item"><strong>'+$(form).find("input[name='name']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")+'</strong><p>'+$(form).find("textarea[name='content']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")+'</p></div>');
                                    $( "#success").html(res.message).slideDown( "slow" );
                                    setTimeout(function() {
                                    $( "#success").slideUp( "slow" );
                                    }, 5000);
                                }else{
                                    $( "#error").html(res.message).slideDown( "slow" );
                                    setTimeout(function() {
                                    $( "#error").slideUp( "slow" );
                                    }, 5000);
                                }
        
                                form.reset();
                            },
                            error: function() {
                                $( "#loader").hide();
                                $( "#error").slideDown( "slow" );
                                setTimeout(function() {
                                $( "#error").slideUp( "slow" );
                                }, 5000);
                            }
                        });
                        return false;
                    }
        
                });
            }
        },
        showError: function(e = "") {
            
        },
        objEvents: function() {
            u(".btn").each(function() {
                var e = u(this),
                    t = e.width(),
                    a = 2,
                    n = e.text().split(" ").length;
                2 < n || 0 !== e.find("i").length ? a = 15 : 1 < n && (a = 8), e.width(Math.round(t) + a)
            }), u("#couple .element .image").on("mouseenter", function() {
                var e = u(this);
                if (e.parent().is(":first-child") && !u(">.divider-about-us", e.closest(".row")).hasClass("flip")) return !1;
                e.hasClass("flip") || ((u("#couple .element .image.flip").length ? u("#couple .element .image") : e).toggleClass("flip"), u(">.divider-about-us", e.closest(".row")).toggleClass("flip"))
            }), u("#map_canvas").on("mouseenter", function() {
                u(".location-info").addClass("open")
            }).on("mouseleave", function() {
                u(".location-info").removeClass("open")
            }), u(".nav-logo, .scrollto").on("click", function(e) {
                var t = u(this),
                    a = 0,
                    n = t.attr("href");
                /#/.test(n) && u(n).length && (e.preventDefault(), "#hero" !== n && (a = u(n).offset().top - 65), u("html, body").stop().animate({
                    scrollTop: a
                }, 1500, "easeInOutExpo", function() {
                    t.blur()
                }))
            }), u(".element-v2").length && u(".element-v2").each(function() {
                var e = u(">.image", u(this));
                e.css({
                    "background-image": "url(" + u(">img", e).attr("src") + ")"
                }), u(">img", e).hide()
            }), u(".overflow-image").length && u(".overflow-image").each(function() {
                var e = u(this);
                e.css({
                    "background-image": "url(" + u(">img", e).attr("src") + ")"
                })
            }), u(".progress").length && u(".progress").waypoint(function() {
                u(".progress").each(function() {
                    u("> .progress-bar", u(this)).delay(300).queue(function(e) {
                        var t = u(this);
                        t.css("width", t.attr("aria-valuenow") + "%"), e()
                    })
                })
            }, {
                triggerOnce: !0,
                offset: "bottom-in-view"
            })
        },
        parallaxTimeline: function() {
            var i;
            this.timelineParallax && (i = function(n) {
                u("> div", this).each(function() {
                    var e = u(this),
                        t = e.attr("data-parallax"),
                        a = n.clientX * t / 300,
                        t = n.clientY * t / 300;
                    e.css({
                        "-webkit-transform": "translateX(" + a + "px) translateY(" + t + "px)",
                        "-moz-transform": "translateX(" + a + "px) translateY(" + t + "px)",
                        "-ms-transform": "translateX(" + a + "px) translateY(" + t + "px)",
                        "-o-transform": "translateX(" + a + "px) translateY(" + t + "px)",
                        transform: "translateX(" + a + "px) translateY(" + t + "px)"
                    })
                })
            }, 992 < u(window).innerWidth() && u(window).scroll(function() {
                var n = u(window).scrollTop(),
                    o = u(window).height();
                u('.timeline [class^="template-"]').each(function() {
                    var e = u(this),
                        t = e.offset().top,
                        a = e.height();
                    t <= n + o && n <= t + a ? e.on("mousemove", i) : e.off("mousemove", i)
                })
            }))
        },
        blogMetas: function() {
            var e = u(".info-blog .bottom-info, .post-content .bottom-info");
            e.length && e.each(function() {
                var e = u(this);
                35 < e.height() ? e.addClass("center") : e.removeClass("center")
            })
        },
        animateElems: function() {
            function e() {
                u("[data-animation-delay]").each(function() {
                    var e = u(this),
                        t = u(window).scrollTop(),
                        a = u(window).height(),
                        n = parseInt(e.attr("data-animation-delay"), 10),
                        o = e.data("animation-direction");
                    if (void 0 === o) return !1;
                    e.addClass("animate-" + o), u(document).ready(function() {
                        t + a >= e.offset().top && (Number.isNaN(n) || 0 === n ? e.removeClass("animate-" + o).addClass("animation-" + o) : setTimeout(function() {
                            e.removeClass("animate-me").addClass("animation-" + o)
                        }, n))
                    })
                })
            }
            751 <= u(window).innerWidth() ? (u(window).scroll(function() {
                e()
            }), e()) : u("[data-animation-delay]").addClass("visible")
        }
    }).init();
    
    $(document).on('click', '.calendar-button-custom-click', function(){
    	$(this).parent().find('.calendar-button .atcb-click').click();
    });
    
    /*------------------------------------------
        = COUNTDOWN CLOCK
    -------------------------------------------*/
     if ($("#clock").length) {
        function timeElapse(date){
            var current = Date();
            var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
            var days = Math.floor(seconds / (3600 * 24));
            if (days < 10) {
                days = "0" + days;
            }
            seconds = seconds % (3600 * 24);
            var hours = Math.floor(seconds / 3600);
            if (hours < 10) {
                hours = "0" + hours;
            }
            seconds = seconds % 3600;
            var minutes = Math.floor(seconds / 60);
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            seconds = seconds % 60;
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var html = '<div class="box"><div>' + days + '</div> <span>'+ $('#clock').data('text-day') +'</span></div><div class="box"><div>' + hours + '</div> <span>'+ $('#clock').data('text-hour') +'</span> </div><div class="box"><div>' + minutes + '</div> <span>'+ $('#clock').data('text-minute') +'</span> </div><div class="box"><div>' + seconds + '</div> <span>'+ $('#clock').data('text-second') +'</span></div>';
            $('#clock').html(html);
        }
		var time = $('#clock').data('date');

        $('#clock').countdown(time.replace(/-/g,'/'), function(event) {
            if(event.type == 'stoped'){
                var together = new Date($('#clock').data('date'));           
                together.setHours(0);                           
                together.setMinutes(0);             
                together.setSeconds(0);                 
                together.setMilliseconds(0);
                setInterval(function() {
                    timeElapse(together);
                }, 1000);
            }else{
                var $this = $(this).html(event.strftime(''
                + '<div class="box"><div>%D</div> <span>'+ $('#clock').data('text-day') +'</span> </div>'
                + '<div class="box"><div>%H</div> <span>'+ $('#clock').data('text-hour') +'</span> </div>'
                + '<div class="box"><div>%M</div> <span>'+ $('#clock').data('text-minute') +'</span> </div>'
                + '<div class="box"><div>%S</div> <span>'+ $('#clock').data('text-second') +'</span> </div>'));
            }
        });

        $(document).on('click', '.crypto-item', function(){
            let parent = $(this).parents('.donate-card');
            parent.find('.cryptos-box-view').show();
            parent.find('.cryptos-box-view .coin-img').html('<img src="'+$(this).data('img')+'" />');
            parent.find('.cryptos-box-view .coin-id').html($(this).data('id'));
            parent.find('.cryptos-box-view .coin-address').html($(this).data('address'));
            parent.find('.cryptos-box-view .coin-qr-code').html('').qrcode({width: 160,height: 160,text: $(this).data('address')});
        });
        
        $(document).on('click', '.cryptos-box-view-close', function(){
            let parent = $(this).parents('.donate-card');
            parent.find('.cryptos-box-view').hide();
        });
    }

    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect  : "elastic",
            closeEffect : "elastic",
            wrapCSS     : "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-play-btn").length) {
        $(".video-play-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }


    /*------------------------------------------
        = POPUP YOUTUBE, VIMEO, GMAPS
    -------------------------------------------*/
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });    


    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
              enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    }


    /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
    function sortingGallery() {
        if ($(".sortable-gallery .gallery-filters").length) {
            var $container = $('.gallery-container');
            $container.isotope({
                filter:'*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".gallery-filters li a").on("click", function() {
                $('.gallery-filters li .current').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter:selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingGallery();


    /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid =  $('.masonry-gallery').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });
        }
    }

    masonryGridSetting();
    
    $('.button-see').on('click', function() {
    	let _this = $(this);
        let content = _this.data('content');
        let name = _this.data('name');
        let instagram = _this.data('instagram');
        let twitter = _this.data('twitter');
        let facebook = _this.data('facebook');
        let contentHtml = '<img src="'+ _this.data("src") +'">\
            <div class="content text-center">\
            <h3 class="my-2">'+ name +'</h3>\
            <p class="mb-2">'+ content +'</p>\
            <ul class="sn-icons">\
            ';
        if (instagram) {
            contentHtml += '<li><a href="'+ instagram +'"><i class="fab fa-instagram-square"></i></a></li>';
        }

        if (twitter) {
            contentHtml += '<li><a href="'+ twitter +'"><i class="fab fa-twitter-square"></i></a></li>';
        }

        if (facebook) {
            contentHtml += '<li><a href="'+ facebook +'"><i class="fab fa-facebook-square"></i></a></li>';
        }

        contentHtml += '</ul>\
        </div>';
		$.fancybox({
                href: _this.data("src"),
                type: 'html',
                // title: _this.data("title"),
                content: contentHtml,
                helpers: {
                    title : { type : 'inside' },
                },
                maxWidth: 500,
                minHeight:500,
                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                },
            });
            return false
		
	});

            /*------------------------------------------
    = MENU ACCESSBILITY
    -------------------------------------------*/
    $('.btn-menu-open').click(function() {
        $('ul.list-menu-icon').css('opacity','1');
        $('ul.list-menu-icon').css('pointer-events','');
        $('.btn-menu-close').show();
        $('.btn-menu-open').hide();
    })
    $('.btn-menu-close').click(function() {
        $('ul.list-menu-icon').css('opacity','0');
        $('ul.list-menu-icon').css('pointer-events','none');
        $('.btn-menu-open').show();
        $('.btn-menu-close').hide();
    })
    setTimeout(() => {
        $('.btn-menu-open').hide();
        $('.btn-menu-close').show();
        $('ul.list-menu-icon').css('opacity','1');
    }, 3000); 
    if($('.bii-logo').length > 0){
       $('#menu-access').css('bottom','278px');
       document.querySelector('style').textContent += "@media (max-width: 799px){#menu-access{bottom: 238px!important;}}"
    }
    function shakeTooltip(){
        var arrTooltip = $('ul.list-menu-icon').children();
        arrTooltip.each(function(index) {
            setTimeout(() => {
                if(document.querySelector('.btn-menu-close').style.display !== "none"){  
                    $(this).addClass('shake');
                    $(this).children().children().children('.tooltiptext').css('visibility','visible');
                    setTimeout(() => {
                        $(this).children().children().children('.tooltiptext').css('visibility','');
                        $(this).removeClass('shake');
                    }, 3000);
                } else{
                    return false;
                }
            }, index*5000); 
        });   
    }
    if($('#menu-access').length >0){
        setTimeout(() => {
            shakeTooltip();
            myInterval = setInterval(shakeTooltip, 20000);
        }, 3000);
    }
    $('.btn-menu-close').click(function(){
        $('tooltiptext').css('visibility','');
        clearInterval(myInterval);
    });

    // ALBUM GALLERIES
	$(document).on('click', '.btn-see-more-gallery', function(e){
		e.preventDefault();
		let indexNumber = $(this).data('index') || 0;
		$(this).lightGallery({
		thumbnail: true,
		dynamic: true,
		dynamicEl: photoGalleries,
		download: false,
		autoplay: true,
		preload: 2,
		appendSubHtmlTo: '.lg-item',
		index: parseInt(indexNumber)
		});
	});

    $(document).on('click', '.qr-code-image', function(){
        let srcImage = $(this).attr('src');
        $(this).lightGallery({
            thumbnail: true,
            dynamic: true,
            dynamicEl:  [{
                src: srcImage,
            }],
            download: false,
            autoplay: true,
            preload: 2,
            appendSubHtmlTo: '.lg-item',
        });
    });
    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    
}(jQuery);