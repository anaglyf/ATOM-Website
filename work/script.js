
function showError(errId, errMsg) {
    // handle critical errors here if needed
}

function patchInitialized(patch) {
    // You can now access the patch object (patch), register variable watchers and so on
}

function patchFinishedLoading(patch) {
    // The patch is ready now, all assets have been loaded
}

function loadScript() {
    function loadWidget() {
    setTimeout(() => {
        const splatWidget = document.getElementById('splatWidget');
        console.log(splatWidget); // Log the value of splatWidget to the console

        // Ensure that the element is found before attempting to pause it
        if (splatWidget) {
            // Pause the video by default
            splatWidget.pause();

            // Play the video on click
            splatWidget.addEventListener('mouseover', function () {
                this.play();
            });

            // Pause the video when the mouse leaves the element
            splatWidget.addEventListener('mouseout', function () {
                this.pause();
            });
        } else {
            console.error('Element with ID "splatWidget" not found.');
        }
    }, 700);}

    document.addEventListener("DOMContentLoaded", function () {
        // Initially hide the content div
        const contentDiv = document.getElementById('content');
        contentDiv.style.display = 'none';
    });




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
        const glcanvas = document.getElementById('glcanvas'); // Get the canvas element

        function toggleOverlay(show) {
            overlay.style.opacity = show ? '1' : '0';
            overlay.style.pointerEvents = show ? 'auto' : 'none';
        }

        function getCurrentPageIndex() {
            const hiddenElem = document.querySelector('.hiddenElem');
            if (hiddenElem) {
                const pageNumber = hiddenElem.dataset.page;
                console.log(pageNumber)
                return parseInt(pageNumber);
            }
            return 1; // Default to page 1 if no hiddenElem found
        }
// Function to load the next page
        function loadNextPage() {
            const currentPageIndex = getCurrentPageIndex();
            const nextPageIndex = currentPageIndex === 4 ? 1 : currentPageIndex + 1; // If on page 4, loop back to page 1

            loadContent('work' + nextPageIndex);
        }

        // Function to load the previous page
        function loadPreviousPage() {
            const currentPageIndex = getCurrentPageIndex();
            const previousPageIndex = currentPageIndex === 1 ? 4 : currentPageIndex - 1; // If on page 1, loop back to page 4

            loadContent('work' + previousPageIndex);
        }

        


        // Function to load content based on the selected navigation option
        function loadContent(page) {
            toggleOverlay(true);

            setTimeout(function () {
                fetch(page + '.html')
                    .then(response => response.text())
                    .then(html => {
                        contentDiv.style.display = 'block';
                        indexDiv.style.display = 'none';
                        contentDiv.innerHTML = html;
                        document.body.style.overflowY = 'auto'; // Update overflow property of body
                        toggleOverlay(false);
                        let currentPageIndex = getCurrentPageIndex()

                        // Add event listener to nextButton1 after content is loaded
                        document.getElementById('nextButton1').addEventListener('click', function (event) {
                            event.preventDefault();
                            loadAnother(currentPageIndex);
                            loadWidget();
                        });

                        document.getElementById('backButton1').addEventListener('click', function (event) {
                            event.preventDefault();
                            loadAnother(currentPageIndex - 2);
                            loadWidget();
                        });
                        
                    })
                    .catch(error => console.log(error));
            }, 400);
        }


        function loadAnother(currentPageIndex) {
            console.log(currentPageIndex)
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
                            loadNextPage();
                            loadWidget();
                        });

                        document.getElementById('backButton1').addEventListener('click', function (event) {
                            event.preventDefault();
                            loadPreviousPage();
                            loadWidget();
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
            console.log("Hello world!");
            loadWidget();
        });

        document.getElementById('work3').addEventListener('click', function (event) {
            event.preventDefault();
            loadContent('work3');
        });

        document.getElementById('work4').addEventListener('click', function (event) {
            event.preventDefault();
            loadContent('work4');
            setTimeout(function () {
                document.getElementById('backButton1').addEventListener('click', function (event) {
                    event.preventDefault();
                    loadPreviousPage();
                    loadWidget();
                });
            }, 700);
        });

        

        // Load default content on page load
        // Place default content load here if needed
    });
}
loadScript()



