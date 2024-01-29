function showError(errId, errMsg) {
    // handle critical errors here if needed
}

function patchInitialized(patch) {
    // You can now access the patch object (patch), register variable watchers and so on
}

function patchFinishedLoading(patch) {
    // The patch is ready now, all assets have been loaded
}

document.addEventListener("CABLES.jsLoaded", function (event) {
    CABLES.patch = new CABLES.Patch({
        patch: CABLES.exportedPatch,
        "prefixAssetPath": "",
        "assetPath": "",
        "jsPath": "",
        "glCanvasId": "glcanvas",
        "glCanvasResizeToWindow": true,
        "onError": showError,
        "onPatchLoaded": patchInitialized,
        "onFinishedLoading": patchFinishedLoading,
        "canvas": { "alpha": true, "premultipliedAlpha": true } // make canvas transparent
    });
});





















// disable rubberband effect on mobile devices
document.addEventListener("DOMContentLoaded", function () {
    const contentDiv = document.getElementById('content');
    const indexDiv = document.getElementById('index');
    const overlay = document.getElementById('overlay');

    function toggleOverlay(show) {
        overlay.style.opacity = show ? '1' : '0';
        overlay.style.pointerEvents = show ? 'auto' : 'none';
    }

    let currentPageIndex = 1;
    // Function to load content based on the selected navigation option
    function loadContent(page) {
        toggleOverlay(true);

        setTimeout(function () {
            fetch(page + '.html')
                .then(response => response.text())
                .then(html => {
                    indexDiv.style.display = 'none';
                    contentDiv.innerHTML = html;
                    toggleOverlay(false);

                    // Add event listener to nextButton1 after content is loaded
                    document.getElementById('nextButton1').addEventListener('click', function (event) {
                        event.preventDefault();
                        loadAnother();
                    });
                })
                .catch(error => console.log(error));
        }, 500);
    }


    function loadAnother() {
        toggleOverlay(true);

        // Calculate the next page index
        const nextPageIndex = currentPageIndex + 1;

        setTimeout(function () {
            fetch('work' + nextPageIndex + '.html')
                .then(response => {
                    if (!response.ok) {
                        // If the next page is not found, default back to work1
                        currentPageIndex = 1;
                        return fetch('work1.html');
                    }
                    return response.text();
                })
                .then(html => {
                    contentDiv.innerHTML = html;
                    toggleOverlay(false);

                    // Update the current page index
                    currentPageIndex = nextPageIndex;

                    // Add event listener to nextButton1 after content is loaded
                    document.getElementById('nextButton1').addEventListener('click', function (event) {
                        event.preventDefault();
                        loadAnother();
                    });
                })
                .catch(error => console.log(error));
        }, 500);
    }


    // Event listeners for navigation links
    document.getElementById('work1').addEventListener('click', function (event) {
        event.preventDefault();
        loadContent('work1');
    });

    document.getElementById('work2').addEventListener('click', function (event) {
        event.preventDefault();
        loadContent('work2');
    });

    document.getElementById('work3').addEventListener('click', function (event) {
        event.preventDefault();
        loadContent('work3');
    });

    document.getElementById('work4').addEventListener('click', function (event) {
        event.preventDefault();
        loadContent('work4');
    });

    

    // Load default content on page load
    // Place default content load here if needed
});
