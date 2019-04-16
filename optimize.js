<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8">
    <title>Canvas Video Image Processing</title>

    <style>
      body {
        margin: 0;
        display: flex;
        height: 100vh;
        align-items: center;
        justify-content: center;
      }

      canvas {
        border: 1px solid black;
      }
    </style>
  </head>

  <body>
    <canvas id="drawing" width="450" height="300"></canvas>

    <div style="display: none">
      <video autoplay loop muted playsinline src="sunset.mp4"></video> <!-- all of these video attributes are necessary -->
    </div>

    <script>
      const canvas = document.getElementById('drawing');
      const context = canvas.getContext('2d', {alpha: false}); // disable alpha-composition

      let width;
      let height;

      let video = document.querySelector('video');

      function setup() {
        // fixed canvas size
        width = canvas.width;
        height = canvas.height;

        // set the CSS display size
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        // set the number of display pixels, scaled for device resolution
        let scale = window.devicePixelRatio;
        canvas.width = width * scale;
        canvas.height = height * scale;

        // normalize the coordinate system
        context.scale(scale, scale);

        video.play(); // make sure video has begun playing
      }

      let toggle = false;

      function draw() {
        toggle = !toggle;

        if (toggle) { // cut the video processing rate in half to render the canvas more efficiently
          context.drawImage(video, 0, 0, 533, 300);

          let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          let data = imageData.data;

          // video image processing
          for (let i = 0; i < data.length; i += 4) {
            // color shift: uses pixels down the line for the current value
            data[i] = data[i + (canvas.width * 4 / 3)]; // 1200
            data[i + 1] = data[i + 1 + (canvas.width * 4 / 1.5)]; // 2400
            data[i + 2] = data[i + 2 + (canvas.width * 4)]; // 3600
          }
          context.putImageData(imageData, 0, 0);
        }

        requestAnimationFrame(draw);
      }

      setup();

      video.addEventListener('play', draw); // wait for video to play before drawing to canvas
    </script>
  </body>
</html>
