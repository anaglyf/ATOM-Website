function addCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}
if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    console.log('Whats good') 
    addCSS(`
    [data-id="SAME WIDGET ID THATS BUGGIN OUT"] {
        backdrop-filter:blur(a less intense value?);
        -webkit-backdrop-filter:blur(the same value as above)
    }`);
}

