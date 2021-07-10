
<template>
  <div class="container shadow">
    <h1 class=title-favorite>Favorite Games</h1>
    <favoriteGames
      :games="games"
    ></favoriteGames>
  </div>
</template>

<script>
import FavoriteGames from "../components/FavoriteGames";
export default {
  name: "FavoriteGamesPage",
  components: {FavoriteGames},
  data() {
    return {
      games: []
    };
  },
  methods: {
    async getFavoriteGames(){
      const response = await this.axios.get(this.$root.store.server_url + "/users/favoriteGames");
      this.games = response.data;
    },
  },
  async created(){
    await this.getFavoriteGames();
    this.$root.$on('logout', x => {
        this.games = [];
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  height: 90vh;
  max-width: 100vw;
  background-color: white;
  opacity: 0.90;
  // border: 5px solid rgb(17, 224, 97);
}

.container :hover {
  opacity: 1;
}

.title-favorite{
  color: #227dbf;
  font-family: 'Mansalva', cursive; 
  font-style: italic;
  font-weight: 300;
  font-size: 50px;
  margin-top: 10px;
  margin-bottom: 2%;
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