<template>
  <div>
    <figure>
      <figcaption>视频播放器</figcaption>
      <div class="player" :style="{width:playWidth, height:playHeight}">
        <video
          class="video-js vjs-default-skin"
          width="100%"
          height="100%"
          @canplay="canPlay"
          @timeupdate="timeUpdate"
          @ended="ended"
          :controls="isControls"
          :id="videoId"
          :videojs="isVideojs"
          ref="videoPlayer">
          <source :src="videoSrc" type="application/x-mpegURL" />
          <source :src="videoSrc" type="video/mp4" />
          <source :src="videoSrc" type="video/ogg" />
        </video>
        <div class="controls" v-if="!isControls">
          <!-- 播放/暂停 -->
          <a href="javascript:;" class="switch fa" @click="togglePlay" :class="playStatus"></a>
          <!-- 全屏 -->
          <a href="javascript:;" class="expand fa fa-expand" @click="expand"></a>
          <!-- 进度条 -->
          <div class="progress" @click="changeProgress($event)" ref="progress">
            <div class="loaded" :style="{width:loadWidth}"></div>
            <div class="line"></div>
            <div class="bar"></div>
          </div>
          <!-- 时间 -->
          <div class="timer">
            <span class="current">{{ currPlayTime }}</span> /
            <span class="total">{{ totalTime }}</span>
          </div>
          <!--音量控制-->
          <!-- <div class="video-audio">
            <a class="audio-button" title="Mute/Unmute" :class="{'audio-mute':!audioStatus}"  @click="audioSet"></a>
            <div class="audio-box">
              <div class="audio-con"></div>
              <div class="audio-slider"></div>
            </div>
          </div> -->
        </div>
      </div>
    </figure>
  </div>
