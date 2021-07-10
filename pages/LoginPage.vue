<template>
  <div class="container shadow">
    <br/>
    <h1 class="title-login">Login</h1>
    <b-form @submit.prevent="onLogin" class="flex-col">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
        class="flex-col"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
        class="flex-col"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Login</b-button
      >
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        // before sending request to server we are validating the username constraints
        if(this.form.username.length < 3 || this.form.username.length > 8 || !(/^[a-zA-Z]+$/.test(this.form.username))){
          this.form.submitError = "Username or Password incorrect"
        }
        else{
          const response = await this.axios.post(
          this.$root.store.server_url+"/Login",
            {
              username: this.form.username,
              password: this.form.password
            }
          );
          this.$root.loggedIn = true;
          this.$root.toast("Login","Login success", "success");
          this.$root.store.login(this.form.username,response.data);
          if (this.$router.currentRoute.name != "main") {
            this.$router.push("/").catch();
          }
          this.$emit('login')
        }
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Login();
    }
  }
};
</script>
<style lang="scss" scoped>

.container {
  margin-top: 3%;
  align-self: center;
  justify-self: center;
  height: 500px;
  max-width: 400px;
  background-color: white;
  border-radius: 5%;
  opacity: 0.90;
  // border: 0.1px solid rgb(33, 102, 150);
}

.container :hover {
  opacity: 1;
}

.title-login{
  margin-top: 20px;
}

.shadow {
  -webkit-box-shadow: 3px 3px 5px 7px rgb(145, 145, 145);;  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
  -moz-box-shadow:    3px 3px 5px 7px rgb(145, 145, 145);   /* Firefox 3.5 - 3.6 */
    box-shadow:       3px 3px 5px 7px rgb(145, 145, 145);;  /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
}

.flex-col{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 5%;
  // border: 3px solid rgb(250, 150, 20);
}
</style>