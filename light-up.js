/*
* This is some prototype light box plugin 
* Developer: Lord Acheampong Offei
* github: github/LORD-KAY 
* Animation Effect: animate.css
*/
(function($){
	$.fn.LightUp = function(options){
		"use strict";
		//Defining the selector
		var $lightUp = $(this);
		//Extending the default values to make use of other options
		var settings = $.extend(
				{},
				$.fn.LightUp.defaults,
				options);
		//Defining the components for the light-up
		var overlay = $('<div id="overlay-lightUp" class="animated fadeIn"></div>'),
			overlay_header = $('<div id="overlay-header" class="animated fadeIn"></div>'),
			overlay_body  = $('<div id="overlay-body"></div>'),
			overlay_innerBody = $('<div id="overlay-innerBody"></div>'),
			overlay_imgContainer = $('<div></div>'),
			overlay_bottomSheet  = $('<div id="overlay_btsheet"></div>'),
			imgTag   = $("<img/>"),
			navBarRight = $('<ul id="navBarRight"><li><a href="javascript:void(0)" id="close" class="waves-effect waves-ripple waves-circle"><i class="material-icons cmake">arrow_back</i></i></li></ul>'),
			navBarLeft  = $('<ul id="navBarLeft"><li><a class="waves-circle waves-ripple waves-effect"><i class="material-icons cmake">info</i></a></li></ul>'),
			imageProfile = $('<li class="imageProfile"><a class="waves-effect waves-ripple waves-circle"><img class="responsive-img"/></a><span class="data-name">Acheampong Lord</span></li>');

		//Checking if the function is not null
		function isDefined(Plugin){
			return typeof Plugin !== "undefined";
		}

		function getSettings(){
			if (isDefined(settings)) {
				return settings;
			}
		}

		function getTHEME(){
			if (isDefined($.LightUp)) {
				return $.LightUp;
			}
		}

		function imgAsBackground(){
			if (settings.useImageAsBackground && settings.useImageAsBackground == true) {
       			overlay.css({
	       			"background-image":"url('"+_getImgsrc+"')",
	       			"background-size":"cover",
	       			"background-position":"center",
	       			"background-repeat":"no-repeat",
	       			"position":"absolute",
	       			"z-index":"10",
	       			"top":"0",
	       			"left":"0",
	       			"filter":"blur(30px)",
	       			"-webkit-filter":"blur(30px)",
	       			"opacity":"0.8",
	       			"margin-left":"-10px"
	       		});
       		}
       		else if (settings.useImageAsBackground && settings.useImageAsBackground == false) {
       			overlay.css({
       				"background-color":"rgba(255,255,255,255)",
       				"background-position":"center",
       				"z-index":"10"
       			});
       		}
       	}

		function hideHeader(){
			if (settings.hideHeader && settings.hideHeader == true) {
				overlay_header.css({"background-color":"rgba(0,0,0,0.1)","box-shadow":"none"});
				navBarRight.find(".cmake").css("color","rgba(255,255,255,255)");
				navBarLeft.find(".cmake").css("color","rgba(255,255,255,255)");
			}else if (settings.hideHeader && settings.hideHeader == false) {
				overlay_header.css({"background-color":"rgba(255,255,255,255)"});
				navBarRight.find(".cmake").css({"color":"rgba(255,255,255,255)"});
				navBarLeft.find(".cmake").css({"color":"rgba(255,255,255,255)"});
			}
		}

		//Drawing the canvas for the Light Up 
		function DrawCanvas(){
			$("body").append(overlay);
			$("body").append(overlay_header);
			$("body").append(overlay_body);
			overlay_header.append(navBarRight);
			overlay_header.append(navBarLeft);
			navBarRight.append(imageProfile);
			$("li.imageProfile > a > img").attr({"src":""+_getImgsrc+"","id":"imgY90LLY","alt":""+_getImgsrc+""}).css({"width":"40px","height":"40px"});
			overlay_body.append(overlay_innerBody);
			overlay_innerBody.append(overlay_imgContainer);
			overlay_innerBody.append(overlay_bottomSheet);

		}
		//Assigning ids to the images
		var _getImage = $lightUp.children(),
			_getImgsrc,
			_closeItem = navBarRight.find("#close");
	    $.each(_getImage,function(index,value){
	    	$(this).attr("id","lp-"+index);
	    });

	    //Getting all the images inside the container
	    var dataImg,__imgHref,objImages,$asArray,$pathURI,$tagSRC;

		for (var i = 0; i < _getImage.length; i++) {
			 dataImg = _getImage[i];
			 __imgHref = $(dataImg).attr("href");
			objImages = $('<img src="'+ __imgHref +'" class="responsive-img"/>');
			overlay_imgContainer.append(objImages);
		}

		_getImage.bind("click tap",function(event){
			window.location.hash = $(this).attr("id");
       		 event.preventDefault();
       		_getImgsrc = $(this).attr("href");
       		DrawCanvas();
       		overlay_imgContainer.css({
       			"width":"55%",
       			"height":"100%",
       			"position":"absolute",
       			"top":"0px",
       			"left":"300px",
       			"background-color":"black"
       		});

       		$asArray = overlay_imgContainer.children();
       		$asArray.css({
       			"display":"none",
       		});

       		for (var i = 0; i < $asArray.length; i++) {
       			$pathURI = $($asArray[i]);
       			$pathURI.addClass("lp-image");
       			if ($pathURI.attr("src") === _getImgsrc) {
       				$pathURI.css({"display":"block"});
       				$pathURI.addClass("active");
       			}

       		}
       		//Callling the background image function here
       		imgAsBackground();
       		hideHeader();
       		// overlay_imgContainer.append(imgTag);
       		// imgTag.attr("src",""+_getImgsrc+"");
		});	

		_closeItem.click(function(){
	    	overlay.detach();
	    	overlay_header.detach();
	    	overlay_body.detach();
	    	overlay_imgContainer.detach();
	    	//Calling the hash uri removal uri
	    	RemoveHashURL();

	    });

	    function RemoveHashURL(){
	    	var URI = window.location.href,
	           converter = URI.toString(),
	           hashPosition = converter.indexOf("#");
	           if (hashPosition > 0) {
	           	var localURI = converter.substring(0,hashPosition);
	           	window.history.replaceState({},document.title,localURI);
	           }
	    }

		function CheckDownloadButton(){
			var downloadBtn = '';
			if (settings.downloadButton && settings.downloadButton == true) {
			   downloadBtn = '<li><a class="waves-circle waves-ripple waves-effect" id="download"><i class="material-icons cmake">file_download</i></a></li>';
			   navBarLeft.prepend(downloadBtn);

			}else if (settings.downloadButton && settings.downloadButton == false){
				return;
			}
		}
		//Check for fullscreen browser support
		function CheckFullscreen(){
			var fullscreen = '';
			if (!document.fullscreenEnabled && !document.webkitFullscreenEnabled && 
				!document.mozFullScreenEnabled && !document.msFullscreenEnabled) {
				return;
			}else{
				fullscreen = '<li><a id="fullscreen" class="waves-circle waves-ripple waves-effect"><i class="material-icons cmake">fullscreen</i></a></li>';
				navBarLeft.prepend(fullscreen);
			}
		}

		function requestFullscreen(){
			var el = document.documentElement;
			if (el.requestFullscreen) {
				el.requestFullscreen();
			}else if (el.msRequestFullscreen) {
				el.msRequestFullscreen();
			}else if (el.mozRequestFullScreen) {
				el.mozRequestFullScreen();
			}
			else if (el.webkitRequestFullscreen) {
				el.webkitRequestFullscreen();
			}
		}

		function exitFullscreen(){
			var _exit = document.exitFullscreen;
			if (_exit) {
				document.exitFullscreen();
			}
			else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
		//Calling the init functions
		CheckDownloadButton();
		CheckFullscreen();

		navBarLeft.children().find("#fullscreen").on("click",function(element,event){
			if (!document.fullscreenElement && !document.msFullscreenElement && 
				!document.mozFullScreenElement && !document.webkitFullscreenElement) {
				requestFullscreen();
			}
			else{
				exitFullscreen();
			}
		});



		navBarLeft.children().find("#download").click(function(event){
			var x = document.getElementsByClassName("lp-image");
			for(var i = 0; i < x.length; i ++){
				var imgStyle = x[i].style.display;
				//using switch case for the configs
				switch(imgStyle)
				{
					case "block":
      //                   var _aTagger = document.createElement("a");
						// _aTagger.href = ""+ $(x[i]).attr("src")+"";
						// _aTagger.download = ""+ $(x[i]).attr("src")+"";
						// document.body.appendChild(_aTagger);
						// _aTagger.click();
						// document.body.removeChild(_aTagger);
						console.log("Yay");
						break;
					case "none":
						return "";
						break;
				}
			}

		});


		//Configuring the theme
		var _getTheme = settings.theme;
		switch(_getTheme){
			case "DARK":
				 overlay.css({
				 	"background-color":"rgba(0,0,0,0.90) !important"
				 });
				break;
			case "LIGHT":
				overlay.css({"background-color":"rgba(255,255,255,255)"});
				break;

		}

		return $.extend({},this,{
			"getSettings":getSettings,
			"getTHEME": getTHEME,
		});
	};

	//Defining the themes for the light up
	$.LightUp = {
		DARK_THEME:"DARK",
		LIGHT_THEME:"LIGHT",
		RED_THEME:"RED"
	};

	//Defining the default option variables
	$.fn.LightUp.defaults = {
		downloadButton:true,
		bottomSheet:false,
		useImageAsBackground:true,
		hideHeader:true,
		theme:$.LightUp.DARK_THEME,
	};
}(jQuery));