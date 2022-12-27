<!-- <template>
  <div>
    <video ref="video" width="640" height="360" controls></video>
    <button @click="playVideo">Play</button>
    <button @click="pauseVideo">Pause</button>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',

  methods: {
    playVideo() {
      this.$refs.video.src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
      // this.$refs.video.crossOrigin="anonymous"
      this.$refs.video.play();
    },
    pauseVideo() {
      this.$refs.video.pause();
    }
  }
};
</script> -->


<template>
  <div>
    <canvas id="videoCanvas" width="640" height="360"></canvas>
    <!-- <video ref="video" width="640" height="360" controls></video> -->
    <!-- <button @click="playVideo">Play</button> -->
    <!-- <button @click="pauseVideo">Pause</button> -->
  </div>
</template>

<script>
export default {
  name: 'MyComponent',

  methods: {
    // playVideo() {
    //   this.$refs.video.play();
    // },
    // pauseVideo() {
    //   this.$refs.video.pause();
    // }
  },

  mounted() {
    const video = document.createElement('video');
    video.src = 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4';
    video.autoplay = true;
    video.loop = true;

    const canvas = document.getElementById('videoCanvas');
    const ctx = canvas.getContext('2d');

    video.addEventListener('play', () => {
      const loop = () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(loop);
      };
      loop();
    });
  }
};
</script>