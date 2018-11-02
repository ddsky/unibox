unibox
======

A Javascript Plugin for a universal search box with search suggestion without dependencies.

[Demo](https://htmlpreview.github.io/?https://github.com/ddsky/unibox/blob/master/html/sampleSite.html)

## How it Looks Like

Example on the [meal planner site](https://spoonacular.com/meal-planner) spoonacular. Here you can see the instant visual feedback (images showing how you understood the query) within the search suggest.

![](https://github.com/ddsky/unibox/blob/master/img/spoonacular-unibox.png?raw=true "unibox on spoonacular")

Example on the [semantic product search engine semknox.com](https://semknox.com) (not public). Here, the instant visual feedback is shown prominently above the query.

![](https://github.com/ddsky/unibox/blob/master/img/unibox-on-semknox.png?raw=true "unibox on SEMKNOX")

Also unibox is now used by [site search](https://www.sitesearch360.com) provider Site Search 360. Here's a sample implementation.

![](https://github.com/ddsky/unibox/blob/master/img/sitesearch360-unibox.gif?raw=true "unibox on Site Search 360")


## Installation

Download the unibox.min.js and unibox.min.css or simply install via bower writing `bower install unibox`.

## Configuration and Usage

For suggestions to work you have two parts. First, the unibox.min.js and unibox.min.css need to be included and configured on the page. Second, the server needs to give search suggest data for the plugin to show.

### Client Side

```html
<input id="searchBox">
```

```javascript
sxQuery("#searchBox").unibox({
// these are the required:
suggestUrl: '', // the URL where to get the search suggests
// these are optional:
ivfImagePath: '', // the root path to the instant visual feedback images
ivfImageOffset: -80, // the vertical offset of the ivf images
missingErrorImage: undefined, // if an image is missing, hide it (undefined) or show a placeholder image
queryVisualizationHeadline: '', // the headline of the query visualization
highlight: true, // whether the search words should be highlighted in the results
throttleTime: 50, // the number of ms before the update of the search box is triggered
animationSpeed: 300, // general animation speed
instantVisualFeedback: 'all', // where to show the ivf
showOnMobile: true, // whether to show search suggestions on mobile devices
callbacks: {
    enter: undefined, // the callback to trigger after 'enter' press or search button click (when no suggestion is selected) - args(query, searchButton [optional], hideSpecialCallback [optional])
    enterResult: undefined, // the callback to trigger after 'enter' press or click on selected suggestion - args(query, href, hasCtrlModifier [optional])
    type: undefined, // the callback to trigger after search box value changes - args(event, query)
    focus: undefined, // the callback to trigger after search box is focused - args(event, query)
    blur: undefined, // the callback to trigger after search box is abandoned - args(event, query)
    line: undefined, // the callback to trigger after suggest line is built - args(lineString, key, index, suggest)
    suggestsBuilt: undefined, // the callback to trigger after all suggestions are built - args(suggestBox, data)
    preSuggest: undefined, // the callback to trigger before suggestions are fetched, return 'false' to interrupt the process  - args(query, searchBox)
    suggestChange: undefined // the callback to trigger after the suggestion set is changed - args(isSuggestBoxVisible)
},
trackingCallbacks: {
    abandon: undefined, // a tracking callback, called after the search box is abandoned - args(query, visible suggestionCount, searchBox)
    select: undefined, // a tracking callback, called after a suggestion is selected - args(searchBox, suggestBox, target, query, suggestions, position, link)
    show: undefined, // a tracking callback, called after a suggestion set is shown - args(searchBox, suggestBox, aSuggestion, query, suggestions)
    change: undefined // a tracking callback, called after a search box value is changed - args(searchBox)
},
placeholder: undefined, // the placeholder for the input field
extraHtml: undefined, // extra HTML code that is shown in each search suggest
dataPoints: undefined, // extra HTML code by key, overrides extraHtml, e.g. {price: {html: '<span>#price# $</span>', position: 1}, category: {html: '<b>#category#</b>', position: 2}}
noSuggests: undefined, // the content to show when no suggests are available, if undefined, no suggests will be shown
emptyQuerySuggests: undefined, // empty query suggests, if someone clicks in the search field, we can show suggests
minChars: 3, // the minimum input before the suggest pops up
maxWidth: 'auto', // the maximum width of the suggest box, default: as wide as the input box
showDeleteAllButton: false, // show 'delete all' (x) button when focus hits back to input field
showImagesSuggestions: true, // whether to show images
disableEventPropagationHtml: true, // disable click event propagation to HTML element
suggestOrder: [], // sort suggests by this array, if empty, use given array order
suggestSelectionOrder: [], // move through selectables by this cluster order. if empty, use naturally given order by selectables
viewAllLabel: undefined, // label of the 'View All' button, if undefined no 'View All' button will be shown at the bottom of suggestion list
loaderSelector: undefined, // the loader element selector
viewKeyMappings: undefined, // mapping of suggestion group key to view key
themeColor: '#1C5D7D', // theme color, used for magnifier icon when using 'View All' button
enabled: true, // whether suggestions should be shown
specialMobileSuggest: {
    enabled: false,  // whether to show fullscreen search box + suggest box on search field focus when the viewport width is below specified breakpoint, default: false
    breakpoint: 768, // the maximum width of device, where special mobile suggestion should be shown, default: 768 px
    placeholder: undefined, // html/string to be shown when there are no suggest results in special mobile suggest box
    customTopHtml: undefined,  // html/string to be shown at the top of the page when special mobile suggests are visible
    searchBoxPlaceholder: undefined, // the placeholder to show in mobile suggestion search box
    animateTransitions: true, // whether to animate transition into special mobile suggestions
    resizeSearchBoxOnScroll: true, // whether to resize mobile special input block (search field + icons) on special mobile suggest box scroll
    trigger: undefined, // selector for special mobile suggest trigger, if the trigger is clicked, the fullscreen suggestion layer will be shown
    autoHide: true, // whether to hide the mobile layer automatically on search submission, if set to false, the enterCallback becomes a hideLayer callback as 3rd parameter, which has to be called in order to hide the mobile suggestions
    hiddenCallback: undefined // a callback that is called after the special mobile suggestions have been hidden
},
accessibility: {
    headingLevel: 2, // the level of search suggestion heading
    searchFieldLabel: "Search", // the invisible label of the input fields
    srSuggestionsHiddenText: "Search suggestions are hidden", // text to announce @screen reader when search suggestions were hidden
    srNoSuggestionsText: 'No search suggestions', // text to announce @screen reader if no suggestions are available
    srSuggestionsCountText: '#COUNT# search suggestions shown', // text to announce @screen reader after search suggestions have been shown, #COUNT# will be replaced with the suggestion count
    srOneSuggestionText: 'One search suggestion shown', // text to announce @screen reader after search suggestions have been shown
    srSuggestBoxControlDescription: 'Use up and down arrows to select available result. Press enter to go to selected search result. Touch devices users can use touch and swipe gestures.', // text to announce @screen reader after search input is focused - describes keyboard controls
},
searchBoxContainer: searchBox.parent() // the search box's parent
});
```

### Server Side

On the server side create code in whatever language you want. The URL of the service should be set as "suggestUrl" in the settings on the page. The json that needs to be generated must have the following structure:

```javascript
{
  "words": [
    {
      "name": "name", // optionally, the name of the detected word
      "image": "http://...", // the URL of the image
    },
  ],
  "suggests": {
    "headline 1": [
      {
        "name": "name", // the name of the suggest that is shown to the user
        "image": "http://...", // optionally an image URL to show next to the suggest
        "link": "http://...", // optionally a URL that links to the suggested page
        // ... more fields that can be used with ##name## in "extraHtml" templates
      }
    ],
  }
}
```
The field `suggests` contains search suggests grouped under headlines. For example, on spoonacular.com you have an empty headline and a "Recipes" headline to group suggests.
The field `words` is for the instant visual feedback. All the words or phrases that you recognized should be entered here so they can be shown to the user.

That's it already. If you use unibox and want to let me know, I include your usage example here. Happy coding.

### Notes to keep in mind
#### Multi UniBoxes
If you want to initialize more that one UniBox in the same page you can wrap the initialization function in an event that triggers when the user switches between input boxes , such as focus 
```javascript
sxQuery(".usernameBox").focus(function(){
          sxQuery(".usernameBox").unibox({
              suggestUrl: 'path to your server-side', // the URL that provides the data for the suggest
      });
sxQuery(".emailBox").focus(function(){
          sxQuery(".emailBox").unibox({
              suggestUrl: 'path to your server-side', // the URL that provides the data for the suggest
      });
```
#### Bootstrap Fixes
If you are willing to use bootstrap along with Unibox keep in mind that unibox will mess your `input-group-addon`'s height,
use this css to fix it
```css
#unibox-invisible{
   /*important for fixing the input-group-addon heights*/
   position: absolute !important;   
}
```