</template>
<script>
import videojs from 'video.js/dist/video.min'
import 'video.js/dist/video-js.min.css'
import 'videojs-contrib-hls'
var player = null
export default {
  name: 'video',
  data () {
    return {
      playStatus: 'fa-play',
      totalTime: '00:00:00',
      currPlayTime: '00:00:00',
      loadWidth: '0',
      options: {
        bigPlayButton: true,
        textTrackDisplay: false,
        posterImage: false,
        errorDisplay: false,
        controlBar: true,
        flash: {
          hls: {
            withCredentials: false
          }
        },
        html5: {
          hls: {
            withCredentials: false
          }
        },
        playbackRates: [0.5, 1, 1.5, 2],
        source: [
          { src: 'http://vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }
        ]
      },
      audioStatus: true
    }
  },
  props: {
    playWidth: {
      type: String,
      default: '720px'
    },
    playHeight: {
      type: String,
      default: '360px'
    },
    videoSrc: {
      type: String,
      default: '/static/movie.mp4'
    },
    currTime: {
      type: Number,
      default: 0
    },
    forbidProgress: {
      type: Boolean,
      default: false
    },
    isControls: {
      type: Boolean,
      default: false
    },
    videoId: {
      type: String,
      default: 'example-video'
    },
    isVideojs: {
      type: Boolean,
      default: false
    }
    // timeUp: {
    //   type: Function,
    //   default () {}
    // }
  },
  computed: {
    video () {
      return this.$refs.videoPlayer
    },
    progressWidth () {
      return this.$refs.progress.offsetWidth
    }
  },
  mounted () {
    this.video.currentTime = this.currTime
    if (this.isVideojs) {
      this.initPlayer()
    }
  },
  methods: {
    // 播放
    togglePlay () {
      if (this.video.paused) {
        this.video.play()
        this.playStatus = 'fa-pause'
      } else {
        this.video.pause()
        this.playStatus = 'fa-play'
      }
    },
    // 全屏
    expand () {
      // this.video.webkitRequestFullScreen()
      if (document.documentElement.requestFullScreen) {
        this.video.requestFullScreen()
      } else if (document.documentElement.webkitRequestFullScreen) {
        this.video.webkitRequestFullScreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        this.video.mozRequestFullScreen()
      }
    },
    // 文件准备就绪
    canPlay () {
      this.video.style.display = 'block'
      this.totalTime = this.getFormatTime(this.video.duration)
    },
    // 播放位置改变
    timeUpdate () {
      var currTime = this.video.currentTime
      var duration = this.video.duration
      var pre = currTime / duration * 100 + '%'
      this.loadWidth = pre
      this.currPlayTime = this.getFormatTime(currTime)
      // console.log(this.video.currentTime)
    },
    // 改变进度条
    changeProgress (e) {
      if (!this.forbidProgress) {
        var event = window.event || e
        this.video.currentTime = (event.offsetX / this.progressWidth) * this.video.duration
      }
    },
    ended () {
      this.playStatus = 'fa-play'
      this.loadWidth = 0
      this.currPlayTime = this.getFormatTime()
    },
    // 格式化时间
    getFormatTime (time) {
      time = time || 0
      var h = parseInt(time / 3600)
      var m = parseInt(time % 3600 / 60)
      var s = parseInt(time % 60)
      h = h < 10 ? '0' + h : h
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      return h + ':' + m + ':' + s
    },
    // 初始化videojs
    initPlayer () {
      var self = this
      if (player) {
        player.dispose()
        player = null
      }
      player = videojs(self.videoId, self.options, function () {
        this.on('play', function () {
          self.$emit('play', this)
        })
        this.on('timeupdate', function () {
          self.$emit('timeUp', self.video)
        })
      })
    },
    disableBar () {
      player.controlBar.progressControl.disable()
    },
    enableBar () {
      player.controlBar.progressControl.enable()
    },
    audioSet () {
      if (this.audioStatus) {
        this.audioStatus = false
        this.player.volume = 0
        this.option.volume = 0
      } else {
        this.audioStatus = true
        this.player.volume = 0.5
        this.option.volume = 0.5
      }
    }
  }
}
</script>
<style>
figcaption {
  font-size: 24px;
  text-align: center;
  margin: 20px;
}
.player {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #000 center/300px no-repeat;
  position: relative;
}
video {
  display: none;
  height: 100%;
  margin: 0 auto;
}
.controls {
  width: 100%;
  height: 40px;
  background-color: #2196f3;
  position: absolute;
  left: 0;
  bottom: -40px;
  z-index: 99;
  opacity: 0.7;
}
.player:hover .controls {
  opacity: 1;
}
.controls .switch {
  display: block;
  width: 20px;
  height: 20px;
  font-size: 20px;
  color: #fff;
  position: absolute;
  top: 11px;
  left: 11px;
}
.controls .switch:hover {
  color: blue;
}
.controls .expand {
  display: block;
  width: 20px;
  height: 20px;
  font-size: 20px;
  color: #fff;
  position: absolute;
  top: 11px;
  right: 11px;
}
.controls .expand:hover {
  color: blue;
}
.progress {
  width: 60%;
  height: 10px;
  border-radius: 3px;
  overflow: hidden;
  background-color: #555;
  cursor: pointer;
  position: absolute;
  top: 16px;
  left: 45px;
}
/*下载进度*/
.progress .loaded {
  width: 0px;
  height: 100%;
  background-color: blue;
}
/*播放进度*/
.progress .line {
  width: 0px;
  height: 100%;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
}
.progress .bar {
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.timer {
  height: 20px;
  line-height: 20px;
  position: absolute;
  left: 68%;
  top: 11px;
  color: #fff;
  font-size: 14px;
}
.video-js {
  width: 100%;
  height: 100%;
}
.video-audio {
  display: block;
  width: 120px;
  position: absolute;
  top: 30px;
  right: calc(3% + 100px);
}
.video-audio .audio-button {
  width: 30px;
  height: 20px;
  position: relative;
  float: left;
  cursor: pointer;
  /* background: url(img/audio.png); */
  background-size: 30px 20px;
}
.video-audio .audio-mute::before {
  content: '×';
  display: block;
  position: absolute;
  bottom: -2px;
  right: 5px;
  color: #ffffff;
  font-size: 20px;
}
.video-audio .audio-box {
  width: 80px;
  height: 4px;
  position: relative;
  float: left;
  margin: 8px 0 0 10px;
  border-radius: 2px;
  background-color: #999;
}
.video-audio .audio-box .audio-con {
  width: 0;
  height: 4px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 2px;
}
.video-audio .audio-box .audio-slider {
  width: 12px;
  height: 12px;
  position: absolute;
  top: -4px;
  left: 0;
  cursor: pointer;
  border-radius: 12px;
}
.video-audio .audio-box .audio-con {
  background-color: #00b4ed;
}
.video-audio .audio-box .audio-slider {
  background-color: #00b4ed;
}
</style>
