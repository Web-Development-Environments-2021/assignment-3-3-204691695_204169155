<template>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand :to="{ name: 'main' }">Superliga Vue</b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
                <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
                <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto" v-else>
                <b-nav-item-dropdown right>
                    <template #button-content>
                    Hi ,{{ $root.store.username }}
                    <div class="title text-center">
                        <img
                            :src="pic"
                            style="width: 60px; height: 60px;"
                            class="d-inline-block align-top"
                            alt=""
                        />
                    </div>
                    </template>
                    <b-dropdown-item href="#">Favorites</b-dropdown-item>
                    <b-dropdown-item @click="Logout" >Log Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      pic:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.vy-B3idS65U3Ngx6g4R7XAHaKa%26pid%3DApi&f=1"
    };
  },
  methods: {
    async Logout() {
      try {
        // logout from server - delete users session
        const response = await this.axios.post(
          this.$root.store.server_url + "/Logout"
        );
        // client side lofout
        this.$root.store.logout();
        if (this.$router.currentRoute.name != "main") {
          this.$router.push("/").catch();
        }
      } catch (err) {
        console.log(err.response);
      }
    }
  }
};
</script>

<style lang="scss">
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
