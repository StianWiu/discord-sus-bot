<template>
  <div id="login" v-if="this.correct == false">
    <h1>Enter code below</h1>
    <input
      type="text"
      placeholder="Code"
      @input="this.input()"
      v-model="code"
    />
    <div id="login-area">
      <button
        v-if="this.loading == false"
        @click="this.login"
        id="login-button"
      >
        Confirm
      </button>
      <fa v-else id="spinner" icon="spinner" />
    </div>
  </div>
  <div v-else>
    <h3>Thank you for confirming you are made of flesh and bones</h3>
    <h3>The anti robot canons have been lowered for you to enter</h3>
    <img style="width: 200px" src="./assets/canon.gif" />
    <p>Sorry for the inconvenience.</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      code: "",
      loading: false,
      correct: false,
    };
  },
  methods: {
    input() {
      if (this.code !== "") {
        document.getElementById("login-button").style.display = "block";
        setTimeout(() => {
          document.getElementById("login-button").style.opacity = "1";
        }, 100);
      } else {
        document.getElementById("login-button").style.opacity = "0";
        setTimeout(() => {
          document.getElementById("login-button").style.display = "none";
        }, 100);
      }
    },
    async login() {
      this.loading = true;
      await axios({
        method: "get",
        url:
          "https://captcha.fridgedoorfamous.tech/api/user/check:" + this.code,
        auth: {
          username: this.username,
          password: this.password,
        },
      })
        .then((res) => {
          this.loading = false;
          if (res.status === 200) {
            console.log(res.data);
            this.$toast.success("Entered code is correct");
            this.correct = true;
          }
        })
        .catch(() => {
          this.loading = false;
          this.$toast.error("Entered code is incorrect");
        });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap");

body,
html,
#app {
  height: 100vh;
  margin: 0;
  padding: 0;

  background-color: #201e32;
  font-family: "Source Code Pro", monospace;
  color: #fff;
}

#app {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

#login {
  width: 310px;
  height: 210px;

  background-color: #28293e;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 14px;
}

input {
  text-align: center;
  border: 3.5px solid #5d6069;
  border-radius: 10px;

  background-color: #28293e;
  color: #fff;

  margin-bottom: 5px;
  padding: 10px;

  font-size: 23px;

  width: 200px;

  /* Remove default selection */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* Remove default outline */
  outline: none;

  transition: 150ms;
}

/* When selected */
input:focus {
  border: 3.5px solid #42b17b;
}

/* Login button */

#login-area {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100px;
}

#login-button {
  border: 0.15em solid #5d6069;
  border-radius: 0.5em;

  background-color: #28293e;
  color: #fff;

  margin-bottom: 15px;
  padding: 10px 40px;

  font-size: 23px;

  /* Remove default selection */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* Remove default outline */
  outline: none;

  transition: 150ms;

  display: none;
  opacity: 0;
}

#login-button:hover {
  border: 3.5px solid #42b17b;
  cursor: pointer;
}

/* Spinner animation */

#spinner {
  animation: spin 1s linear infinite;
  height: 2em;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
