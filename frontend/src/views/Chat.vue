<template>
  <div class="container">
    <header class="header">
      <span class="noutil"></span>
      <h1> Chat App </h1>
      <h3> Usuário: {{ username }} </h3>
    </header>
    <div class="container-1">
      <div class="container-2">

        <div id="textarea" class="card">
          <h3> Sala de bate papo: </h3>
          <textarea readonly rows="10" cols="24" v-model="chat"></textarea>
        </div>

        <div id="textarea2" class="card">
          <h3> Mensagem: </h3>
          <textarea rows="5" cols="24" placeholder=" Escreva a mensagem aqui" v-model="msg"></textarea>
        </div>

        <div id="btns">
          <button @click="send()" class="button start is-success">
            <span> Enviar </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios'

  export default {

    data() {

      return {
        username: undefined,
        chat: '',
        msg: undefined,
      }

    },

    mounted() {

      let userId = this.$route.params.userId

      axios.get('http://localhost:7880/users/'+userId).then(res => {
  
        this.username = res.data.user[0].username

      }).catch(() => {
      })

    },

    methods: {

      send(){
        this.$socket.emit('send', {username: this.username, msg: this.msg});
        this.msg = ''
      }

    },

    sockets: {

      receive(data){


        var newLine = `    ${data.username}: ${data.msg}`

        console.log(newLine)
        this.chat += newLine + '\n\n'
      }

    }

  }
      
</script>

<style scoped>

  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');

  .container {
    min-height: 100vh;
    min-width: 100vw;
    background-color: var(--back-color);
    height: -webkit-fill-available;
    webkit-text-stroke-color: transparent;

  }

  .noutil {
    display: block;
    height: 70px;
    background-color: transparent;
  }
  h1 {
    font-family: Courier New;
    color: var(--text-full);
    text-transform: uppercase;
    font-size: 32px;
  }

  h3 {
    text-transform: uppercase;
    font-size: 18px;
    color: var(--text-full);
    font-family: 'Source Sans Pro', sans-serif;
  }

  header {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 5%;
    background-color: transparent;
  }

  .card {
    background-color: var(--back-color-medium);
    width: 80%;
  }

  textarea {
    resize: none;
    max-height: 200px;
    outline: none;
    background-color: var(--back-color);
    border-radius: 5px;
    color: var(--text-full);
    text-align: left;
    margin-top: 5%;
    margin-bottom: 5%;
    overflow: auto;
    height: 25%;
    width: 85%;
    border: none;
  }

  #textarea {
    width: 75%;
    margin: 0 auto;
    border-radius: 5px;
    margin-bottom: 5%;
    box-shadow: 0 0 20px var(--back-color-shadow);
  }


  #textarea2 {
    width: 75%;
    margin: 0 auto;
    border-radius: 5px;
    margin-bottom: 1%;
    box-shadow: 0 0 20px var(--back-color-shadow);
  }

  #btns {
    width: 80%;
    padding: 5px;
    margin: 0 auto;
    border-radius: 20px;
    background-color: var(--back-color);
  }

  #btns > button {
    width: 30%;
    margin: 1.5%;
    height: 30px;
    border-radius: 5px;
    padding: 5px;
    font-family: Verdana;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-top: 0%;
  }

  .container-1 {
    flex: 1;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background-color: var(--back-color);
    z-index: 2;
  }

  .container-2 {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  @media (min-width:768px) {}

</style>