const dataURItoBlob = (dataURI, sliceSize = 512) => {
    // dataURItoBlob
    // https://stackoverflow.com/a/5100158/5133167
    // b64toBlob
    // https://stackoverflow.com/a/16245768/5133167

    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const byteCharacters = atob(dataURI.split(',')[1]);

    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {
        type: mimeString
    });
}

browser.runtime.onMessage.addListener(msg => {
    browser.downloads.download({
        url: URL.createObjectURL(dataURItoBlob(msg.dataURL)),
        filename: "docsend.pdf"
    })
})