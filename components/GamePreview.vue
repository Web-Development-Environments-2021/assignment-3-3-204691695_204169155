<template>
  <div class="game-preview">
    <div :title="id" class="game-title">
      <b>Game Id:</b> {{ id }}
    </div>
    <ul class="game-content">
      <li> host: {{ hostTeam }}</li>
      <li> guest: {{ guestTeam }}</li>
      <li> date: {{ date }}</li>
      <li> time: {{ hour }}</li>
      <li> field: {{ field }}</li>
      <li> referee: {{ referee }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
  props: {
      id: {
        type: Number,
      },
      hostTeam: {
        type: String,
      },
      guestTeam: {
        type: String,
      },
      date: {
        type: String,
      },
      hour: {
        type: String,
      },
      field: {
        type: String,
      },
      referee: {
        type: Number,
      },
  }, 
  mounted(){
    console.log("game preview mounted")
  },
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 250px;
  height: 180px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 15px;
  border-width: 2px;
  border-color:black;
  background-color: white;
  opacity: 0.90;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}
</style>
