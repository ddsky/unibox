(function($) {
 
    $.fn.unibox = function(options) {
 
 		var searchBox = this;
 
 		// settings with default options.
        var settings = $.extend({
            // these are the defaults.
            suggestUrl: '',
			queryVisualizationHeadline: '',
			highlight: true,
			throttleTime: 300,
			animationSpeed: 300,
			enterCallback: undefined,
			minChars: 2,
			maxWidth: searchBox.outerWidth()
        }, options);
		
        UniBox.init(searchBox, settings);
 
        return this; 
    };
 
}(jQuery));


var UniBox = function() {
    //// common vars
    // div line height
    
    // index of selected entry
    var selectedEntryIndex = -1;
	
	// the search box
	var searchBox;
	
	// the suggest box
	var suggestBox;
	
	// the URL where to get the search suggests
	var suggestUrl = '';
    
	// the number of ms before the update of the search box is triggered
	var throttleTime;
	
	// the list of all selectable divs
	var selectables = [];
	
	// whether the search words should be highlighted in the results
	var highlight = true;
	
	// general animation speed
	var animationSpeed = 300;
	
	// the headline of the query visualization
	var queryVisualizationHeadline = '';
	
	// the minimum input before the suggest pops up
	var minChars = 2;
	
	// the action that should happen if enter is pressed
	var enterCallback;
	
    // hide the search suggests
    function hideSuggestBox(event) {
		
        if (event !== undefined) {
			
			var inputText = searchBox.val();

            // hide if tab or enter was pressed
            if (event.keyCode == 9 || event.keyCode == 13 || inputText.length < minChars) {
                suggestBox.slideUp(animationSpeed);
				selectedEntryIndex = -1;
            }
        } else {
            suggestBox.slideUp(animationSpeed);
			selectedEntryIndex = -1;
        }
		
    }
	
	function throttle(f, delay){
	    var timer = null;
	    return function(){
	        var context = this, args = arguments;
	        clearTimeout(timer);
	        timer = window.setTimeout(function(){
	            f.apply(context, args);
	        },
	        delay || 500);
	    };
	}

	// highlight search words
	function highlightSearchWords(string, searchString) {
		if (!highlight) {
			return string;
		}
		var words = searchString.split(' ');
		
		var markers = {};
		$.each(words, function(key, word) {
			if (word.length < 2) {
				return;
			}
			//string = string.replace(new RegExp(word,'gi'),'<span>'+word+'</span>');			
			string = string.replace(new RegExp(word,'gi'),'##'+key+'##');
			markers['##'+key+'##'] = '<span>'+word+'</span>';			
		});
		
		$.each(markers, function(marker, replacement) {
			string = string.replace(new RegExp(marker,'gi'),replacement);
		});			
		
		return string;
	}
		
    // update suggest box when new data is given
    function updateSuggestBox(data){
		
		//data = JSON.parse(data);
		//console.log(data);
		
		var searchString = searchBox.val();
		
		//// fill the box
		suggestBox.html('');
		
		// suggest
		$.each(data['suggests'], function(key, values) {
			
	    	//console.log('key: ' + key);
			if (key.replace(/_/,'').length > 0 && values.length > 0) {
				var keyNode = $('<h4>'+key+'</h4>');
				suggestBox.append(keyNode);
			}
			
			$.each(values, function(index, suggest) {
				//console.log(suggest);
				
				var suggestLine = '<div class="unibox-selectable">';
				
				if (suggest['image'] != undefined) {
					suggestLine += '<img src="'+suggest['image']+'"/>';				
				}
				
				if (suggest['link'] != undefined) {
					suggestLine += '<a href="'+suggest['link']+'">';
					suggestLine += highlightSearchWords(suggest['name'],searchString);
					suggestLine += '</a>';
				} else {
					suggestLine += highlightSearchWords(suggest['name'],searchString);
				}
				
				suggestLine += '<div class="unibox-ca"></div></div>';
				
				var suggestNode = $(suggestLine);
				suggestBox.append(suggestNode);
			});
			
	    });
		
		// trigger words / visualization
		if (data['words'].length > 0 && queryVisualizationHeadline.length > 0) {
			suggestBox.append('<h4>'+queryVisualizationHeadline+'</h4>');
		}
		$.each(data['words'], function(key, word) {
			if (word['overlayImage'] != undefined) {
				suggestBox.append('<img class="unibox-vis" src="'+word['overlayImage'] +'" style="background-image: url(\''+word['image']+'\');background-size: 75%;background-repeat: no-repeat;background-position: center;">');				
			} else {
				suggestBox.append('<img class="unibox-vis" src="'+word['image']+'">');
			}
		});
		
		//// position it
		suggestBox.css('position','absolute');
		suggestBox.css('left',searchBox.offset().left);
		suggestBox.css('top',searchBox.offset().top+searchBox.height());
		
		//// show it
		suggestBox.slideDown(animationSpeed);
		
		//// update selectables for cursor navigation 
		selectables = $('.unibox-selectable');
		selectedEntryIndex = -1;
		
    }
    
    function scrollList(event) {
		
		// return if NOT up or down is pressed
		if (event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 13) {
			return;
		}
		
        // if up or down arrows are pressed move selected entry
        if (event.keyCode == 38 && selectedEntryIndex > 0) {
            selectedEntryIndex--;
        }
        else if (event.keyCode == 40) {
            selectedEntryIndex++;
        } 
		
		// mark the selected selectable
		if (selectables.length > 0) {
			
			selectedEntryIndex = selectedEntryIndex % selectables.length;
			selectables.removeClass('active');
			var selected = $(selectables[selectedEntryIndex]);
			
			selected.addClass('active');
		
		}
		
		if (event.keyCode == 13 && selectedEntryIndex != -1) {
			
			if (enterCallback != undefined) {
				enterCallback();				
			} else {
				window.location.href = $($('.unibox-selectable.active')[0]).find('a').attr('href');
			}
			
			return false;
		}
    }
		
    // provide search suggests
    function searchSuggest(event) {

		// scroll list when up or down is pressed
		if (event.keyCode == 38 || event.keyCode == 40) {
			return;
		}
		
        var inputText = searchBox.val();
        
		if (inputText.length >= minChars) {
			$.ajax(suggestUrl+encodeURIComponent(inputText),{dataType:'json', success: function(data) {
				 updateSuggestBox(data);
			}});
		}
       
    }
    
    // return an object, through closure all methods keep bound to returned object
    return {
        init: function(searchBoxObject, options) {
            searchBox = searchBoxObject;
			highlight = options.highlight;
            suggestUrl = options.suggestUrl;
			throttleTime = options.throttleTime;
			animationSpeed = options.animationSpeed;
			minChars = options.minChars;
			enterCallback = options.enterCallback;
			queryVisualizationHeadline = options.queryVisualizationHeadline;
                       
            // insert necessary values for inputfield
            searchBox.attr("autocomplete", "off");

			// position and size the suggest box
            suggestBox = $('<div id="unibox-suggest-box"></div>');
			$('body').append(suggestBox);
			suggestBox.css('min-width',searchBox.outerWidth());
			suggestBox.css('max-width', options.maxWidth);
						
            // add event listeners
			searchBox.keydown(scrollList);
			searchBox.keydown(throttle(searchSuggest,throttleTime));
			searchBox.keydown(hideSuggestBox);
			searchBox.keyup(hideSuggestBox);
			
			// click outside of suggest div closes it
			$('html').click(function() {
				suggestBox.slideUp(animationSpeed);
			});
			
			suggestBox.click(function(event){
			    event.stopPropagation();
			});
			
			console.log('unibox initialized');
        }
    }
}();
