function initMedia(){

  return new Promise((resolve, reject) => {

      const video = document.createElement('video');
      video.id = 'video__container';
      const videoSize = 128;
      video.width = video.height = videoSize;

      // Uncomment to see video feed
      document.querySelector('body').appendChild(video);

      const constraints = {
        video: {
          // Makes sure video size is square for webgl tiling
          width: videoSize, height: videoSize,
          // Makes sure back cam is used
          facingMode: "environment"
        },
      };

      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          // Assign stream to video src
          video.srcObject = stream;

          resolve(video);
        });
    });
};

export default initMedia;
