<template>
  <div class="video">
    <!-- <cvue-video :forbidProgress="true" :currTime="5"></cvue-video> -->
    <ul>
      <li v-for="(item,index) in videoObj" :key="index">
        <video :id="'video' + index" width="500" height="400" class="video-js vjs-default-skin" controls>
          <source :src="item.url" type="application/x-mpegURL" />
        </video>
        <button id="btn" @click="changeSource(index)">play</button>
      </li>
    </ul>
  </div>
</template>

<script>
import cvueVideo from '@/components/cvue-video'
import videojs from 'video.js/dist/video.min'
import 'video.js/dist/video-js.min.css'
import 'videojs-contrib-hls'
var player = null
var playerArr = []
export default {
  name: 'video',
  components: {
      cvueVideo
  },
  props: {
  },
  data () {
    return {     
      videoObj: [
        {
          'index': 0,
          'url': 'http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8'
        },
        {
          'index': 1,
          'url': 'http://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
        }
      ],
      options: {
        bigPlayButton: true,
        textTrackDisplay: false,
        posterImage: false,
        errorDisplay: false,
        controlBar: false
      }
    }
  },
  mounted () {
    this.initPlayerArr()
  },
  methods: {
    initPlayer () {
      if (player) {
        player.dispose()
        player = null
      }
      player = videojs('example-video', this.options)
    },
    initPlayerArr () {
      for (var i = 0; i < this.videoObj.length; i++) {
        if (playerArr[i]) {
          playerArr[i].dispose()
          playerArr[i] = null
        }
        playerArr[i] = videojs('video' + i, this.options)
      }
    },
    changeSource (i) {
      var storySources = [
        {
          type: 'application/x-mpegURL',
          src: 'http://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
        }
      ]
      playerArr[i].src(storySources)
      playerArr[i].play()       
    }
  }
}
</script>

<style scoped>
</style>
