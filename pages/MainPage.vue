<template>
  <div class="main-container flex-col">
    <div class="flex-row">
      
      <div class="flex-col">
        <div class="league-details">
          <h2 style="margin:0;padding:0;color:white;">League Details</h2>
          <LeagueInfo
            :leagueName="leagueName"
            :season="seasonName"
            :stage="stageName"
            ></LeagueInfo>
          <h4 style="margin:0; padding:0;color:white;">Next Game</h4>
          <GamePreview
            :id="nextGame.game_id"
            :hostTeam="nextGame.homeTeam_name"
            :guestTeam="nextGame.visitorTeam_name"
            :date="nextGame.game_date"
            :hour="nextGame.game_hour"
            :field="nextGame.stadium"
            :referee="nextGame.referee"
          ></GamePreview>
          <br/>
          <button class="button" @click="goToSeasonGamesPage"> All Season's Games </button>
        </div>
      </div>
      
      <div>
        <LoginPage v-if="!$root.store.username" @login="loginSuccess"></LoginPage>
        <div v-else>
          <h4 style="margin:0; padding:0;color:white;">Closest Favorite Games</h4>
          <FavoriteGames v-if="futureFavoriteGames[0]"
            :games="futureFavoriteGames"
          ></FavoriteGames>
          <div class="no-games" v-else>
            Favorite closest games doesn't exists
          </div>
          <button class="button" @click="goToFavoritePage"> All Favorite Games</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
import GamePreview from "../components/GamePreview.vue";
export default {
  components: {
    LeagueInfo, 
    LoginPage, 
    FavoriteGames,
    GamePreview,
  },
   data() {
    return {
      leagueName: "",
      seasonName: "",
      stageName: "",
      nextGame: "",
      futureFavoriteGames:{},
    };
  },
  methods: {
    async getDetails(){
      const response = await this.axios.get(this.$root.store.server_url + "/league/getDetails");
      let details = {
        leagueName: response.data.league_name,
        seasonName: response.data.current_season_name,
        stageName: response.data.current_stage_name,
        nextGame: response.data.next_game,
        futureFavoriteGames: this.$root.store.username? response.data.favorite_games : []
      };
      localStorage.setItem('leagueDetails',JSON.stringify(details));
    },

    getSavedDetails(){
      const details = JSON.parse(localStorage.getItem('leagueDetails'));
      this.leagueName = details.leagueName;
      this.seasonName = details.seasonName;
      this.stageName = details.stageName;
      this.nextGame = details.nextGame;
      this.futureFavoriteGames = details.futureFavoriteGames;
    },

    async loginSuccess(){
      await this.getDetails();
      this.getSavedDetails();
    },

    goToFavoritePage(id) {
      this.$router.push({
        name: "favoritegamespage",
        params: { playerID: id },
      });
    },

    goToSeasonGamesPage() {
      this.$router.push({
        name: "seasongames",
      });
    },
  },
  async created(){
    const leagueDetails = JSON.parse(localStorage.getItem("leagueDetails"));
    await this.getDetails();
    this.getSavedDetails();
    this.$root.$on('logout', x => {
        this.futureFavoriteGames = {};
    });
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

.main-container{
  height: 90vh;
  justify-content: space-evenly;
  // border: 3px solid rgb(12, 235, 19);
  background-image: url('~@/assets/12.jpg'); 
  background-size: 100vw;
  border: 2px solid;
  opacity: 1;
}

.flex-row{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.flex-col{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // border: 3px solid rgb(250, 150, 20);
}

.league-details{
  // border: 3px solid rgb(250, 150, 20);
}

.game-preview{
  // border: 3px solid rgb(250, 150, 20);
  display: inline-block;
}

.button{
  border-radius: 4px;
  color: black;
  background-color: white;
  padding: 8px;
  margin-left: 10px;
  opacity: 0.75;
}

.no-games{
  height: 50px;
  width: 300px;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  background-color: white;
  opacity: 0.95;
}
</style>
