<template>
  <div>
    <GamePreview
      v-for="g in games"
      :id="g.game_id" 
      :hostTeam="g.homeTeam_name" 
      :guestTeam="g.visitorTeam_name" 
      :date="g.game_date" 
      :hour="g.game_hour" 
      :field="g.stadium"
      :referee="g.referee"
      :key="g.game_id"></GamePreview>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  props: {
      games: {
        type: Array,
      },
  },
};
</script>

<style>
</style>
