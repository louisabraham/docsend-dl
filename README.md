# docsend-dl

This add-on adds a download button on Docsend documents.

![banner](banner.png)

## How it works

1. A "Download" button is injected on the page.
2. The page is reloaded to reload all images and avoid token expiration. The URL has a `#download` hash to know the button was pressed.
3. The navigation buttons are triggered to go through the whole presentation to load all the slides.
4. The image urls are retrieved from the DOM.
5. The images are loaded from the content script (to use cache) and assembled using [jsPDF](https://github.com/parallax/jsPDF).
6. The assembled PDF is converted to a [Data URI](https://en.wikipedia.org/wiki/Data_URI_scheme) and sent to the background script.
7. The background script triggers the download. Those last two steps are necessary because of content script limitations.
8. The user is redirected to the normal URL without hash.