<template>
    <div class="container" style="background: whitesmoke;">
      <canvas ref="canvas" width="1500" height="800"></canvas>
      <button @click="addRect">Add Rectangle</button>
      <button @click="toJson">To json</button>
      <button @click="toImage">To PNG</button>

    </div>
  </template>
  
  <script>
  import { fabric } from 'fabric';
  let canvas
  
  export default {
    name: 'MyComponent',
    data() {
      return {
        count: 0
      }
    },
    methods: {
        async toJson() {
            const json = canvas.toDatalessJSON("clipPath")
            const out = JSON.stringify(json, null,"\t")
            const blob = new Blob( [out], { type: "text/plain" });
            //eslint-disable-next-line
            const clipboardItemData = {[blob.type]: blob}
            const blobURL = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = blobURL
            a.download = "myWork.json"
            a.click()
            URL.revokeObjectURL(blobURL)
        },

        toImage() {
            const ext = "png"
            const base64 = canvas.toDataURL({
                format: ext,
                enableRetinaScaling: true
            })
            const link = document.createElement("a")
            link.href = base64;
            link.download = `pngDemo.${ext}`
            link.click()
        },

        addRect() {
            this.count = this.count +50
            const rect = new fabric.Rect({
            top: 300,
            left: this.count,
            width: 50,
            height: 50,
            fill: 'yellow',
            corner: 100,
            borderColor: 'yellow',
            cornerSize: 10,
            cornerStyle: 'circle'
             
        })
        canvas.add(rect)
        },

        onObjectScaling() {
            const obj = canvas.getActiveObject()
            // console.log(obj);
            const width = obj.width
            const height = obj.height
            const scaleX = obj.scaleX
            const scaleY = obj.scaleY
            // console.log("w", width, "h", height);
            obj.set({
                width: width*scaleX,
                height: height*scaleY,
                scaleX: 1,
                scaleY: 1,
            })
        }
    },
  
    mounted() {
        canvas = new fabric.Canvas(this.$refs.canvas, {
            isDrawingMode: false,
        })

        // new fabric.Image.fromURL("https://media.istockphoto.com/id/148423909/photo/a-sunset-over-chinese-fishing-nets-by-a-canoe-in-cochin.jpg?s=612x612&w=0&k=20&c=76RtSZhX5iheTAyDuH6Uzl9JNWD5axbWlEWc2bXKChw=", (img) => {
        //     const imag = img.set({left:0, top:0, width:img.width, height:img.height})
        //     canvas.add(imag)
        // })

        const textBox = new fabric.Textbox('FabricJS', {
            left:20,
            top: 20,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 2

        })
        const rect = new fabric.Rect({
            top: 150,
            left: 100,
            width: 50,
            height: 50,
            fill: 'red',
            corner: 100,
            borderColor: 'blue',
            cornerSize: 10,
            cornerStyle: 'circle'
             
        })
        canvas.on('object:scaling', this.onObjectScaling)
        canvas.add(rect)
        canvas.add(textBox)
        // canvas.loadFromJSON("name//and import", (e) => {
        //     canvas.renderAll()
        // })

    }
  };
  </script>
  