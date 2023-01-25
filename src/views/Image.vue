<template>
  <button v-on:click="rectangleButton">Rectangle</button>
  <button @click="toJson">To json</button>
  <canvas ref="canvas" width="1500" height="800"></canvas>
</template>
  
<script>
import { fabric } from "fabric";

export default {
  name: "MyComponent",

  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas);
    this.canvas.on("mouse:down", (options) => this.mouseDown(options));
    this.canvas.on("mouse:move", (options) => this.mouseMove(options));
    this.canvas.on("mouse:up", (options) => this.mouseUp(options));
  },

  data() {
    return {
      rect: '',
      canvas: new fabric.Canvas(this.$refs.canvas),
      started: true,
      x: 0,
      y: 0,
      freeDrawing: false,
      textVal: '',
      activeObj: '',
      isCircleActive: false,
      isArrowActive: false,
      isRectActive: false,
      origX: 0,
      origY: 0,
      isDown: false,
    };
  },

  methods: {

    addImage() {
      fabric.Image.fromURL(
        "https://media.istockphoto.com/id/148423909/photo/a-sunset-over-chinese-fishing-nets-by-a-canoe-in-cochin.jpg?s=612x612&w=0&k=20&c=76RtSZhX5iheTAyDuH6Uzl9JNWD5axbWlEWc2bXKChw=",
        (image) => {
          image.set({
            left: this.canvas.getWidth() / 2,
            top: this.canvas.getHeight() / 2,
          });
          // this.canvas.add(image);
          this.canvas.centerObject(image);
          this.canvas.setBackgroundImage(image);
          this.canvas.renderAll();
        }
      );
    },

    rectangleButton() {
      this.isRectActive = !this.isRectActive
    },

    mouseDown(options) {
      // /* eslint-disable */
      this.isDown = true; 
      let pointer = this.canvas.getPointer(options.e);
      this.origX = pointer.x
      this.origY = pointer.y
      if(this.isRectActive) {
        this.rect = new fabric.Rect({
          left: this.origX,
          top: this.origY,
          width: pointer.x - this.origX,
          height: pointer.y - this.origY,
          fill: '',
          stroke: 'red',
          strokeWidth: 5,
        })
        this.canvas.add(this.rect)
        this.activeObj = this.rect
      }
    },

    mouseMove(options) {
      console.log("===> mouseMove  =>  "  + options.e.clientX  );
      let pointer = this.canvas.getPointer(options.e);

      if(this.isRectActive && this.isDown) {
        if(this.origX > pointer.x) {
          this.rect.set({left: Math.abs(pointer.x)})
        }
        if(this.origY > pointer.y) {
          this.rect.set({top: Math.abs(pointer.y)})
        }

        this.rect.set({width: Math.abs(this.origX - pointer.x)})
        this.rect.set({height: Math.abs(this.origY - pointer.y)})
      }
      this.canvas.renderAll();
    },

    mouseUp(options) {
      console.log("===> mouseUp  =>  "  + options.e.clientX  );
      this.isDown = false;
    },

    async toJson() {
            const json = this.canvas.toDatalessJSON("clipPath")
            const out = JSON.stringify(json, null,"\t")
            const blob = new Blob( [out], { type: "text/plain" });
            const blobURL = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = blobURL
            a.download = "myWork.json"
            a.click()
            URL.revokeObjectURL(blobURL)
        },

  },

  created() {
    this.addImage();
  },
};
</script>
  