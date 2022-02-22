browser.runtime.onMessage.addListener(async (msg) => {
    const imgs = new Array();
    for (const url of msg) {
        var img = new Image()
        img.loaded = new Promise(resolve => {
            img.onload = resolve;
        })
        img.src = url;
        imgs.push(img);
    }
    var doc = new jspdf.jsPDF({
        orientation: 'l',
        unit: 'px',
        format: 'a4',
        compress: true
    });
    doc = doc.deletePage(1);
    for (const img of imgs) {
        await img.loaded;
        doc.addPage([img.width, img.height], 'l');
        doc.addImage(img, 'JPEG', 0, 0, img.width, img.height, '', 'FAST');
    }
    const blobUrl = URL.createObjectURL(doc.output('blob'));
    browser.downloads.download({
        url: blobUrl,
        filename: "docsend.pdf"
    })
})