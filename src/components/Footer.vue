<template>
  <mdb-navbar light style="background-color:#E3F2FD" position="bottom">
    <p class="mb-0">
      © 2021 Copyright : Tom Nachman & Asaf Salomon
    </p>

    <mdb-navbar-toggler>
      <mdb-navbar-nav right> 
        
        <a class="fb-ic ml-0" href="https://www.facebook.com/sise.bgu">
          <i class="fab fa-facebook mr-lg-4"   ></i>
        </a>     
         <a class="li-ic" href="https://www.linkedin.com/school/ben-gurion-university/">
          <i class="fab fa-linkedin-in mr-lg-4"   ></i>
        </a>
        <a class="ins-ic"  href="https://www.instagram.com/bengurionuniversity/" >
          <i class="fab fa-instagram mr-lg-4"   ></i>
        </a>

        <a class="gplus-ic" href="#">
          <i class="fab fa-google-plus mr-lg-4" ></i>
        </a>
         <a class="fb-ic ml-0" href="https://github.com/Web-Development-Environments-2021">
          <i class="fab fa-github mr-lg-4"></i>
        </a>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import { mdbNavbar, mdbNavbarToggler, mdbNavbarNav } from "mdbvue";
export default {
  name: "Footer",
  components: {
    mdbNavbar,
    mdbNavbarToggler,
    mdbNavbarNav,
  },
};
</script>

<style></style>