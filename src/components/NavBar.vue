<template>
<mdb-navbar expand="large" light style="background-color:#E3F2FD">
  <mdb-navbar-brand :to="{ name: 'main' }">Superliga</mdb-navbar-brand>
  <mdb-navbar-toggler>
    <mdb-navbar-nav>
      <mdb-nav-item :to="{ name: 'search' }">Search</mdb-nav-item>
      <mdb-nav-item :to="{ name: 'seasongames' }">Season Games</mdb-nav-item>
      <mdb-nav-item :to="{ name: 'about' }">About</mdb-nav-item>
      <mdb-nav-item v-if="$root.store.username == 'FAR'" :to="{ name: 'farpage' }">League Managment</mdb-nav-item>
    </mdb-navbar-nav>
    <mdb-navbar-nav right>
        <mdb-navbar-nav v-if="!$root.store.username">
            <mdb-nav-item>hello guest</mdb-nav-item>
            <mdb-nav-item :to="{ name: 'login' }">Login</mdb-nav-item>
            <mdb-nav-item :to="{ name: 'register' }">Register</mdb-nav-item>
        </mdb-navbar-nav>
        <mdb-navbar-nav v-else>
            <mdb-nav-item >Welcome, {{ $root.store.username }}</mdb-nav-item>
            <mdb-dropdown tag="li" class="nav-item avatar" anchorClass="p-0">
                <mdb-dropdown-toggle tag="a" navLink color="stylish" slot="toggle" waves-fixed>
                <img
                    :src="$root.store.pic ? $root.store.pic : profilePic"
                    class="rounded-circle z-depth-0"
                    alt="x"
                    height="35"
                />
                </mdb-dropdown-toggle>
                <mdb-dropdown-menu right >
                    <mdb-dropdown-item :to="{ name: 'favoritegamespage' }"> Favorites</mdb-dropdown-item>
                    <mdb-dropdown-item @click="Logout">Logout</mdb-dropdown-item>
                </mdb-dropdown-menu>
            </mdb-dropdown>
        </mdb-navbar-nav>
    </mdb-navbar-nav>
  </mdb-navbar-toggler>
</mdb-navbar>
</template>

<script>
  import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbDropdown, mdbDropdownMenu, mdbDropdownToggle, mdbDropdownItem } from 'mdbvue';
  import profilePicDefault from "../assets/defaultPic.png"
  export default {
    name: 'NavBar',
    methods:{
        async Logout() {
            try {
                // logout from server - delete users session
                const response = await this.axios.post(
                this.$root.store.server_url + "/Logout"
                );
                // client side logout
                this.$root.store.logout();
                if (this.$router.currentRoute.name != "main") {
                this.$router.push("/").catch();
                //console.log(this.$root.store);
                }
                this.$root.$emit('logout');
            } catch (err) {
                console.log(err.response);
            }
        }
    },
    data(){
      return{
        profilePic: profilePicDefault,
      }
    },
    components: {
      mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav,
      mdbNavItem,
      mdbDropdown,
      mdbDropdownMenu,
      mdbDropdownToggle,
      mdbDropdownItem,
    }
  }
</script>

<style>

</style>