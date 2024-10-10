Date.now || (Date.now = function () {
    return (new Date).getTime()
}), function () {
    "use strict";
    for (var e = ["webkit", "moz"], t = 0; t < e.length && !window.requestAnimationFrame; ++t) {
        var i = e[t];
        window.requestAnimationFrame = window[i + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var n = 0;
        window.requestAnimationFrame = function (e) {
            var t = Date.now(), i = Math.max(n + 16, t);
            return setTimeout(function () {
                e(n = i)
            }, i - t)
        }, window.cancelAnimationFrame = clearTimeout
    }
}();
var snowFall = function () {
    function e() {
        var e = {
            flakeCount: 35,
            flakeColor: "#ffffff",
            flakeIndex: 999999,
            minSize: 1,
            maxSize: 2,
            minSpeed: 1,
            maxSpeed: 5,
            round: !1,
            shadow: !1,
            collection: !1,
            image: !1,
            collectionHeight: 40
        }, t = [], n = {}, o = 0, s = 0, a = 0, r = 0, l = function (e, t) {
            for (var i in t) e.hasOwnProperty(i) && (e[i] = t[i])
        }, h = function (e, t) {
            return Math.round(e + Math.random() * (t - e))
        }, m = function (e, t) {
            for (var i in t) e.style[i] = t[i] + ("width" == i || "height" == i ? "px" : "")
        }, d = function (t, i, n) {
            this.x = h(a, s - a), this.y = h(0, o), this.size = i, this.speed = n, this.step = 0, this.stepSize = h(1, 10) / 100, e.collection && (this.target = canvasCollection[h(0, canvasCollection.length - 1)]);
            var r = null;
            e.image ? (r = new Image, r.src = e.image) : (r = document.createElement("div"), m(r, {background: e.flakeColor})), r.className = "snowfall-flakes", m(r, {
                width: this.size,
                height: this.size,
                position: "absolute",
                top: this.y,
                left: this.x,
                fontSize: 0,
                zIndex: e.flakeIndex
            }), e.round && m(r, {
                "-moz-border-radius": ~~e.maxSize + "px",
                "-webkit-border-radius": ~~e.maxSize + "px",
                borderRadius: ~~e.maxSize + "px"
            }), e.shadow && m(r, {
                "-moz-box-shadow": "1px 1px 1px #555",
                "-webkit-box-shadow": "1px 1px 1px #555",
                boxShadow: "1px 1px 1px #555"
            }), t.tagName === document.body.tagName ? document.body.appendChild(r) : t.appendChild(r), this.element = r, this.update = function () {
                this.y += this.speed, this.y > o - (this.size + 6) && this.reset(), this.element.style.top = this.y + "px", this.element.style.left = this.x + "px", this.step += this.stepSize, this.x += Math.cos(this.step), (this.x + this.size > s - a || this.x < a) && this.reset()
            }, this.reset = function () {
                this.y = 0, this.x = h(a, s - a), this.stepSize = h(1, 10) / 100, this.size = h(100 * e.minSize, 100 * e.maxSize) / 100, this.element.style.width = this.size + "px", this.element.style.height = this.size + "px", this.speed = h(e.minSpeed, e.maxSpeed)
            }
        }, f = function () {
            for (var e = 0; e < t.length; e += 1) t[e].update();
            r = requestAnimationFrame(function () {
                f()
            })
        };
        return {
            snow: function (r, m) {
                for (l(e, m), n = r, o = n.offsetHeight, s = n.offsetWidth, n.snow = this, "body" === n.tagName.toLowerCase() && (a = 25), window.addEventListener("resize", function () {
                    o = n.clientHeight, s = n.offsetWidth
                }, !0), i = 0; i < e.flakeCount; i += 1) t.push(new d(n, h(100 * e.minSize, 100 * e.maxSize) / 100, h(e.minSpeed, e.maxSpeed)));
                f()
            }, clear: function () {
                var e = null;
                e = n.getElementsByClassName ? n.getElementsByClassName("snowfall-flakes") : n.querySelectorAll(".snowfall-flakes");
                for (var t = e.length; t--;) e[t].parentNode === n && n.removeChild(e[t]);
                cancelAnimationFrame(r)
            }
        }
    }

    return {
        snow: function (t, i) {
            if ("string" == typeof i) if (t.length > 0) for (var n = 0; n < t.length; n++) t[n].snow && t[n].snow.clear(); else t.snow.clear(); else if (t.length > 0) for (var n = 0; n < t.length; n++) (new e).snow(t[n], i); else (new e).snow(t, i)
        }
    }
}();
var SNOW_Picture = biicore.webroot + '/common/imgs/heart.png';
var special_custom = ['646f6e3d778825e6f306667f', '64a04f6beb89a210fc07656a'];
window.onload = (event) => {
    if (biicore.effect.type == 'none') return false;
    setTimeout(function () {
        if (biicore.effect.type == 'heart') {
            let flakeCount = 30;
            if (typeof biicore.template_id !== 'undefined' && special_custom.includes(biicore.template_id)) {
                flakeCount = 5;
                if (window.innerWidth <= 650) {
                    flakeCount = 3;
                }
            }
            snowFall.snow(document.getElementsByTagName('body')[0], {
                image: SNOW_Picture,
                minSize: 15,
                maxSize: 32,
                flakeCount: flakeCount,
                maxSpeed: 3,
                minSpeed: 1
            });
        } else if (biicore.effect.type == 'snow') {
            let flakeCount = 250;
            if (typeof biicore.template_id !== 'undefined' && special_custom.includes(biicore.template_id)) {
                flakeCount = 50;
                if (window.innerWidth <= 1200) {
                    flakeCount = 30;
                }
                if (window.innerWidth <= 650) {
                    flakeCount = 25;
                }
            }
            snowFall.snow(document.getElementsByTagName('body')[0], {
                round: true,
                shadow: true,
                flakeCount: flakeCount,
                minSize: 1,
                maxSize: 8
            });
        } else if (biicore.effect.type == 'custom') {
            let effectSetting = biicore.effect.setting;
            let minSpeed = (parseInt(effectSetting.speed) - 3);
            if (minSpeed <= 0) minSpeed = 1;
            snowFall.snow(document.getElementsByTagName('body')[0], {
                image: effectSetting.icon,
                minSize: effectSetting.minSize,
                maxSize: effectSetting.maxSize,
                flakeCount: effectSetting.number,
                maxSpeed: effectSetting.speed,
                minSpeed: minSpeed
            });
        }
    }, 300);

    if (document.getElementsByTagName('body')[0].clientHeight > window.innerHeight) {
        setTimeout(() => {
            document.querySelector('.mouse-scroll-on-mobile').style.visibility = "visible";
        }, 800);
    }

    showContentWishSuggestions.forEach(function (content) {
        content.addEventListener('click', function (event) {
            event.preventDefault();
            let text = this.textContent || this.innerText;
            document.getElementById('content').value = text;
        });
    });
};

window.addEventListener('scroll', (event) => {
    if (window.scrollY > 50) {
        document.querySelector('.mouse-scroll-on-mobile').style.visibility = "hidden";
    }
});
var scrollDownText = (typeof biicore.scroll_down_text != 'undefined' && biicore.scroll_down_text !== '') ? biicore.scroll_down_text : 'Kéo xuống';
document.write(`
	<style type=text/css>
	.mouse-scroll-on-mobile{display:none;}
	@media screen and (max-width: 576px){
		.mouse-scroll-on-mobile{width:95px;height:30px;margin:0 0 0 -30px;position:fixed;right:calc(50% - 52px);bottom:80px;-webkit-animation:arrow .5s 1s infinite ease-in-out alternate;z-index:999;display:block!important;visibility:hidden}
		.mouse-scroll-on-mobile:hover{-webkit-animation-play-state:paused}
		.mouse-scroll-on-mobile .mouse-scroll-on-mobile-text{text-align:center;bottom:120px;position:absolute;left:1px;background:#fff;padding:5px 10px;border-radius:3px;font-size:15px;color: #000;}
		.mouse-scroll-on-mobile .mouse-scroll-on-mobile-left{position:absolute;height:5px;width:30px;background:#de4659;-webkit-transform:rotate(240deg);bottom:80px;left:42px;-webkit-border-radius:4px;-webkit-transform-origin:5px 50%;-webkit-animation:leftArrow .5s 1s infinite ease-out alternate}
		.mouse-scroll-on-mobile .mouse-scroll-on-mobile-right{position:absolute;height:5px;width:30px;background:#de4659;-webkit-transform:rotate(-60deg);bottom:80px;left:46px;-webkit-border-radius:4px;-webkit-transform-origin:5px 50%;-webkit-animation:rightArrow .5s 1s infinite ease-out alternate}}
		@-webkit-keyframes arrow{0%{bottom:0}100%{bottom:40px}}
		@-webkit-keyframes leftArrow{100%{-webkit-transform:rotate(225deg)}}
		@-webkit-keyframes rightArrow{100%{-webkit-transform:rotate(-45deg)}}
	</style>
	<div class="mouse-scroll-on-mobile">
		<div class="mouse-scroll-on-mobile-text">${scrollDownText}</div>
		<div class="mouse-scroll-on-mobile-left"></div>
		<div class="mouse-scroll-on-mobile-right"></div>
	</div>

	`)
if (biicore.alert && Object.keys(biicore.alert).length > 0 && biicore.alert.status == 1) {
    setTimeout(function () {
        Swal.fire({
            title: biicore.alert.title,
            html: biicore.alert.content,
            showCloseButton: false,
            showConfirmButton: false,
            showCancelButton: true,
            focusCancel: true,
            cancelButtonText: (typeof biicore.alert.cancel_button_text != 'undefined' && biicore.alert.cancel_button_text != '') ? biicore.alert.cancel_button_text : 'Tắt thông báo',
        });
    }, biicore.alert.timeout);
}

var showButtonWishSuggestions = document.querySelector('.show-autocomplete');
var hideButtonWishSuggestions = document.querySelector('.hide-autocomplete');
var showContentWishSuggestions = document.querySelectorAll('.showContent');

var toggleDisplayWishesAutocomplete = function (check = false) {
    let content = document.querySelector('.wishes-autocomplete-content');
    let isShowing = showButtonWishSuggestions.style.display === 'none';
    if (check && !isShowing) {
        return;
    }
    content.style.display = isShowing ? 'none' : '';
    showButtonWishSuggestions.style.display = isShowing ? '' : 'none';
    hideButtonWishSuggestions.style.display = isShowing ? 'none' : '';
};

if (showButtonWishSuggestions && hideButtonWishSuggestions) {
    showButtonWishSuggestions.addEventListener('click', function () {
        toggleDisplayWishesAutocomplete(false);
    });
    hideButtonWishSuggestions.addEventListener('click', function () {
        toggleDisplayWishesAutocomplete(false);
    });
    document.body.addEventListener('click', function (event) {
        if (event.target === document.body || (!showButtonWishSuggestions.contains(event.target) && !hideButtonWishSuggestions.contains(event.target) && !document.getElementById('searchWishSuggestions').contains(event.target) && !Array.from(showContentWishSuggestions).some(function (element) {
            return element.contains(event.target);
        }))) {
            toggleDisplayWishesAutocomplete(true);
        }
    });
}

function searchWishSuggestionsFunction() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchWishSuggestions');
    filter = removeVietnameseTones(input.value.toUpperCase());
    ul = document.getElementById("wishSuggestions");
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (removeVietnameseTones(txtValue.toUpperCase()).indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "A");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "E");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "I");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "O");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "U");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "Y");
    str = str.replace(/đ/g, "D");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/[^a-zA-Z0-9 ]/g, "");
    return str;
}


1