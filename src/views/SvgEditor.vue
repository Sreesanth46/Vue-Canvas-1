<template>
  <div id="app">
    <div class="demo-container">
      <div>
        <button class="btn" @click="addTextField">Add Text Field</button>
        <button class="btn" @click="addRectangle">Add Rectangle</button>
        <button class="btn" @click="addEllipse">Add Ellipse</button>
      </div>
      <div class="colorpicker" v-show="showcolors">
        <color-picker v-model="colors" @change-color="onChange"></color-picker>
      </div>
      <div class="active-item-toolbar">
        <button class="btn" @click="toggleColor">
          <i
            class="fa fa-square"
            aria-hidden="true"
            :style="{ color: colors.hex }"
          ></i>
        </button>
        <button class="btn" @click="textAlign('start')">
          <i class="fa fa-align-left" aria-hidden="true"></i>
        </button>
        <button class="btn" @click="textAlign('middle')">
          <i class="fa fa-align-center" aria-hidden="true"></i>
        </button>
        <button class="btn" @click="textAlign('end')">
          <i class="fa fa-align-right" aria-hidden="true"></i>
        </button>
        <button class="btn" @click="moveUp()">
          <i class="fa fa-angle-up" aria-hidden="true"></i>
        </button>
        <button class="btn" @click="moveDown()">
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </button>
      </div>
      <div class="canvas">
        <svg
          :width="width"
          :height="height"
          @mousemove="onMouseMove($event)"
          @mouseup="onMouseUp($event)"
          @click="onClickItem($event, {})"
        >
          <g
            v-for="(item, index) in items" :key="index"
            :transform="'translate(' + item.x + ', ' + item.y + ')'">

            <text
              v-if="item.type == 'text'"
              :x="getTextXPos(item)"
              :y="item.height * 0.9"
              :_width="item.width"
              :_height="item.height"
              :font-size="item.height"
              :font-family="item.font"
              :fill="item.color"
              :text-anchor="item.textAnchor"
              @click="onClickItem($event, item)"
            >
              {{ item.text }}
            </text>

            <rect
              v-if="item.type == 'rect'"
              :x="0"
              :y="0"
              :width="item.width"
              :height="item.height"
              :fill="item.color"
              @click="onClickItem($event, item)"
            ></rect>

            <ellipse
              v-if="item.type == 'ellipse'"
              :cx="item.width / 2"
              :cy="item.height / 2"
              :rx="item.width / 2"
              :ry="item.height / 2"
              :fill="item.color"
              @click="onClickItem($event, item)"
            ></ellipse>

            <!-- controls 
        <g v-for="item in items"
          :transform="'translate('+item.x+', '+item.y+')'"
          v-if="item.active"
        >-->
            <g v-if="item.active">
              <rect
                :x="0"
                :y="0"
                :width="item.width"
                :height="item.height"
                class="ctrl-bounds"
                @click="onClickItem($event, item)"
                @_mouseout="onMouseUpRegion($event, item)"
                @mousedown="onMouseDownRegion($event, item)"
              />
              <g @mousedown="onMouseDownHandles($event, item)">
                <rect
                  class="ctrl-rect"
                  :width="tools.squaresize"
                  :height="tools.squaresize"
                  data-handleid="1"
                  :x="0 - tools.squaresize / 2"
                  :y="0 - tools.squaresize / 2"
                />
                <rect
                  class="ctrl-rect"
                  :width="tools.squaresize"
                  :height="tools.squaresize"
                  data-handleid="3"
                  :x="item.width - tools.squaresize / 2"
                  :y="0 - tools.squaresize / 2"
                />
                <rect
                  class="ctrl-rect"
                  :width="tools.squaresize"
                  :height="tools.squaresize"
                  data-handleid="7"
                  :x="0 - tools.squaresize / 2"
                  :y="item.height - tools.squaresize / 2"
                />
                <rect
                  class="ctrl-rect"
                  :width="tools.squaresize"
                  :height="tools.squaresize"
                  data-handleid="9"
                  :x="item.width - tools.squaresize / 2"
                  :y="item.height - tools.squaresize / 2"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
  Press Delete button to remove selected item.<br />
  still lots to do...
</template>
<script>
// var photoshop = VueColor.Photoshop;
// var material = VueColor.Material;
// var sketch = VueColor.Sketch;
// var slider = VueColor.Slider;
// var compact = VueColor.Compact;
// var swatches = VueColor.Swatches;

var defaultProps = {
  hex: "#999999",
  a: 1,
};

