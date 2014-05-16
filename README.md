unibox
======

A Javascript jQuery Plugin for a universal search box with search suggestion.

## How it Looks Like

Example on the [best recipe search engine spoonacular.com](http://spoonacular.com). Here you can see the instant visual feedback (images showing how you understood the query) within the search suggest.

![](https://github.com/ddsky/unibox/blob/master/img/unibox-on-spoonacular.png?raw=true "unibox on spoonacular")

Example on the [semantic product search engine semfox.com](http://semfox.com) (not public). Here, the instant visual feedback is shown prominently above the query.

![](https://github.com/ddsky/unibox/blob/master/img/unibox-on-semfox.png?raw=true "unibox on semfox")

## Installation

Download the unibox.min.js and unibox.css or simply install via bower writing `bower install unibox`.

## Configuration and Usage

For suggestions to work you have two parts. First, the unibox.js and unibox.css need to be included and configured on the page. Second, the server needs to give search suggest data for the plugin to show.

### Client Side

```javascript
// create a settings object
var settings = {
  // these are required:
  suggestUrl: '', // the URL that provides the data for the suggest
  // these are optional:
  instantVisualFeedback: 'all', // where the instant visual feedback should be shown, 'top', 'bottom', or 'all', default: 'all'
  throttleTime: 300, // the number of milliseconds before the suggest is triggered after finished input, default: 300ms
  highlight: true, // whether matched words should be highlighted, default: true
  queryVisualizationHeadline: '', // A headline for the image visualization, default: empty
  animationSpeed: 300, // speed of the animations, default: 300ms
  enterCallback: undefined, // callback on what should happen when enter is pressed, default: undefined, meaning the link will be followed
  minChars: 3, // minimum number of characters before the suggests shows, default: 3
  maxWidth: 400 // the maximum width of the suggest box, default: as wide as the input box
};

// apply the settings to an input that should get the unibox
$("#searchBox").unibox(settings);
```

### Server Side

On the server side create code in whatever language you want. The URL of the service should be set as "suggestUrl" in the settings on the page. The json that needs to be generated must have the following structure:

```javascript
{
  words: [
    {
      name: 'name', // optionally, the name of the detected word
      image: 'http://...', // the URL of the image
    },
  ],
  suggests: {
    'headline 1': [
      {
        name: 'name', // the name of the suggest that is shown to the user
        image: 'http://...', // optionally an image URL to show next to the suggest
        link: 'http://...', // optionally a URL that links to the suggested page
      }
    ],
  
  }
 
}
```
The field `suggests` contains search suggests grouped under headlines. For example, on spoonacular.com you have an empty headline and a "Recipes" headline to group suggests.
The field `words` is for the instant visual feedback. All the words or phrases that you recognized should be entered here so they can be shown to the user.

That's it already. If you use unibox and want to let me know, I include your usage example here. Happy coding.