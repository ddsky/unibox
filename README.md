unibox
======

A Javascript jQuery Plugin for a universal search box with search suggestion.

## How it Looks Like

Example on the [meal planner site](https://spoonacular.com/meal-planner) spoonacular. Here you can see the instant visual feedback (images showing how you understood the query) within the search suggest.

![](https://github.com/ddsky/unibox/blob/master/img/unibox-on-spoonacular.png?raw=true "unibox on spoonacular")

Example on the [semantic product search engine semknox.com](http://semknox.com) (not public). Here, the instant visual feedback is shown prominently above the query.

![](https://github.com/ddsky/unibox/blob/master/img/unibox-on-semfox.png?raw=true "unibox on semfox")

Also unibox is now used by [site search](http://sitesearch360.com) provider Site Search 360.

## Installation

Download the unibox.min.js and unibox.css or simply install via bower writing `bower install unibox`.

## Configuration and Usage

For suggestions to work you have two parts. First, the unibox.min.js and unibox.min.css need to be included and configured on the page. Second, the server needs to give search suggest data for the plugin to show.

### Client Side

```html
<input id="searchBox">
```

```javascript
$("#searchBox").unibox({
  // these are required:
  suggestUrl: '', // the URL that provides the data for the suggest
  // these are optional:
  searchBoxContainerSelector: undefined, // suggest will be attached to this container, by default it will be the parent of the search input (e.g. #searchBox)
  instantVisualFeedback: 'all', // where the instant visual feedback should be shown, 'top', 'bottom', 'all', or 'none', default: 'all'
  ivfImagePath: '', // the path to prepend to the instant visual feedback images
  ivfImageOffset: -80, // the vertical offset of the ivf images
  missingErrorImage: undefined, // a default image in case a suggested image was not found
  showImagesSuggestions: true, // whether to show images in the search suggestions
  throttleTime: 300, // the number of milliseconds before the suggest is triggered after finished input, default: 300ms
  extraHtml: undefined, // extra HTML code that is shown in each search suggest
  placeholder: undefined, // the placeholder to be put in the search field
  highlight: true, // whether matched words should be highlighted, default: true
  queryVisualizationHeadline: '', // A headline for the image visualization, default: empty
  animationSpeed: 300, // speed of the animations, default: 300ms
  enterCallback: undefined, // callback on what should happen when enter is pressed while the focus is in the search field parameters passed are text and link
  enterResultCallback: undefined, // callback on what should happen when enter is pressed while the focus is on one of the suggests, default: undefined, meaning the link will be followed
  typeCallback: undefined, // callback on keydown events in the search box
  focusCallback: undefined, // callback on focus events on the search box
  blurCallback: undefined, // callback on blur events on the search box
  minChars: 3, // minimum number of characters before the suggests shows, default: 3
  maxWidth: 400, // the maximum width of the suggest box, default: as wide as the input box
  suggestOrder: [], // the order of the suggest, e.g. ["recipes","menus","restaurants"]
  suggestSelectionOrder: [], // the order of the suggest, e.g. ["recipes","menus","restaurants"],
  showMoreResults: undefined,    // the HTML content to show if there is another more complete search page
  disableEventPropagationHtml: true  // disable click event propagation from search (suggest) box to html elements
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
$(".usernameBox").focus(function(){
          $(".usernameBox").unibox({
              suggestUrl: 'path to your server-side', // the URL that provides the data for the suggest
      });
$(".emailBox").focus(function(){
          $(".emailBox").unibox({
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
