<template>
  <v-app id="app">
    <page-loader></page-loader>
    <v-content>
      <v-toolbar dense v-if="remoteVersion.version !== version">
        <v-spacer></v-spacer>
        <v-btn :disabled="patchManager.downloadInProgress" :href="remoteVersion.link">
          {{ `download_launcher` | trans }}
        </v-btn>
      </v-toolbar>
      <main-content v-if="patchManager.patchList" />
    </v-content>
    <v-footer
            dark
            padless
    >
      <v-row>
        <v-col cols="12" class="text-right">
          <footer-action v-if="patchManager.patchList" />
        </v-col>
        <v-col cols="12" class="py-2 text_wow_style text-center">
          <span id="powered_by">Murloc Village Launcher - v{{ version }}</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import MainContent from './components/MainContent'
import FooterAction from "./components/FooterAction"
import PageLoader from "./components/PageLoader"
const { patchManager } = require(`./patchManager`)
const { EventBus } = require(`./event-bus`)
const  pjson = require(`../package.json`)
const { config } = require(`./config`)
const axios = require(`axios`)

export default {
    name: `App`,

    components: {
        PageLoader,
        MainContent,
        FooterAction,
    },

    data: () => ({
        patchManager: patchManager,
        version: pjson.version,
        remoteVersion: {version: pjson.version}
    }),

    mounted() {
        const _this = this
        axios({
            method: `get`,
            url: `${config.conf.patchlist_endpoint}/version/`,
        }).then(function (response) {
            _this.remoteVersion = response.data
        })
    },

    watch: {
        'patchManager.patchList'(val) {
            if(val) {

                EventBus.$emit(`event_loader_stop`,  `patches`)
            }
        }
    }
}
</script>
<style>
  @font-face {
    font-family: "LifeCraft";
    src: url(/images/LifeCraft_Font.ttf) format("truetype");

  }
  #app {
    height: 100%;
    width: 100%;
  }
  #powered_by {
    font-family: "LifeCraft";
    font-size: large;
  }
</style>
