//-----------------------------------------------------------------------------
// ContentManager.js
//
// Inspired by the Microsoft XNA Community Game Platformer Sample
// Copyright (C) Microsoft Corporation. All rights reserved.
// Ported to HTML5 Canvas with EaselJS by David Rousset - http://blogs.msdn.com/davrous
//-----------------------------------------------------------------------------

// Used to download all needed resources from our
// webserver
function ContentManager(stage, width, height) {
    // Method called back once all elements
    // have been downloaded
    var ondownloadcompleted;
    // Number of elements to download
    var NUM_ELEMENTS_TO_DOWNLOAD = 3;
    var numElementsLoaded = 0;

    var downloadProgress;

    // setting the callback method
    // Triggered once everything is ready to be drawned on the canvas
    this.SetDownloadCompleted = function (callbackMethod) {
        ondownloadcompleted = callbackMethod;
    };

    // All the Images & Sounds of our game
    this.imgPlayer = new Image();
    this.imgBackground = new Image(); 
    this.imgBackgroundMask = new Image(); 
    
    // public method to launch the download process
    this.StartDownload = function () {
        // add a text object to output the current donwload progression
        downloadProgress = new createjs.Text("-- %", "bold 14px Arial", "#FFF");
        downloadProgress.x = (width / 2) - 50;
        downloadProgress.y = height / 2;
        stage.addChild(downloadProgress);

        SetDownloadParameters(this.imgPlayer, "img/player.png");
        SetDownloadParameters(this.imgBackground, "img/background.png");
        SetDownloadParameters(this.imgBackgroundMask, "img/backgroundMask.png");

        createjs.Ticker.addListener(this);
        createjs.Ticker.setInterval(50);
    };

    function SetDownloadParameters(assetElement, url) {
        assetElement.src = url;
        assetElement.onload = handleElementLoad;
        assetElement.onerror = handleElementError;
    };



    // our global handler 
    function handleElementLoad(e) {
        numElementsLoaded++;

        // If all elements have been downloaded
        if (numElementsLoaded === NUM_ELEMENTS_TO_DOWNLOAD) {
            stage.removeChild(downloadProgress);
            createjs.Ticker.removeAllListeners();
            numElementsLoaded = 0;
            // we're calling back the method set by SetDownloadCompleted
            ondownloadcompleted();
        }
    }

    //called if there is an error loading the image (usually due to a 404)
    function handleElementError(e) {
        console.log("Error Loading Asset : " + e.target.src);
    }

    // Update methid which simply shows the current % of download
    this.tick = function() {
        downloadProgress.text = "Downloading " + Math.round((numElementsLoaded / NUM_ELEMENTS_TO_DOWNLOAD) * 100) + " %";

        // update the stage:
        stage.update();
    };
}