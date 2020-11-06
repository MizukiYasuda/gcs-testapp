<template>
  <q-page class="flex flex-center">
    <h1>This is SIGNATURE page</h1>
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    <video ref="video" id="video"  autoplay playsinline ></video>
  </q-page>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      video: {}
    }
  },
  mounted () {
    const medias = {audio: false,
      video: {
        facingMode: {
          exact: 'environment'  //リアカメラの設定
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
  }
}
</script>
