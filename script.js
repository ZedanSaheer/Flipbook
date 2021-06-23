const button = document.getElementById("fullscreen");
const customise=document.getElementById("customise");
const share= document.getElementsByClassName("at-expanding-share-button-toggle-bg");

$(function () {
    var $mybook = $('#mybook');
    var $bttn_next = $('#next_page_button');
    var $bttn_prev = $('#prev_page_button');
    var $loading = $('#loading');
    var $mybook_images = $mybook.find('img');
    var cnt_images = $mybook_images.length;
    var loaded = 0;

    $mybook_images.each(function () {
        var $img = $(this);
        var source = $img.attr('src');
        $('<img/>').load(function () {
            ++loaded;
            if (loaded == cnt_images) {
                $loading.hide();
                $bttn_next.show();
                $bttn_prev.show();
                $mybook.show().booklet({
                    name: null,                            
                    width: 900,                              
                    height: 600,                              
                    speed: 600,                             
                    direction: 'LTR',                           
                    
                    next: $bttn_next,          			 
                    prev: $bttn_prev,          			
                });
            }
        }).attr('src', source);
    });

});

//sound on page swipe
function pageSound(){
    const x = document.getElementById("page")
    x.play();
}

//full screen toggle

if (!Element.prototype.requestFullscreen) {
	Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
}


if (!document.exitFullscreen) {
	document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    customise.style.display="block";
}

if (!document.fullscreenElement) {

	Object.defineProperty(document, 'fullscreenElement', {
		get: function() {
			return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
		}
	});

	Object.defineProperty(document, 'fullscreenEnabled', {
		get: function() {
			return document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitFullscreenEnabled;
		}
	});
}

document.addEventListener('click', function (event) {
	if (!event.target.hasAttribute('data-toggle-fullscreen')) return;

	if (document.fullscreenElement) {
		document.exitFullscreen();
        button.innerText="Toggle Fullscreen";
	} else {
		document.documentElement.requestFullscreen();
	}
   
}, false);

//hide customize box on fullscreen

document.addEventListener("fullscreenchange",(e)=>{
    if (document.fullscreenElement) {
        customise.style.display="none";
        share[0].style.display="none";
      } else {
        customise.style.display="flex";
        share[0].style.display="block";
      }
})

//background changer

var color;
var defaultColor = "#0000ff";

window.addEventListener("load", startup, false);

function startup() {
  color = document.querySelector("#color");
  color.value = defaultColor;
  color.addEventListener("input", updateFirst, false);
}
function updateFirst(event) {
  var body = document.body;
  if (body) {
    body.style.backgroundColor = event.target.value;
  }
}
