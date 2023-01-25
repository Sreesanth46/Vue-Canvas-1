<template>
  <div class="container" style="display:grid; justify-items: center;">
    <canvas ref="can" width="1500" height="800"></canvas>
    <input type="file" ref="fileInput" @change="handleFileChange"/>
  </div>
</template>

<script>
import { fabric } from 'fabric';

export default {
  name: 'MyComponent',
  data() {
    return {
      imageSrc: '', 
    }
  },
  methods: {
    handleFileChange() {
      let file = this.$refs.fileInput.files[0];
      let reader = new FileReader();
      reader.onload = (event) => {
        this.imageSrc = event.target.result;
        this.renderImage(event.target.result)
      };
      reader.readAsDataURL(file);
    },

    renderImage(src) {
      const ref = this.$refs.can;
      const canvas = new fabric.Canvas(ref);
      fabric.Image.fromURL(src, function(oImg) {
        oImg.scale(0.25)
        canvas.add(oImg);
    });
    },

    
  },

  mounted() {
    const canvas = new fabric.Canvas(this.$refs.can);
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = 'red';
    canvas.freeDrawingBrush.width = 2;
    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
      blur: 0,
      offsetX: 0,
      offsetY: 0,
      affectStroke: true,
      color: 'red'
    });
  }
};
</script>
