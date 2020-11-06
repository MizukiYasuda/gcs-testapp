<template>
  <q-page class="flex flex-center">
    <h1>This is CAMERA page</h1>
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" />
    <q-btn color="primary" label="Get Picture" @click="captureImage" />
    <img :src="imageSrc" />
  </q-page>
</template>

<script>
// outside of the default export,
// we need to listen to the event for ourselves:
document.addEventListener(
  "deviceready",
  () => {
    // it's only now that we are sure
    // the event has triggered
  },
  false
);
export default {
  name: "PageIndex",
  data() {
    return {
      imageSrc: ""
    };
  },
  methods: {
    captureImage() {
      console.log(navigator);
      navigator.camera.getPicture(
        data => {
          // on success
          this.imageSrc = `data:image/jpeg;base64,${data}`;
        },
        () => {
          // on fail
          this.$q.notify("Could not access device camera.");
        },
        {
          // camera options
        }
      );
    }
  }
};
</script>
