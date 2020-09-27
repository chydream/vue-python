<template>
  <div class="video-index">
    <div class="video-player blue" :width="option.width" :height="option.height">
     <video
      ref="video1"
      :controls="option.controls"
      :autoplay="option.autoplay"
      width="100%"
      height="100%"
      :loop="option.loop"
      :muted="option.muted"
      :poster="option.poster"
      :preload="option.preload"
      :volume="option.volume"
      >
      <source :src="item.src" :type="item.type" v-for="(item, index) in option.source" :key="index" />
      您的浏览器不支持vedio控件
    </video>
      <!--标题-->
      <div class="video-title"></div>
      <div class="video-prompt" style="display: none;">视频加载中。。。</div>
      <div class="video-controls">
        <!--进度条-->
        <div class="video-seek">
          <div class="seek-buffer"></div>
          <div class="seek-con"></div>
          <div class="seek-slider"></div>
          <div class="viewBox">
            <video src="http://vjs.zencdn.net/v/oceans.mp4"></video>
            <span>00:00</span>
            <i></i>
          </div>
        </div>
        <!--播放/暂停-->
        <a class="video-play" title="Play/Pause" @click="play" :class="{'video-pause':!playStatus}"></a>
        <!--计时器-->
        <div class="video-timer">
          <span class="realTime">00:00</span> /&nbsp;
          <span>00:00</span>
        </div>
        <!--音量控制-->
        <div class="video-audio">
          <a class="audio-button" title="Mute/Unmute" :class="{'audio-mute':!audioStatus}"  @click="audioSet"></a>
          <div class="audio-box">
            <div class="audio-con"></div>
            <div class="audio-slider"></div>
          </div>
        </div>
        <!--全屏-->
        <div class="video-screen" @click="fullScreen"></div>
        <div class="video-status"></div>
        <!--弹幕-->
        <!-- <div class="video-barrage"></div> -->
        <!--翻转-->
        <!-- <div class="video-reversal"></div> -->
        <!--播放速度-->
        <!-- <div class="video-playSpeed">1x</div> -->
        <!--下载-->
        <!-- <a class="video-update"></a> -->
        <!--清晰度-->
        <!-- <div class="video-clarity">
          <p>360P</p>
          <nav>
            <span class="disabled">360P</span>
            <span>480P</span>
          </nav>
        </div> -->
      </div>
      <div class="screenShootBox"></div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'video',
  data () {
    return {
      option: {
        controls: false,
        autoplay: false,
        width: '400px',
        height: '400px',
        loop: true,
        muted: false,
        poster: '',
        preload: 'http://vjs.zencdn.net/v/oceans.mp4',
        volume: 0.5,
        source: [
          { src: 'http://vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }
        ]
      },
      playStatus: true,
      audioStatus: true,
      isFullScreen: false
    }
  },
  computed: {
    player () {
      return this.$refs.video1
    }
  },
  methods: {
    play () {
      if (this.playStatus) {
        this.playStatus = false
        this.player.play()
      } else {
        this.playStatus = true
        this.player.pause()
      }
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
    },
    fullScreen () {
      if (this.isFullScreen) {
        this.exitFullscreen()
        $('body').removeClass('fullScreen')
        this.isFullScreen = false
      } else {
        this.requestFullScreen()
        $('body').addClass('fullScreen')
        this.isFullScreen = true
      }
    },
     // 进入全屏
    requestFullScreen () {
      var de = document.documentElement
      if (de.requestFullscreen) {
        de.requestFullscreen()
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen()
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen()
      }
    },
    // 退出全屏
    exitFullscreen () {
      var de = document
      if (de.exitFullscreen) {
        de.exitFullscreen()
      } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen()
      } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen()
      }
    }
  }
}
</script>
<style scoped>
.clear::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.animate {
  transition: all .5s;
}
.video-index{
  position: relative;
  width: 600px;
  height: 400px!important;
}
.video-player {
  display: block;
  width: 100%;
  /* min-width: 800px; */
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
  border: 5px solid #000;
  background-color: #000000;
}
.video-player > video {
  display: block;
  margin: 0 auto;
  transition: all .5s;
}
.video-player .video-prompt {
  display: block;
  width: 180px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  color: #999;
  font-size: 16px;
  text-align: center;
  line-height: 25px;
  padding-left: 10px;
  background: url(img/loading.gif) left no-repeat;
  background-size: 30px 30px;
}
.video-player .videoStatus {
  transform: rotateY(180deg);
}
.video-player .video-title {
  width: 100%;
  height: 50px;
  position: absolute;
  left: 0;
  right: 0;
  top: -50px;
  margin: auto;
  color: #999;
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all .5s;
}
.video-player .video-controls {
  width: 100%;
  height: 60px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -60px;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all .5s;
}
.video-player .video-controls .video-seek {
  width: 94%;
  height: 6px;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  margin: auto;
  cursor: pointer;
  border-radius: 2px;
  background-color: #999;
}
.video-player .video-controls .video-seek .seek-con {
  width: 0;
  height: 6px;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  border-radius: 2px;
}
.video-player .video-controls .video-seek .seek-buffer {
  width: 0;
  height: 6px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 2px;
  background-color: #EEEEEE;
  opacity: .5;
}
.video-player .video-controls .video-seek .seek-slider {
  width: 16px;
  height: 16px;
  position: absolute;
  top: -5px;
  left: 0;
  cursor: pointer;
  border-radius: 16px;
}
.video-player .video-controls .video-seek > .viewBox {
  display: none;
  width: 100px;
  height: 70px;
  position: absolute;
  bottom: 15px;
  left: 50%;
  background-color: rgba(255, 255, 255, 0.2);
}
.video-player .video-controls .video-seek > .viewBox > video {
  display: block;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.video-player .video-controls .video-seek > .viewBox > span {
  display: block;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  color: #aaaaaa;
  font-size: 14px;
  line-height: 20px;
  text-indent: .25em;
}
.video-player .video-controls .video-seek > .viewBox > i {
  display: block;
  height: 0;
  width: 0;
  position: absolute;
  left: 44px;
  bottom: -6px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(255, 255, 255, 0.2);
  border-bottom: none;
}
.video-player .video-controls .video-play {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 30px;
  left: 3%;
  cursor: pointer;
  background: url(img/pause.png);
  background-size: 20px 20px;
}
.video-player .video-controls .video-pause {
  background: url(img/play.png);
  background-size: 20px 20px;
}
.video-player .video-controls .video-timer {
  width: 110px;
  height: 20px;
  position: absolute;
  top: 30px;
  left: calc(3% + 30px);
  color: #999999;
  font-size: 14px;
}
.video-player .video-controls .video-timer > span {
  line-height: 22px;
  pointer-events: none;
}
.video-player .video-controls .video-barrage {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 30px;
  left: calc(3% + 150px);
  cursor: pointer;
  background: url(img/barrage.png);
  background-size: 20px 20px;
}
.video-player .video-controls .video-update {
  display: block;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 30px;
  left: calc(3% + 180px);
  cursor: pointer;
  background: url(img/update.png);
  background-size: 20px 20px;
}
.video-player .video-controls .barrageClose::before {
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  position: absolute;
  right: -2px;
  bottom: -2px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
}
.video-player .video-controls .barrageClose::after {
  content: '';
  display: block;
  width: 8px;
  height: 2px;
  position: absolute;
  right: 0px;
  bottom: 3px;
  background-color: rgba(255, 255, 255, 0.7);
  transform: rotateZ(-120deg);
}
.video-player .video-controls .video-screen {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 30px;
  right: 3%;
  cursor: pointer;
  background: url(img/enlarge.png);
  background-size: 20px 20px;
}
.video-player .video-controls .video-clarity {
  width: 60px;
  height: 30px;
  position: absolute;
  top: 25px;
  right: calc(3% + 30px);
}
.video-player .video-controls .video-clarity > p {
  color: #eee;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.video-player .video-controls .video-clarity > nav {
  display: none;
  width: 60px;
  padding: 5px 0;
  position: absolute;
  bottom: 25px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.5);
}
.video-player .video-controls .video-clarity > nav > span {
  display: block;
  width: 60px;
  padding: 5px 0;
  color: #999999;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}
.video-player .video-controls .video-clarity > nav > span:hover {
  color: #eee;
}
.video-player .video-controls .video-clarity > nav .disabled,
.video-player .video-controls .video-clarity > nav .disabled:hover {
  cursor: auto;
}
.video-player .video-controls .video-clarity:hover > nav {
  display: block;
}
.video-player .video-controls .video-audio {
  display: block;
  width: 120px;
  position: absolute;
  top: 30px;
  right: calc(3% + 100px);
}
.video-player .video-controls .video-audio .audio-button {
  width: 30px;
  height: 20px;
  position: relative;
  float: left;
  cursor: pointer;
  background: url(img/audio.png);
  background-size: 30px 20px;
}
.video-player .video-controls .video-audio .audio-mute::before {
  content: '×';
  display: block;
  position: absolute;
  bottom: -2px;
  right: 5px;
  color: #ffffff;
  font-size: 20px;
}
.video-player .video-controls .video-audio .audio-box {
  width: 80px;
  height: 4px;
  position: relative;
  float: left;
  margin: 8px 0 0 10px;
  border-radius: 2px;
  background-color: #999;
}
.video-player .video-controls .video-audio .audio-box .audio-con {
  width: 0;
  height: 4px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 2px;
}
.video-player .video-controls .video-audio .audio-box .audio-slider {
  width: 12px;
  height: 12px;
  position: absolute;
  top: -4px;
  left: 0;
  cursor: pointer;
  border-radius: 12px;
}
.video-player .video-controls .video-reversal {
  display: block;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 30px;
  right: calc(3% + 230px);
  cursor: pointer;
  background: url(img/reversal.png);
  background-size: 20px 20px;
}
.video-player .video-controls .video-playSpeed {
  display: block;
  width: 30px;
  height: 20px;
  position: absolute;
  top: 30px;
  right: calc(3% + 260px);
  cursor: pointer;
  color: #eee;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
}
.video-player .video-controls .video-status {
  display: none;
  width: 30px;
  height: 30px;
  position: absolute;
  top: -30px;
  left: 10px;
  background: url(img/loading.gif);
  background-size: 30px 30px;
}

.video-player .screenShootBox {
  width: 100%;
  height: calc(100% - 110px);
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 100;
  pointer-events: none;
  background: transparent;
}
.video-player .screenShootBox > .screenShoot {
  display: none;
  max-width: 40%;
  position: absolute;
  top: 0;
  pointer-events: none;
  background: transparent;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.video-player .screenShootBox > .screenShoot[data-action=marquee] {
  left: 110%;
}
.video-player .screenShootBox > .screenShoot[data-action=stay] {
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
}
.video-player:hover .video-title {
  top: 0;
}
.video-player:hover .video-controls {
  bottom: 0;
}
.fullScreen {
  height: 100vh;
  overflow: hidden;
}
.fullScreen .video-player {
  width: 100%;
  height: 100vh;
  position: fixed; 
  top: 0;
  left: 0;
  border: none;
}
.fullScreen .video-player .video-screen {
  background: url(img/micrify.png);
  background-size: 20px 20px;
}
.blue .video-controls .video-seek .seek-con {
  background-color: #00b4ed;
}
.blue .video-controls .video-seek .seek-slider {
  background-color: #00b4ed;
}
.blue .video-controls .video-clarity > nav .disabled,
.blue .video-controls .video-clarity > nav .disabled:hover {
  color: #00b4ed;
}
.blue .video-controls .video-audio .audio-box .audio-con {
  background-color: #00b4ed;
}
.blue .video-controls .video-audio .audio-box .audio-slider {
  background-color: #00b4ed;
}

</style>
