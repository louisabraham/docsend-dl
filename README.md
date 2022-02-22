# docsend-dl

This add-on adds a download button on Docsend documents

## How it works

1. Inject a "Download" button on the page
2. The navigation buttons are triggered to go through the whole presentation to load all the slides
3. The image urls are retrieved from the DOM
4. The images are loaded from the content script (to use cache) and assembled using [jsPDF](https://github.com/parallax/jsPDF)
5. The assembled PDF is converted to a [Data URI](https://en.wikipedia.org/wiki/Data_URI_scheme) and sent to the background script
6. The background script triggers the download. Those last two steps are necessary because of content script limitations.
