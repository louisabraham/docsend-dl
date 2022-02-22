const addButton = (download) => {
    const toolbar = document.getElementsByClassName("presentation-toolbar_buttons")[0];

    let div = document.createElement('div');
    div.classList.add('toolbar-rule');
    toolbar.insertBefore(div, toolbar.firstChild)

    tag = document.getElementsByClassName("toolbar-page-indicator")[0].cloneNode();
    tag.appendChild(document.createTextNode("Download"));
    toolbar.insertBefore(tag, toolbar.firstChild)

    tag.onclick = download
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const page = () => parseInt(document.getElementById("page-number").textContent);
const prevPage = () => {
    const button = document.getElementById("prevPageButton");
    const event = new MouseEvent('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    button.dispatchEvent(event);
}
const nextPage = () => {
    const button = document.getElementById("nextPageButton");
    const event = new MouseEvent('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    button.dispatchEvent(event);
}
const imagesUrl = () => {
    let ans = new Array();
    for (el of document.getElementsByClassName("preso-view page-view"))
        ans.push(el.src);
    return ans;
}
const download = async () => {
    while (page() != 1) {
        prevPage();
        await sleep(100);
    }
    while (true) {
        let p = page();
        nextPage();
        await sleep(200);
        if (page() == p)
            await sleep(1000);
        if (page() == p)
            break;
    }
    browser.runtime.sendMessage(imagesUrl());
}

const url = new URL(document.location.href);
if (url.hash == "#download") {
    download().then(() => {
        url.hash = "";
        document.location.href = url.href;
    })
} else
    addButton(() => {
        url.hash = "download";
        document.location.href = url.href;
        document.location.reload();
    })