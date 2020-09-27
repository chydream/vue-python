<template>
  <div class="video">
    <video id="example-video" width="500" height="400" class="video-js vjs-default-skin" controls>
      <source src="http://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8" type="application/x-mpegURL" />
    </video>
    <el-button @click="changeSource" type="default">加载</el-button>
  </div>
</template>

<script>
import cvueVideo from '@/components/cvue-video'
import videojs from 'video.js/dist/video.min'
import 'video.js/dist/video-js.min.css'
import 'videojs-contrib-hls'
var player = null
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
    this.initPlayer()
  },
  methods: {
    initPlayer () {
      if (player) {
        player.dispose()
        player = null
      }
      player = videojs('example-video', this.options)
    },
    changeSource () {
      var storySources = [
        {
          type: 'application/x-mpegURL',
          src: 'http://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
        }
      ]
      player.src(storySources)
      player.play()    
    }
  }
}
</script>

<style scoped>
</style>
