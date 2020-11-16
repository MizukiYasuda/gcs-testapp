<template>
  <q-page class="flex flex-center" style="margin-bottom:50px;">
    <h1>This is CAMERA page</h1>
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    > -->
    <div class="full-width flex flex-center">
      <video ref="video" id="video"  autoplay playsinline ></video>
    </div>
    <q-btn @click="takePhoto">TAKE PHOTO!</q-btn>
    <!-- <img :src="imgSrc" /> -->
    <canvas style="display:none;"></canvas>
    <!-- <q-btn @click="downloadPhoto">DOWNLOAD PHOTO!</q-btn> -->
    <!-- <a id="imgatag" download="photo.png" :href="imgSrc" >download...</a> -->
    <q-dialog v-model="isModalOpen">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">写真を保存</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <img :src="imgSrc" />
          <!-- <canvas style="display:none;"></canvas> -->
          <!-- <q-btn @click="downloadPhoto">DOWNLOAD PHOTO!</q-btn> -->
          <a id="imgatag" download="photo.png" :href="imgSrc" >download...</a>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      video: {},
      imgSrc: '',
      isModalOpen: false,
    }
  },
  mounted () {
    const medias = {audio: false,
      video: {
        facingMode: {
          // exact: 'environment'  // リアカメラの設定
          exact: 'user' // フロントカメラの設定
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
      const video = document.querySelector('video')
      const canvas = document.querySelector('canvas')
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      // Other browsers will fall back to image/png
      this.imgSrc = canvas.toDataURL('image/png');
      this.isModalOpen = true

      // const track = this.video.srcObject.getVideoTracks()[0]
      // const imageCapture = new ImageCapture(track)
      // imageCapture.takePhoto().then(function(blob) {
      //   console.log('Took photo:', blob);
      //   // img.classList.remove('hidden');
      //   self.imgSrc = URL.createObjectURL(blob);
      //   alert(self.imgSrc)
      // }).catch(function(error) {
      //   alert('takePhoto() error: ', error);
      // });
    },
    // downloadPhoto() {
    //   // window.navigator.msSaveBlob(this.imgSrc, "photo.png");
    //   document.getElementById("imgatag").href = this.imgSrc
    //   document.getElementById("imgatag").click()
    // }
  },
}
</script>
