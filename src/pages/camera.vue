<template>
  <q-page class="flex flex-center">
    <h1>This is CAMERA page</h1>
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    <video ref="video" id="video"  autoplay playsinline ></video>
    <q-btn @click="takePhoto">TAKE PHOTO!</q-btn>
    <img :src="imgSrc" />
    <q-btn @click="downloadPhoto">DOWNLOAD PHOTO!</q-btn>
    <a id="imgatag" download="photo.png" :href="imgSrc"/>
  </q-page>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      video: {},
      imgSrc: ''
    }
  },
  mounted () {
    const medias = {audio: false,
      video: {
        facingMode: {
          // exact: 'environment'  // リアカメラの設定
          exact: 'user' // インカメラの設定
        }
      }}
    this.video = this.$refs.video
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(medias).then(stream => {
        this.video.srcObject = stream
      }).catch(err => {
        console.log(err)
      })
    }
  },
  methods: {
    takePhoto() {
      const self = this
      const track = this.video.srcObject.getVideoTracks()[0]
      const imageCapture = new ImageCapture(track)
      imageCapture.takePhoto().then(function(blob) {
        console.log('Took photo:', blob);
        // img.classList.remove('hidden');
        self.imgSrc = URL.createObjectURL(blob);
      }).catch(function(error) {
        console.log('takePhoto() error: ', error);
      });
    },
    downloadPhoto() {
      // window.navigator.msSaveBlob(this.imgSrc, "photo.png");
      // document.getElementById("download").href = window.URL.createObjectURL(this.imgSrc); 
      document.getElementById("imgatag").click()
    }
  },
}
</script>