new Vue({
  el: "#app",

  data() {
    return {
      width: 600,
      height: 400,
      colors: defaultProps,
      onChangeColorListener: null,
      showcolors: false,
      movetarget: null,
      activeItemIndex: null,
      items: [],
      tools: {
        squaresize: 8,
        min_height: 10,
      },
    };
  },

  components: {
    // 'color-picker': material,
    // 'color-picker': photoshop,
    "color-picker": sketch,
    // 'color-picker': slider,
    // 'color-picker': compact,
    // 'color-picker': swatches,Vue
  },

  methods: {
    onChange(val) {
      if (this.onChangeColorListener) {
        this.colors = val;
        this.onChangeColorListener();
      }
    },

    toggleColor() {
      this.showcolors = !this.showcolors;
    },

    addTextField() {
      this.items.push(this.createTextField());
    },

    addRectangle() {
      this.items.push(this.createRectangle());
    },

    addEllipse() {
      this.items.push(this.createEllipse());
    },

    createTextField() {
      return {
        type: "text",
        textAnchor: "left",
        active: false,
        x: ((this.items.length + 2) % 20) * 20,
        y: ((this.items.length + 2) % 20) * 20,
        text: "ENTER TEXT",
        width: 400,
        height: 40,
        font: "Arial",
        color: this.colors.hex || "#366696",
      };
    },

    createRectangle() {
      return {
        type: "rect",
        active: false,
        x: ((this.items.length + 2) % 20) * 20,
        y: ((this.items.length + 2) % 20) * 20,
        width: 400,
        height: 20,
        color: this.colors.hex || "#366696",
      };
    },

    createEllipse() {
      return {
        type: "ellipse",
        active: false,
        x: ((this.items.length + 2) % 20) * 20,
        y: ((this.items.length + 2) % 20) * 20,
        width: 120,
        height: 120,
        color: this.colors.hex || "#366696",
      };
    },

    onClickItem(event, item) {
      event.stopPropagation(); //prevent parent from firing
      if (item.active) {
        return;
      }
      // select item if not selected
      this.deactivateItems();
      item.active = true;
      this.onChangeColorListener = function () {
        item.color = this.colors.hex;
      };
      this.colors = defaultProps;
      this.colors.hex = item.color;
      this.activeItemIndex = this.items.indexOf(item);
    },

    moveUp() {
      if (
        this.activeItemIndex >= 0 &&
        this.activeItemIndex < this.items.length
      ) {
        var i = this.items[this.activeItemIndex];
        swapArrayElements(
          this.items,
          this.activeItemIndex,
          this.activeItemIndex + 1
        );
        this.activeItemIndex += 1;
        this.$forceUpdate();
      }
    },

    moveDown() {
      if (this.activeItemIndex >= 0 && this.activeItemIndex >= 0) {
        var i = this.items[this.activeItemIndex];
        swapArrayElements(
          this.items,
          this.activeItemIndex,
          this.activeItemIndex - 1
        );
        this.activeItemIndex -= 1;
        this.$forceUpdate();
      }
    },

    deactivateItems() {
      this.items.map(function (i) {
        if (i) i.active = false;
      });
    },

    removeActiveItem() {
      this.items = this.items.filter((i) => i.active === false);
    },

    onMouseDownRegion(event, item) {
      if (item.active) {
        item.drag = {
          type: "MOVE",
          x: item.x,
          y: item.y,
          mx: event.x,
          my: event.y,
        };
      }
      this.movetarget = item;
    },

    onMouseUp(event, element) {
      this.movetarget = null;
    },

    onMouseMove(event) {
      if (this.movetarget == null) return;
      var item = this.movetarget;
      var t = this.tools;

      if (item.active && item.drag != undefined) {
        if (item.drag.type == "MOVE") {
          item.x = event.x - item.drag.mx + item.drag.x;
          item.y = event.y - item.drag.my + item.drag.y;
        }
        if (item.drag.type == "SCALE") {
          if (item.drag.handleID == "1") {
            // TL resize handler
            item.x = Math.min(
              event.x - item.drag.mx + item.drag.x,
              item.drag.x + (item.drag.w - t.min_height)
            );
            item.y = Math.min(
              event.y - item.drag.my + item.drag.y,
              item.drag.y + (item.drag.h - t.min_height)
            ); // with y constraint
            item.width = Math.max(
              item.drag.w - event.x + item.drag.mx,
              t.min_height
            );
            item.height = Math.max(
              item.drag.h - event.y + item.drag.my,
              t.min_height
            );
          }
          if (item.drag.handleID == "3") {
            // TR resize handler
            item.y = Math.min(
              event.y - item.drag.my + item.drag.y,
              item.drag.y + (item.drag.h - t.min_height)
            ); // with y constraint
            item.width = Math.max(
              item.drag.w + event.x - item.drag.mx,
              t.min_height
            );
            item.height = Math.max(
              item.drag.h - event.y + item.drag.my,
              t.min_height
            );
          }
          if (item.drag.handleID == "7") {
            // BL
            item.x = Math.min(
              event.x - item.drag.mx + item.drag.x,
              item.drag.x + (item.drag.w - t.min_height)
            );
            item.width = Math.max(
              item.drag.w - event.x + item.drag.mx,
              t.min_height
            );
            item.height = Math.max(
              item.drag.h + event.y - item.drag.my,
              t.min_height
            );
          }
          if (item.drag.handleID == "9") {
            // BR
            item.width = Math.max(
              item.drag.w + event.x - item.drag.mx,
              t.min_height
            );
            item.height = Math.max(
              item.drag.h + event.y - item.drag.my,
              t.min_height
            );
          }
        }
      }
    },

    onKeyUp(event) {
      if (event.key === "Delete") {
        this.removeActiveItem();
      }
      return event.preventDefault();
    },

    onMouseDownHandles(event, item) {
      var handleID = event.target.getAttribute("data-handleid");

      item.drag = {
        x: item.x,
        y: item.y,
        mx: event.x,
        my: event.y,
        w: item.width,
        h: item.height,
        type: "SCALE",
        handleID: handleID,
      };

      this.movetarget = item;
    },

    textAlign(val) {
      var i = this.items[this.activeItemIndex];
      if (i && i.type == "text") {
        i.textAnchor = val;

        this.$forceUpdate();
      }
    },

    getTextXPos(item) {
      if (item.textAnchor == "middle") return item.width / 2;
      if (item.textAnchor == "end") return item.width;
      return 0;
    },
  },

  mounted() {
    window.addEventListener("keyup", this.onKeyUp);
  },
});
var swapArrayElements = function (arr, indexA, indexB) {
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};
</script>