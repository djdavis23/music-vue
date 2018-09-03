<template>
  <div class="row home justify-content-left">
    <!-- LEFT PANEL -->
    <div id="left-panel" class="col-md-6 col-xs-12">


    </div>
    <!-- RIGHT PANEL -->
    <div id="right-panel" class="col-md-6 offset-md-6 col-xs-12">
      <div class="row">
        <div id="control-panel" class="col-md-6 col-xs-12">
          <h1 class="text-white mt-2">
            <strong>Welcome to d2Tunes2</strong>
          </h1>
          <p class="text-white">Powered by iTunes
            <i class="fab fa-itunes"></i>
          </p>
          <div>
            <h4 class="login-menu text-white clickable"><span @click="loginForm = true">Login </span>|<span @click="loginForm = false">
                Register</span></h4>
          </div>
          <form class="form-inline" v-if="loginForm" @submit.prevent="loginUser">
            <input type="text" class="form-control-lg mt-2 mb-2" name="username" placeholder="Enter User Name" v-model="userName" required/><br>
            <input type="password" class="form-control-lg mb-2" name="password" placeholder="Enter your password" v-model="password"
              required /><br>
            <button type="submit" class="btn btn-primary btn-lg mt-2 mb-2" id="get-music-button">Login</button>
          </form>
          <form class="form-inline" v-if="!loginForm" @submit.prevent="registerUser">
            <input type="text" class="form-control-lg mt-2 mb-2 mr-2" name="username" placeholder="Enter User Name" v-model="userName" required
            /><br>
            <input type="password" class="form-control-lg mb-2 mr-2" name="password" placeholder="Enter a password" v-model="password" required
            /><br>
            <input type="password" class="form-control-lg mb-2 mr-2" name="password-confirm" placeholder="Confirm password" v-model="passwordConfirm"
              required /><br>
            <button type="submit" class="btn btn-primary btn-block mt-2 mb-2" id="get-music-button">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

  export default {
    name: 'login',
    data() {
      return {
        loginForm: true,
        userName: '',
        password: '',
        passwordConfirm: ''
      }
    },

    methods: {

      loginUser() {
        let creds = {
          userName: this.userName,
          password: this.password
        }
        this.$store.dispatch('loginUser', creds)
      },

      registerUser() {
        if (this.password !== this.passwordConfirm) {
          alert("Password confirmation did not match password")
        }
        else {
          let creds = {
            userName: this.userName,
            password: this.password
          }
          this.$store.dispatch('registerUser', creds)
        }
      }
    }
  }

</script>

<style>
  .clickable {
    cursor: pointer;
  }

  body {
    background-color: black;
    height: 100vh;
  }

  #left-panel {
    position: fixed;
    top: 0;
    height: 100vh;
    background-image: url("../assets/music.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    min-width: 50vw;

  }


  #control-panel {
    text-align: left;
  }

  .right-panel {
    min-width: 50%;
  }
</style>