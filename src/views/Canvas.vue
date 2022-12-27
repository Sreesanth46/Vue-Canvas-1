<template>
  <div class="container">
    <canvas ref="canvas" width="500" height="500"></canvas>
    <button v-on:click="erase">Cancel</button>
    <button v-on:click="rectangleButton">Rectangle</button>
    <button v-on:click="pencilButton">Pencil</button>
    <button v-on:click="eraseButtonClick">Eraser</button>
    <button @click="importImage">Import Image</button>
    <button @click="downloadCanvas">Download Image</button>

  </div>
</template>

<script>
export default {
  name: 'CanvasComponent',

  data() {
    return {
      toolbar: 0,
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      eraseButton: false,
      brushSize: 10,
      isDrawingRectangle: false,
      currentX: 0,
      currentY: 0,
    };
  },
  methods: {

    startDrawing(event) {
      switch (this.toolbar) {
        case 1:
                this.isDrawing = true;
                break;
        case 2:
                this.isDrawingRectangle = true;
                break;
        default:
                break;
      }
      this.eraseButton = false
      this.lastX = event.offsetX;
      this.lastY = event.offsetY;
    },

    draw(event) {
      if (!this.isDrawing) return;

      const ctx = this.$refs.canvas.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
      this.lastX = event.offsetX;
      this.lastY = event.offsetY;
    },

    drawRectangle(event) {
      if (!this.isDrawingRectangle) return;

      this.currentX = event.offsetX;
      this.currentY = event.offsetY;

      const ctx = this.$refs.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      ctx.beginPath();
      ctx.rect(this.lastX, this.lastY, this.currentX - this.lastX, this.currentY - this.lastY);
      ctx.stroke();
    },

    stopDrawing() {
      this.isDrawing = false;
      this.isDrawingRectangle = false;
    },

    rectangleButton() {
      this.toolbar = 2
    },

    pencilButton() {
      this.toolbar = 1
    },

    erase() {
      this.toolbar = 0
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
    },

    eraseButtonClick() {
      this.toolbar = 0
      this.eraseButton = !this.eraseButton
    },

    eraser(event) {
      if(this.eraseButton) {
        const ctx = this.$refs.canvas.getContext('2d');
        ctx.clearRect(event.offsetX - this.brushSize, event.offsetY - this.brushSize, this.brushSize * 2, this.brushSize * 2);
      }
    },

    importImage() {
      const ctx = this.$refs.canvas.getContext('2d');
      const image = new Image()
      image.src = 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
      image.crossOrigin="Anonymous"

      image.onload = () => {
        ctx.drawImage(image, 0, 0)
      }
    },

    downloadCanvas() {
      const canvas = this.$refs.canvas
      const dataURL = canvas.toDataURL()

      const a = document.createElement('a')
      a.download = 'image.png'
      a.href = dataURL

      a.click()
    }


  },

  mounted() {
    this.$refs.canvas.addEventListener('mousedown', this.startDrawing);
    this.$refs.canvas.addEventListener('mousemove', this.draw);
    this.$refs.canvas.addEventListener('mousemove', this.drawRectangle);
    // this.$refs.canvas.addEventListener('mousedown', this.eraser);
    this.$refs.canvas.addEventListener('mousemove', this.eraser);
    this.$refs.canvas.addEventListener('mouseup', this.stopDrawing);
    this.$refs.canvas.addEventListener('mouseout', this.stopDrawing);
  },

}
</script>

<style>
canvas {
  border: 1px solid black;
}
</style>