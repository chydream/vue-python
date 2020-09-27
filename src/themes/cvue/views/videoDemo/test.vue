<template>
  <div class="test">
    <video id="video" width="480" height="320" controls></video>
    <div>
      <button id="capture">拍照</button>
    </div>
    <canvas id="canvas" width="480" height="320"></canvas>
  </div>
</template>
<script>
/* eslint-disable */
// Similarly, you can also introduce the plugin resource pack you want to use within the component
// import 'some-videojs-plugin'
export default {
  data () {
    return {
    }
  },
  mounted () {
    // console.log('this is current player instance object', this.player)
    //访问用户媒体设备的兼容方法
    function getUserMedia (constraints, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
      } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error)
      } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
      }
    }

    let video = document.getElementById('video');
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    function success (stream) {
      //兼容webkit核心浏览器
      let CompatibleURL = window.URL || window.webkitURL;
      //将视频流设置为video元素的源
      console.log(stream);

      //video.src = CompatibleURL.createObjectURL(stream);
      video.srcObject = stream;
      video.play();
    }

    function error (error) {
      console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
    }

    if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
      //调用用户媒体设备, 访问摄像头
      getUserMedia({ video: { width: 480, height: 320 } }, success, error);
    } else {
      alert('不支持访问用户媒体');
    }

    document.getElementById('capture').addEventListener('click', function () {
      context.drawImage(video, 0, 0, 480, 320);
    })
  },
  computed: {

  },
  methods: {

  }
}
</script>
<style scoped>
</style>
