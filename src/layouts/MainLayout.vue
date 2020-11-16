<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>deployed on 202011161500</div>
        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Camera',
    caption: 'Camera Access',
    icon: 'photo_camera',
    link: '/gcs-testapp/#/camera'
  },
  {
    title: 'Signature',
    caption: 'Free Write Signature',
    icon: 'history_edu',
    link: '/gcs-testapp/#/signature'
  },
  // {
  //   title: 'Camera for local',
  //   caption: 'Camera Access',
  //   icon: 'photo_camera',
  //   link: '/#/camera'
  // },
  // {
  //   title: 'Signature for local',
  //   caption: 'Free Write Signature',
  //   icon: 'history_edu',
  //   link: '/#/signature'
  // },
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
