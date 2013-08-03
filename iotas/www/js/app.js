var defaultLights = [ ["Huey", "huey.local" ], ["Dewey", "dewey.local"], ["Louie", "louie.local"], ["Rose", "rose.local" ], ["Indigo", "indigo.local" ], ["Violet", "violet.local" ] ];
var lights = [null, null, null];		// The array of lights
var currentLight = null;
var theApp = null;

;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $(document).ready(function() {
/*     $.fn.foundationAlerts           ? $doc.foundationAlerts() : null; */
/*     $.fn.foundationButtons          ? $doc.foundationButtons() : null; */
/*     $.fn.foundationAccordion        ? $doc.foundationAccordion() : null; */
/*     $.fn.foundationNavigation       ? $doc.foundationNavigation() : null; */
/*     $.fn.foundationTopBar           ? $doc.foundationTopBar() : null; */
/*     $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null; */
/*     $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null; */
/*     $.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null; */
/*     $.fn.foundationTooltips         ? $doc.foundationTooltips() : null; */
/*     $.fn.foundationMagellan         ? $doc.foundationMagellan() : null; */
/*     $.fn.foundationClearing         ? $doc.foundationClearing() : null; */

    //$('input, textarea').placeholder();

	// Create and setup the current lights
	//console.log(defaultLights.length);
	for (var j=0; j < defaultLights.length; j++) {
		//console.log(defaultLights[j][1]);
		lights[j] = new Light(defaultLights[j][1]);
		//console.log(lights[j]);
	}
	currentLight = lights[0];
	//console.log(currentLight);

  });

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }
  
  // App Click
/*   $('.app').click(function(){ */
/* 	  $(this).toggleClass('off'); */
/*   }); */
    
  // Light Selected
/*   $('.light').click(function(){ */
/* 	  $('.light').removeClass('selected'); */
/* 	  $(this).addClass('selected'); */
/* 	  var selection = $(this).attr('id'); */
/* 	  currentLight = lights[selection]; */
/* 	  console.log(currentLight); */
/*   }); */
  
  // /* Ajax */ Apps
/*   $(".app > a").click(function(){ */
/*   	var appid = $(this).attr('id'); */
/*   	console.log("apps/" + appid + "/" + appid + ".html"); */
/*
	  $.ajax({
		  url: "apps/book/book.html",
		  success: function(html){
		    $("body").append(html);
		  }
		});
*/
/* 	  $("#" + appid + "-app").reveal(); */
/* 	  loadApp(appid); */
/*   }); */
  
/*   $('.close-reveal-modal').click(function(){ */
/* 	 var cross = $(this).parent().attr('id'); */
/* 	 var parts = cross.split('-'); */
/* 	 var crossid = parts[0]; */
/* 	 console.log(crossid); */
/* 	 quitApp(crossid); */
/*   }); */
    
  // Last One Out, Turn Out The Lights :)

})(jQuery, this);

// App Start
function loadApp(theid) {
	console.log(theid);
	evalstr = "theApp = new " + theid + "()";
	eval(evalstr);
	theApp.appStart();
}

// App Quit
function quitApp(theid) {
	theApp.appQuit();
	theApp = null;
}