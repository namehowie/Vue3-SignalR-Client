<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld :msg="text"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import * as signalR from '@aspnet/signalr';

export default {
  name: 'App',

  components: {HelloWorld},

  data() {
    return {
      connection: "",
      text: "Welcome"
    }
  },

  created() {
    this.connection = new signalR.HubConnectionBuilder()
        .withUrl("/pushHub?lang=zh-hans")
        //日志信息
        .configureLogging(signalR.LogLevel.Information)
        .build();
  },

  mounted() {
      this.getStart();
      this.onMessage(); 
  },

  methods: {
    getStart() {
        this.connection.start().then(() => {
            this.text = "Start"
            console.log("starttttt");           
        });
    },
    onMessage() {
      let _this = this;
      this.connection.on('Message', function (msg) {
          _this.text = msg
          console.log("...From Message: " + msg)
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
