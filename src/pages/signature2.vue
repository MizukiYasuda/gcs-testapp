<template>
  <q-page class="flex flex-center">
    <h1>This is SIGNATURE page</h1>

    <canvas id="canvassample" width="500" height="300"></canvas>
    <div>
    <button type="button" @click="prevCanvas">戻る</button>
    <button type="button" @click="nextCanvas">進む</button>
    </div>
    
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      myStorage: localStorage,
      ctx: null,
      Xpoint: null,
      Ypoint: null,
      moveflg: 0,
      //初期値（サイズ、色、アルファ値）の決定
      defSize: 7,
      defColor: "#555",
      canvas: null,
      currentCanvas: null,
      temp: [],
    }
  },
  mounted() {
    console.log(localStorage)
    console.log(this.myStorage)
    this.canvas = document.getElementById('canvassample')
    this.ctx = this.canvas.getContext('2d')
  
  

// ストレージの初期化
this.initLocalStorage();
  
  console.log(this.canvas)
// PC対応
// this.canvas.addEventListener('mousedown', this.startPoint, false);
// this.canvas.addEventListener('mousemove', this.movePoint, false);
// this.canvas.addEventListener('mouseup', this.endPoint, false);
// // スマホ対応
// this.canvas.addEventListener('touchstart', this.startPoint, false);
// this.canvas.addEventListener('touchmove', this.movePoint, false);
// this.canvas.addEventListener('touchend', this.endPoint, false);
  },
  methods: {
    startPoint(e) {
      console.log('testmousedown')
      e.preventDefault();
      this.ctx.beginPath();
      console.log(e.clientX);
      
        
      // 矢印の先っぽから始まるように調整
      this.Xpoint = e.clientX-8;
      this.Ypoint = e.clientY-8;
        
      this.ctx.moveTo(this.Xpoint, this.Ypoint);
    },
    movePoint(e) {
      if(e.buttons === 1 || e.witch === 1 || e.type == 'touchmove')
      {
        this.Xpoint = e.pageX-8;
      　this.Ypoint = e.pageY-8;
        this.moveflg = 1;
          
        this.ctx.lineTo(this.Xpoint, this.Ypoint);
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = this.defSize * 2;
        this.ctx.strokeStyle = this.defColor;
        this.ctx.stroke();
          
      }
    },
    endPoint(e) {
      if(this.moveflg === 0)
      {
        this.ctx.lineTo(this.Xpoint-1, this.Ypoint-1);
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = this.defSize * 2;
        this.ctx.strokeStyle = this.defColor;
        this.ctx.stroke();
          
      }
      this.moveflg = 0;
      
      this.setLocalStoreage();
    },
    resetCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
},
initLocalStorage(){
  console.log('initlocalstrage')
    this.myStorage.setItem("__log", JSON.stringify([]));
},
setLocalStoreage(){
    var png = this.canvas.toDataURL();
    var logs = JSON.parse(this.myStorage.getItem("__log"));
    self = this
    setTimeout(function(){
        logs.unshift({png});
 
        console.log(self.myStorage)
        self.myStorage.setItem("__log", JSON.stringify(logs));
 
        self.currentCanvas = 0;
        self.temp = [];
 
    }, 0);
},
prevCanvas(){
    var logs = JSON.parse(this.myStorage.getItem("__log"));
 
    if(logs.length > 0)
    {
        this.temp.unshift(logs.shift());
    self = this
 
        setTimeout(function(){
            self.myStorage.setItem("__log", JSON.stringify(logs));
            resetCanvas();
 
            draw(logs[0]['png']);
 
        }, 0);
    }
},
nextCanvas(){
    var logs = JSON.parse(this.myStorage.getItem("__log"));
 
    if(this.temp.length > 0)
    {
        logs.unshift(this.temp.shift());
    self = this
 
        setTimeout(function(){
            self.myStorage.setItem("__log", JSON.stringify(logs));
            resetCanvas();
 
            draw(logs[0]['png']);
 
        }, 0);
    }
},
draw(src) {
    var img = new Image();
    img.src = src;
 
    img.onload = function() {
        this.ctx.drawImage(img, 0, 0);
    }
}
  },
}
</script>

<style>
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