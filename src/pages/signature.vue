<template>
  <q-page class="flex flex-center" style="margin-bottom:50px;">
    <h1>This is SIGNATURE page</h1>
    <canvas id="canvassample" width="500" height="300"></canvas>
    <div>
    <button type="button" onclick="prevCanvas()">戻る</button>
    <button type="button" onclick="nextCanvas()">進む</button>
    </div>
    <q-btn @click="takePhoto">GET SIGN!</q-btn>
    <img :src="imgSrc" />
    <canvas style="display:none;"></canvas>
    <a id="imgatag" download="signature.png" :href="imgSrc" >download...</a>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      canvas: null,
      context: null,
      moveflg: 0,
      drawSize: 7,
      drawColor: '#555555',
      imgSrc: '',
    }
  },
  mounted() {
    this.canvas = document.getElementById('canvassample')
    this.context = this.canvas.getContext('2d'),
    this.initLocalStorage()
    this.canvas = document.getElementById('canvassample')
    console.log(this.canvas)

    // PC対応
    this.canvas.addEventListener('mousedown', this.startPoint, false);
    this.canvas.addEventListener('mousemove', this.movePoint, false);
    this.canvas.addEventListener('mouseup', this.endPoint, false);
    // スマホ対応
    this.canvas.addEventListener('touchstart', this.startPoint, false);
    this.canvas.addEventListener('touchmove', this.movePoint, false);
    this.canvas.addEventListener('touchend', this.endPoint, false);
    
  },
  methods: {
    startPoint(e) {
      console.log('%cstartPoint', 'color:red; font-size:20px;', e)
      e.preventDefault();
      this.context.beginPath();
      console.log('clientX', e.clientX);
      
      // 矢印の先っぽから始まるように調整
      const Xpoint = e.layerX-8;
      const Ypoint = e.layerY-8;
        
      this.context.moveTo(Xpoint, Ypoint);
    },
    movePoint(e) {
      if(!(e.buttons === 1 || e.witch === 1 || e.type == 'touchmove')) return
      console.log('%cmovePoint', 'color:red;', e)
      const Xpoint = e.layerX-8;
      const Ypoint = e.layerY-8;
      this.moveflg = 1;
          
      this.context.lineTo(Xpoint, Ypoint);
      this.context.lineCap = "round";
      this.context.lineWidth = this.drawSize * 2;
      this.context.strokeStyle = this.drawColor;
      this.context.stroke();
    },
    endPoint(e) {
      console.log('%cendPoint', 'color:red; font-size:20px;', e)
        if(this.moveflg === 0) {
          const Xpoint = e.layerX-8;
          const Ypoint = e.layerY-8;

          this.context.lineTo(Xpoint-1, Ypoint-1);
          this.context.lineCap = "round";
          this.context.lineWidth = this.drawSize * 2;
          this.context.strokeStyle = this.drawColor;
          this.context.stroke();
        }
        this.moveflg = 0;
        
        this.setLocalStoreage();
    },
    setLocalStoreage() {
    const png = this.canvas.toDataURL();
    const logs = JSON.parse(localStorage.getItem("__log"));

    setTimeout(function(){
        logs.unshift({png});

        localStorage.setItem("__log", JSON.stringify(logs));

        // currentCanvas = 0;
        // temp = [];

    }, 0);
    },
    initLocalStorage() {
      localStorage.setItem("__log", JSON.stringify([]));
    },
    takePhoto() {
      this.imgSrc = this.canvas.toDataURL('image/png');

    },
  }
}
</script>

<style lang="scss">
canvas {
  position: relative;
  border:3px solid #000;
}

div#img-box{
  border:3px solid #000;
  width:500px;
}

div#btn-box{
  position: fixed;
  bottom :0px;
}
</style>