var UniBox = function () {
    //// common vars

    // index of selected entry
    var selectedEntryIndex = -1;

    // the search box
    var searchBox;

    // the search box's parent
    var searchBoxParent;

    // the suggest box
    var suggestBox;

    // the URL where to get the search suggests
    var suggestUrl = '';

    // the root path to the instant visual feedback images
    var ivfImagePath = '';

    // the vertical offset of the ivf images
    var ivfImageOffset = -80;

    // if an image is missing, hide it (undefined) or show a placeholder image
    var missingErrorImage;

    // the number of ms before the update of the search box is triggered
    var throttleTime;

    // the list of all selectable divs
    var selectables = [];

    // whether the search words should be highlighted in the results
    var highlight = true;

    // extra HTML code that is shown in each search suggest
    var extraHtml;

    // callback function to run code on each suggest line, parameters are lineCallback(currentLineString, index, suggestObject)
    var lineCallback;

    // general animation speed
    var animationSpeed = 300;

    // the headline of the query visualization
    var queryVisualizationHeadline = '';

    // the minimum input before the suggest pops up
    var minChars = 2;

    // the action that should happen if enter is pressed
    var enterCallback;

    // the action that should happen if enter is pressed when a suggest result is selected
    var enterCallbackResult;

    // the action that should happen after each registered key stroke in the search field (other than enter)
    var typeCallback;

    // a callback for on focus events on the search box
    var focusCallback;

    // a callback for on blur events on the search box
    var blurCallback;

    // starting to ajax search
    var loadingCallback;

    // done ajax searching
    var loadedCallback;

    // the placeholder for the input field
    var placeholder;

    // the words that were highlighted above the search bar
    var ivfWords = [];

    // where to show the ivf
    var instantVisualFeedback = 'all';

    // remember the last key stroke to avoid showing the suggests after enter
    var lastKeyCode = -1;

    // remember the last input, this is important because requests are asynchronous,
    // if we search for "sam" (takes 2 seconds) and then keep typing to search for "samsonite" (takes 1 second) the
    // results for the previous input will come in later and replace the results for "samsonite"
    var currentInput = "";

    // show 'delete all' (x) button when focus hits back to input field
    var showDeleteAllButton = false;

    // sort suggests by this array, if empty, use given array order
    var suggestOrder = [];

    // move through selectables by this cluster order. if empty, use naturally given order by selectables
    var suggestSelectionOrder = [];

    // the maximum width of the suggest box, default: as wide as the input box
    var maxWidth = undefined;

    // the content to show when no suggests are available, if undefined, no suggests will be shown
    var noSuggests = undefined;

    // whether to show images
    var showImagesSuggestions = true;

    // empty query suggests, if someone clicks in the search field, we can show suggests
    var emptyQuerySuggests = undefined;

    // the content to show if there exist another more complete search page
    var showMoreResults = undefined;

    // disable click event propagation to HTML element
    var disableEventPropagationHtml = true;

    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };

    // hide the search suggests
    function resetSuggests(event) {
        event = event || window.event;

        if (event !== undefined) {
            var keyCode = event.keyCode || event.which;
            var inputText = searchBox.val();

            // hide if tab, escape, or enter was pressed
            if (keyCode == 27 || keyCode == 13 || keyCode == 9 || (inputText.length < minChars && emptyQuerySuggests == undefined)) {
                hideSuggests(event);

                if (keyCode == 13 && enterCallback !== undefined && selectedEntryIndex == -1) {
                    enterCallback.call(this, inputText);
                }
                selectedEntryIndex = -1;
            }

        } else {
            hideSuggests(event);
            selectedEntryIndex = -1;
        }

    }

    function hideSuggests(e) {
        if (blurCallback !== undefined) {
            try {
                blurCallback.call(this, e, searchBox.val());
            } catch (ex) {
                console.log(ex);
            }
        }
        suggestBox.removeClass('uniboxActive');
        suggestBox.slideUp(animationSpeed);
        clearIvf();
    }

    function throttle(f, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = window.setTimeout(function () {
                f.apply(context, args);
            }, delay || 50);
        };
    }

    // highlight search words
    function highlightSearchWords(string, searchString) {
        if (!highlight) {
            return string;
        }
        var words = searchString.replace(/[^a-zA-Z0-9äöüÄÖÜß]|\s+|\r?\n|\r/gmi, " ").replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, " ").split(' ');

        // sort words by length, longest first
        words.sort(function (a, b) {
            return b.length - a.length; // ASC -> a - b; DESC -> b - a
        });

        var markers = {};
        jQuery.each(words, function (idx, word) {
            if (word.length < 1) {
                return;
            }
            var matches = string.match(new RegExp("((" + word + ")(?!#<##|-\\d+#<##))(?!.*\\1)", 'gi'));

            if (matches != null) {
                for (var i = 0; i < matches.length; i++) {
                    var match = matches[i];
                    var matchEsc = match.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                    string = string.replace(new RegExp('(' + matchEsc + ')(?!#<##|-\\d+#<##)', 'g'), '##>#' + idx + "-" + i + '#<##');
                    markers['##>#' + idx + "-" + i + '#<##'] = '<span class="unibox-highlight">' + match + '</span>';
                }
            }

        });

        var reversedMarkerKeys = Object.keys(markers).reverse();
        for (var i = 0; i < reversedMarkerKeys.length; i++) {
            var singleMarker = reversedMarkerKeys[i];
            var replacement = markers[singleMarker];
            string = string.replace(new RegExp(singleMarker, 'gi'), replacement);
        }

        return string;
    }

    function makeCssKey(key) {
        return key.replace(/[ "§$%&/(){}+*,.;|]/g, '_').toLowerCase();
    }

    function escapeHtml(string) {
        return String(string).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
        });
    }

    // update suggest box when new data is given
    function updateSuggestBox(data) {

        // don't do anything if the last key was enter
        if (lastKeyCode == 13) {
            resetSuggests();
            return;
        }

        var searchString = searchBox.val();
        var searchStringXss = escapeHtml(searchString);

        //// fill the box
        suggestBox.html('');

        // find out whether we have something to show in the first place
        var showSuggestBox = false;

        // set state if no suggestions notice is visible
        var showNoSuggestions = false;

        // suggest
        var suggestOrderToUse = Object.keys(data['suggests']);
        if (suggestOrder && suggestOrder.length > 0) {
            suggestOrderToUse = suggestOrder;
            jQuery.each(Object.keys(data['suggests']), function (i, o) {
                if (jQuery.inArray(o, suggestOrderToUse) < 0)suggestOrderToUse.push(o)
            });
        }

        jQuery.each(suggestOrderToUse, function (idx, key) {
            var values = data['suggests'][key];
            if (!values || values.length == 0) {
                return true;
            }

            // check if other arrays have content, if this suggestion-block is the only one, mark it via css class
            var countOtherSuggestionValues = 0;
            jQuery.each(suggestOrderToUse, function (idx, sKey) {
                var values = data['suggests'][sKey];
                if (!values || key === sKey || values.length == 0) {
                    return true;
                }
                countOtherSuggestionValues += values.length;
            });

            var suggestSet = jQuery('<div class="unibox-suggest-cluster unibox-suggest-' + makeCssKey(key) + ' ' + ('unibox-' + values.length + '-entries') + ' ' + (countOtherSuggestionValues == 0 ? 'unibox-single-suggestion-block' : '') + '"></div>');

            if (key.replace(/_/, '').length > 0 && values.length > 0) {
                var keyNode = jQuery('<h4>' + key + '</h4>');
                suggestSet.append(keyNode);
            }

            jQuery.each(values, function (index, suggest) {

                var suggestLine = '<div class="unibox-selectable">';

                if (suggest['image'] != undefined && showImagesSuggestions) {
                    var imageUrl = suggest['image'].length === 0 && missingErrorImage ? missingErrorImage : suggest['image'].length === 0 || suggest['image'].indexOf("/") === 0 || suggest['image'].indexOf("http") === 0 ? suggest['image'] : ivfImagePath + suggest['image'];

                    suggestLine += '<div class="unibox-selectable-img-container"><img src="' + imageUrl+'"';
                    var img = new Image();
                    img.src = imageUrl;
                    if(!img.complete){
                        suggestLine += ' style="display: none;" onload="this.style.display=null;"'
                    }
                    suggestLine+='/></div>';
                }

                if (suggest['link'] != undefined && suggest['link'] != '') {
                    suggestLine += '<a class="uniboxSearchContent" href="' + suggest['link'] + '">';
                    suggestLine += highlightSearchWords(suggest['name'], searchStringXss);
                    suggestLine += '</a>';
                } else {
                    suggestLine += '<span class="uniboxSearchContent">' + highlightSearchWords(suggest['name'], searchStringXss) + '</span>';
                }

                if (suggest['content'] != undefined && suggest['content'] != '') {
                    suggestLine += '<p class="unibox-result-content">' + highlightSearchWords(suggest['content'], searchStringXss) + '</p>';
                }

                if (extraHtml != undefined) {
                    var matches = extraHtml.match(/##(.*?)##/gi);
                    var extraHtmlFilled = extraHtml;

                    var missedMatch = false;
                    for (var i = 0; i < matches.length; i++) {
                        var match = matches[i];
                        if (match === undefined || match.length == 0) {
                            continue;
                        }
                        var variable = match.replace(/#/g, '');
                        var replacement = suggest[variable];
                        if (replacement == undefined) {
                            missedMatch = true;
                            continue;
                        }
                        var re = new RegExp(match, 'g');
                        extraHtmlFilled = extraHtmlFilled.replace(re, replacement);
                    }
                    if (!missedMatch) {
                        suggestLine += '<div class="unibox-extra">' + extraHtmlFilled + '</div>';
                    }
                }

                suggestLine += '<div class="unibox-ca"></div></div>';

                if (lineCallback !== undefined) {
                    suggestLine = lineCallback.call(this, suggestLine, key, index, suggest);
                }

                var suggestNode = jQuery(suggestLine);
                suggestSet.append(suggestNode);
                showSuggestBox = true;
            });

            suggestBox.append(suggestSet);
        });

        //// update selectables for cursor navigation, use given order
        selectables = searchBoxParent.find('.unibox-selectable');
        if (suggestSelectionOrder && suggestSelectionOrder.length > 0) {
            selectables = [];
            jQuery.each(suggestSelectionOrder, function (idx, item) {
                selectables = selectables.concat(searchBoxParent.find('.unibox-suggest-' + makeCssKey(item) + ':first .unibox-selectable').get());
            });
            jQuery.each(jQuery.grep(Object.keys(data.suggests), function(elem){if(suggestSelectionOrder.indexOf(elem) < 0)return true}), function (idx, item) {
                selectables = selectables.concat(searchBoxParent.find('.unibox-suggest-' + makeCssKey(item) + ':first .unibox-selectable').get());
            });

        }
        selectedEntryIndex = -1;

        // click handler on selectables
        jQuery(selectables).mousedown(function () {
            var q = jQuery(this).find('.uniboxSearchContent:first').text();
            searchBox.val(q);
            var href = undefined;
            try {
                href = jQuery(this).find('a:first').attr('href');
            } catch (e) {
            }
            if (enterCallbackResult != undefined) {
                try {
                    enterCallbackResult.call(this, q, href);
                } catch (ex) {
                    console.log(ex);
                }
            }
            resetSuggests();
        });

        // click handler on selectables
        searchBoxParent.find('.unibox-selectable .unibox-extra').click(function (event) {
            event.stopPropagation();
        });

        if (data['words'] != undefined) {

            // trigger words / visualization
            if (data['words'].length > 0 && queryVisualizationHeadline.length > 0 && (instantVisualFeedback == 'all' || instantVisualFeedback == 'bottom')) {
                suggestBox.append('<h4>' + queryVisualizationHeadline + '</h4>');
                showSuggestBox = true;
            }

            var newIvfWords = [];

            jQuery.each(data['words'], function (key, word) {

                if ((instantVisualFeedback == 'all' || instantVisualFeedback == 'bottom')) {
                    if (word['overlayImage'] != undefined) {
                        suggestBox.append('<img class="unibox-vis" src="' + ivfImagePath + word['overlayImage'] + '" style="background-image: url(\'' + ivfImagePath + word['image'] + '\');background-size: 75%;background-repeat: no-repeat;background-position: center;">');
                    } else if (word['image'] != undefined) {
                        suggestBox.append('<img class="unibox-vis" src="' + ivfImagePath + word['image'] + '">');
                    }
                }

                var invisibleBox = searchBoxParent.find('#unibox-invisible');
                invisibleBox.css('padding', searchBox.css('padding'));
                invisibleBox.html(searchStringXss.replace(new RegExp(word['name'], 'gi'), '<span>' + word['name'] + '</span>'));
                
                // show visuals above search bar
                if ((instantVisualFeedback == 'all' || instantVisualFeedback == 'top') && jQuery.inArray(word['image'], ivfWords) == -1) {

                    var span = searchBoxParent.find('#unibox-invisible span')[0];
                    if (span != undefined && word['name'].length > 0 && word['image'] != undefined) {
                        var posLeft = jQuery(span).position().left;

                        visImage = jQuery('<div class="unibox-ivf"><img src="' + ivfImagePath + word['image'] + '" alt="' + word['name'] + '"></div>');
                        visImage.css('left', getSearchBoxOffset().left + posLeft - 10);
                        visImage.css('top', getSearchBoxOffset().top - searchBox.outerHeight() + ivfImageOffset);
                        //searchBoxParent.find('#unibox').append(visImage);
                        searchBoxParent.append(visImage);
                        setTimeout(function () {
                            searchBoxParent.find('.unibox-ivf').find('img').addClass('l');
                        }, 10);

                        //visImage.find('img').addClass('l');
                        newIvfWords.push(word['image']);
                    }

                } else if (jQuery.inArray(word['image'], ivfWords) > -1) {
                    newIvfWords.push(word['image']);
                }

            });

            ivfWords = newIvfWords;
        }

        jQuery("img").on("error", function() {
            if (missingErrorImage) {
                jQuery(this).attr('src', missingErrorImage);
            } else {
                jQuery(this).hide();
            }
        });

        //// position it
        resizeAndReposition();

        if (noSuggests != undefined && !showSuggestBox) {
            showSuggestBox = true;
            showNoSuggestions = true;
            suggestBox.append(noSuggests);
        }

        //// show it
        if (showSuggestBox) {
            // if already visible, just update position and set class
            if (suggestBox.is(':visible')) {
                suggestBox.addClass('uniboxActive');
                //// re-position it (in some cases the slide down moves the search box and the suggest box is not aligned anymore)
                suggestBox.css('left', getSearchBoxOffset().left);
                suggestBox.css('top', getSearchBoxOffset().top);
            } else { // if suggestbox currently not visible, slide down
                suggestBox.slideDown(animationSpeed, function () {
                    suggestBox.addClass('uniboxActive');
                    //// re-position it (in some cases the slide down moves the search box and the suggest box is not aligned anymore)
                    suggestBox.css('left', getSearchBoxOffset().left);
                    suggestBox.css('top', getSearchBoxOffset().top);
                });
            }

            if (showMoreResults && !showNoSuggestions) {
              suggestBox.append(showMoreResults);
            }
        } else {
            resetSuggests();
        }

    }

    function getSearchBoxOffset() {
        //return {left:searchBox.offset().left - searchBoxParent.find('#unibox').offset().left, top: searchBox.offset().top - searchBoxParent.find('#unibox').offset().top + searchBox.outerHeight()};
        return {
            left: searchBox.offset().left - searchBoxParent.offset().left,
            top: searchBox.offset().top - searchBoxParent.offset().top + searchBox.outerHeight()
        };
    }

    function updateIvf() {
        var shownWords = searchBoxParent.find('.unibox-ivf img').map(function () {
            return jQuery(this).attr('src');
        }).get();
        for (var i = 0; i < shownWords.length; i++) {
            if (jQuery.inArray(shownWords[i].replace(ivfImagePath, ''), ivfWords) == -1) {
                searchBoxParent.find('.unibox-ivf:has(img[src*="' + shownWords[i] + '"])').remove();
            }
        }
    }

    function clearIvf() {
        ivfWords = [];
        searchBoxParent.find('.unibox-ivf').remove();
    }

    function scrollList(event) {

        if (searchBox.val().length <= 1) {
            clearIvf();
        }

        if (typeCallback != undefined) {
            try {
                typeCallback.call(this, event, searchBox.val());
            } catch (ex) {
                console.log(ex);
            }
        }

        // return if NO arrow key is pressed
        if (event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40 && event.keyCode != 13) {
            updateIvf();
            return;
        }

        // if arrows are pressed move selected entry
        if (event.keyCode == 38 && selectedEntryIndex > 0) {
            // up key: move up one entry
            selectedEntryIndex--;
        }
        else if (event.keyCode == 40) {
            // down key: move up one entry
            selectedEntryIndex++;
        }
        else if (event.keyCode == 38 && selectedEntryIndex <= 0) {
            selectedEntryIndex = ((selectedEntryIndex != -1) ? selectedEntryIndex - 1 : selectedEntryIndex) + selectables.length;
        }
        else if ((event.keyCode == 37 || event.keyCode == 39) && selectedEntryIndex > -1) {
            // left/right key: move left/up or right/down one content group if we are in the selected entries (selectedEntryIndex > -1)
            selectedEntryIndex = selectedEntryIndex % selectables.length;
            var currentSelection = jQuery(selectables[selectedEntryIndex]);
            var currentCluster = currentSelection.closest('.unibox-suggest-cluster');

            var otherCluster;

            if (event.keyCode == 37) {
                otherCluster = currentCluster.prev();
            } else if (event.keyCode == 39) {
                otherCluster = currentCluster.next();
            }

            if (otherCluster.hasClass('unibox-suggest-cluster')) {
                var firstSelectableInCluster = otherCluster.find('div.unibox-selectable')[0];
                selectedEntryIndex = jQuery("#unibox-suggest-box div.unibox-selectable").index(firstSelectableInCluster);
            }

        }

        // mark the selected selectable
        if (selectables.length > 0 && selectedEntryIndex > -1) {
            selectedEntryIndex = selectedEntryIndex % selectables.length;
            jQuery(selectables).removeClass('active');
            var selected = jQuery(selectables[selectedEntryIndex]);

            selected.addClass('active');
        }

        if (event.keyCode == 13) {
            event.preventDefault();
            event.stopPropagation();

            if (enterCallbackResult != undefined) {
                var selectedText = searchBox.val();
                var href = undefined;
                if (selectedEntryIndex != -1) {
                    selectedText = searchBoxParent.find('.unibox-selectable.active .uniboxSearchContent:first').text();
                    searchBox.val(selectedText);
                    try {
                        href = jQuery(searchBoxParent.find('.unibox-selectable.active')[0]).find('a').attr('href');
                    } catch (e) {
                    }
                    if (enterCallbackResult != undefined) {
                        try {
                            enterCallbackResult.call(this, selectedText, href);
                        } catch (ex) {
                            console.log(ex);
                        }
                    }
                }
            } else if (selectedEntryIndex != -1) {
                window.location.href = jQuery(searchBoxParent.find('.unibox-selectable.active')[0]).find('a').attr('href');
            }

            return false;
        }

        if (selectedEntryIndex > -1) {
            event.preventDefault();
        }
    }

    // provide search suggests
    function searchSuggest(event) {

        // don't show suggests if alt + something is pressed
        if (lastKeyCode == 18) {
            lastKeyCode = event.keyCode;
            return;
        }

        lastKeyCode = event.keyCode;

        // scroll list when up or down is pressed
        if (((event.keyCode == 37 || event.keyCode == 39) && selectedEntryIndex > -1) || event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 9) {
            return;
        }

        var inputText = searchBox.val();

        if (lastKeyCode == 46 && inputText.length == 0) {
            clearIvf();
        }

        if (inputText.length >= minChars && suggestUrl != '') {
            var self = this;
            if (loadingCallback) {
                loadingCallback.call(self, event);
            }

            currentInput = inputText;
            jQuery.ajax({
                usedQuery: inputText,
                url: suggestUrl + encodeURIComponent(inputText),
                dataType: 'json',
                success: function (data) {
                    if (this.usedQuery == currentInput) {
                        if (loadedCallback) {
                            loadedCallback.call(self, this, data);
                        }
                        
                        updateSuggestBox(data);
                    }
                }
            });
        }

    }

    function resizeAndReposition() {
        var suggestBox = jQuery('#unibox-suggest-box');
        var borderSize = suggestBox.css('border-width').replace('px', '');
        suggestBox.css('min-width', searchBox.outerWidth() - 2 * borderSize);
        if (maxWidth == undefined) {
            suggestBox.css('max-width', searchBox.outerWidth() - 2 * borderSize);
        } else {
            suggestBox.css('max-width', maxWidth - 2 * borderSize);
        }

        suggestBox.css('left', getSearchBoxOffset().left);
        suggestBox.css('top', getSearchBoxOffset().top);
    }

    // return an object, through closure all methods keep bound to returned object
    return {
        updateSuggests: function(data) {
            updateSuggestBox(data);
        },
        updateSuggestUrl: function (newUrl) {
            suggestUrl = newUrl;
        },
        hideSuggestBox: function () {
            resetSuggests();
        },
        setIvfImagePath: function (path) {
            ivfImagePath = path;
            if (ivfImagePath.charAt(ivfImagePath.length - 1) != '/') {
                ivfImagePath += '/';
            }
        },
        changeInstantVisualFeedbackState: function (state) {
            instantVisualFeedback = state;
        },
        render: function () {
            resizeAndReposition();
        },
        getText: function () {
            return searchBox.val();
        },
        init: function (searchBoxObject, options) {
            searchBox = searchBoxObject;
            searchBoxParent = options.searchBoxContainer;
            highlight = options.highlight;
            extraHtml = options.extraHtml;
            lineCallback = options.lineCallback;
            suggestUrl = options.suggestUrl;
            ivfImagePath = options.ivfImagePath;
            ivfImageOffset = options.ivfImageOffset;
            missingErrorImage = options.missingErrorImage;
            throttleTime = options.throttleTime;
            animationSpeed = options.animationSpeed;
            minChars = options.minChars;
            enterCallback = options.enterCallback;
            enterCallbackResult = options.enterCallbackResult;
            typeCallback = options.typeCallback;
            focusCallback = options.focusCallback;
            blurCallback = options.blurCallback;
            loadingCallback = options.loadingCallback;
            loadedCallback = options.loadedCallback;
            placeholder = options.placeholder;
            instantVisualFeedback = options.instantVisualFeedback;
            queryVisualizationHeadline = options.queryVisualizationHeadline;
            showDeleteAllButton = options.showDeleteAllButton;
            showImagesSuggestions = options.showImagesSuggestions;
            suggestOrder = options.suggestOrder;
            suggestSelectionOrder = options.suggestSelectionOrder;
            maxWidth = options.maxWidth;
            noSuggests = options.noSuggests;
            emptyQuerySuggests = options.emptyQuerySuggests;
            showMoreResults = options.showMoreResults;
            disableEventPropagationHtml = options.disableEventPropagationHtml;

            // insert necessary values for inputfield
            searchBox.attr("autocomplete", "off");

            // position and size the suggest box
            suggestBox = jQuery('<div id="unibox-suggest-box"></div>');
            searchBoxParent.prepend(suggestBox);
            var pos = searchBoxParent.css('position');
            if (pos != 'absolute') {
                searchBoxParent.css('position', 'relative');
            }
            var borderSize = suggestBox.css('border-width').replace('px', '');
            suggestBox.css('min-width', searchBox.outerWidth() - 2 * borderSize);
            suggestBox.css('max-width', options.maxWidth - 2 * borderSize);

            // add event listeners
            searchBox.keydown(scrollList);
            searchBox.keydown(throttle(searchSuggest, throttleTime));
            searchBox.keyup(resetSuggests);

            /*searchBox.focusout(function (e) {
             hideSuggests(e);
             if (blurCallback != undefined) {
             blurCallback.call(this, jQuery(this).val());
             }
             });*/

            searchBox.focus(function (e) {
                e = e || window.event;
                e.stopPropagation();
                //console.log(emptyQuerySuggests);
                if (jQuery(this).val().length > 0) {
                    searchSuggest({keyCode: -1});
                } else if (emptyQuerySuggests != undefined) {
                    updateSuggestBox(emptyQuerySuggests);
                }
                if (focusCallback !== undefined) {
                    try {
                        focusCallback.call(this, e, jQuery(this).val());
                    } catch (ex) {
                        console.log(ex);
                    }
                }
            });

            suggestBox.mouseenter(function () {
                suggestBox.find('.unibox-selectable.active').removeClass('active')
            });

            // click outside of suggest div closes it
            jQuery('html').click(function (e) {
                // if empty query suggestions are shown, we don't want them to hide when user clicks on the search in put
                try {
                    if (e != undefined && jQuery(e.target).attr('id') == searchBox.attr('id')) {
                        return;
                    }
                } catch (ex) {
                    console.log(ex);
                }

                if (suggestBox.hasClass('uniboxActive')) {
                    hideSuggests(e);
                }
            });

            // special for tab key (because if shift+tab when getting focus back)
            searchBox.keydown(function (e) {
                e = e || window.event;
                var keyCode = e.keyCode || e.which;
                if (keyCode == 9) {
                    hideSuggests(e);
                }
            });
            searchBox.focusout(function (e) {
                e = e || window.event;
                setTimeout(function () {
                    if (jQuery(document.activeElement).parents('#unibox-suggest-box').length === 0) {
                        hideSuggests(e);
                    }
                }, 10);
            });

            // disable click event propagation to html element
            if (disableEventPropagationHtml) {
                searchBox.click(function (event) {
                    event.stopPropagation();
                });
                suggestBox.click(function (event) {
                    event.stopPropagation();
                });
            }

            // handling the placeholder
            // check if original input has placeholder attribute
            var originalPlaceholder = searchBox.attr('placeholder');
            // if so, then assign to placeholder and use from now on
            placeholder = originalPlaceholder && originalPlaceholder.length > 0 ? originalPlaceholder : placeholder;
            // if placeholder is now undefined and length > 0 go on, else no placeholder at all
            if (placeholder && placeholder.length > 0) {
                // check if browser supports HTML5 placeholder
                var testInput = document.createElement('input');

                // emulate HTML5 placeholder behaviour
                if (!('placeholder' in testInput)) {
                    searchBox.focus(function () {
                        var localPlaceholder = jQuery(this).attr('placeholder');
                        if ((localPlaceholder) && (localPlaceholder.length > 0) && (localPlaceholder != '') && jQuery(this).val() == localPlaceholder) {
                            jQuery(this).val('').removeClass('hasPlaceholder');
                        }
                    }).blur(function () {
                        var localPlaceholder = jQuery(this).attr('placeholder');
                        if ((localPlaceholder) && (localPlaceholder.length > 0) && (localPlaceholder != '') && (jQuery(this).val() == '' || jQuery(this).val() == localPlaceholder)) {
                            jQuery(this).val(localPlaceholder).addClass('hasPlaceholder');
                        }
                    });

                    // set placeholder if defined, remove input of the search box
                    searchBox.val(placeholder);
                }
                searchBox.attr('placeholder', placeholder);
            }

            // copy search box styles to an invisible element so we can determine the text width
            var invisible = jQuery('<div id="unibox-invisible">&nbsp;<span>&nbsp;</span></div>');
            searchBoxParent.append(invisible);

            // if showDeleteAllButton == true, prepare button
            if (showDeleteAllButton) {
                var dab = jQuery('<div id="unibox-dab-holder"><div id="unibox-dab"></div></div>');
                searchBoxParent.append(dab);
                // Events:
                // if clicking the deleteAllButton erase the search field
                jQuery(dab).mousedown(function (e) {
                    (e || window.event).stopPropagation();
                    searchBox.val('');
                    searchBox.focus();
                    return false;
                });
                searchBox.focus(function () {
                    if (searchBox.val().length > 0) {
                        dab.show();
                    } else {
                        dab.hide();
                    }
                }).blur(function () {
                    dab.hide();
                }).keydown(function () {
                    if (jQuery(this).val().length > 0) {
                        jQuery(dab).show();
                    }
                });
                // CSS:
                // css height for dab: respect border width and height of search field and box shadow
                var sbPaddingTop = parseInt(searchBox.css('paddingTop').replace('px', '').trim());
                var heightOfSb = searchBox.outerHeight();
                var borderWidthOfSb = parseInt(searchBox.css('borderTopWidth').replace('px', '').trim());
                var shadowInfo = searchBox.css('boxShadow').match(/\d{1,3}px/g);
                var shadowOfSb = (shadowInfo && shadowInfo.length > 2) ? parseInt(shadowInfo[2].replace('px', '').trim()) : 0;
                dab.height(heightOfSb - (2 * borderWidthOfSb) - shadowOfSb - sbPaddingTop);

                // put some padding to the right of the search field
                var sbPaddingRight = parseInt(searchBox.css('paddingRight').replace('px', '').trim());
                sbPaddingRight = (sbPaddingRight > 25) ? sbPaddingRight : 25;
                searchBox.css('paddingRight', sbPaddingRight);

                // calc position of dab inside parent of searchbox
                var topDistance = borderWidthOfSb + shadowOfSb + (searchBox.offset().top - searchBox.parent().offset().top - searchBox.parent().scrollTop() );
                var leftDistance = Math.abs(searchBox[0].getBoundingClientRect().left - searchBox.parent()[0].getBoundingClientRect().left) + searchBox.outerWidth() - dab.outerWidth() - borderWidthOfSb - sbPaddingRight;
                dab.css('top', topDistance);
                dab.css('left', leftDistance);
            }

            if (instantVisualFeedback == 'none') {
                jQuery('#unibox-invisible').css('display', 'none');
            }
        }
    }
};

(function (jQuery) {

    jQuery.fn.unibox = function (options) {

        var boxes = this.map(function (idx, searchBox) {
            searchBox = jQuery(searchBox);
            // settings with default options.
            var settings = jQuery.extend({
                // these are the defaults.
                suggestUrl: '',
                ivfImagePath: '',
                ivfImageOffset: -80,
                missingErrorImage: undefined,
                queryVisualizationHeadline: '',
                highlight: true,
                throttleTime: 50,
                animationSpeed: 300,
                instantVisualFeedback: 'all',
                enterCallback: undefined,
                enterCallbackResult: undefined,
                typeCallback: undefined,
                focusCallback: undefined,
                blurCallback: undefined,
                loadingCallback: undefined,
                loadedCallback: undefined,
                placeholder: undefined,
                extraHtml: undefined,
                lineCallback: undefined,
                noSuggests: undefined,
                emptyQuerySuggests: undefined,
                minChars: 3,
                maxWidth: searchBox.outerWidth(),
                showDeleteAllButton: false,
                showImagesSuggestions: true,
                disableEventPropagationHtml: true,
                suggestOrder: [],
                suggestSelectionOrder: []
            }, options);

            if (settings.searchBoxContainerSelector == undefined) {
                settings.searchBoxContainer = searchBox.parent();
            } else {
                settings.searchBoxContainer = jQuery(settings.searchBoxContainerSelector);
            }

            var individualUnibox = new UniBox();
            individualUnibox.init(searchBox, settings);

            return individualUnibox;
        });

        var boxesArray = jQuery.makeArray(boxes);

        if (boxesArray.length == 1) {
            return boxesArray[0];
        }

        return boxesArray;
    };

}(jQuery));
