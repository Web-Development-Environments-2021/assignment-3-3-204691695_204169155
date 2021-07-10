<template>
  <div class="col-xl-2 col-sm-6 mb-4 player-preview">
    <div class="bg-white py-2 px-2 card-extra-props">
      <img @click="playerPageEnter" :src="pic" alt="" width="100" class="img-fluid rounded-circle mb-2 img-thumbnail shadow-sm">
      <h5 class="mb-0">{{name}}</h5>
      <span class="small text-uppercase text-muted">{{team_name}}</span>
      <br/><span class="small text-uppercase text-muted">position: {{position}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerPreview",
  props: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      position: {
        type: String,
        required: true
      },
      team_name: {
        type: String,
        required: true
      },
      pic: {
        type: String,
        required: true
      }
  },
  methods:{
    playerPageEnter() {
      this.$router.push({
        name: "playerpage",
        params: { playerID: this.id },
      });
    },
  }, 
  mounted(){
    console.log("Player preview mounted")
  } 
};
</script>

<style>
.player-preview {
  display: inline-block;
  text-align: center;
}

.player-preview :hover{
  /* box-shadow:   4px 4px 6px 8px rgb(144, 141, 141); */
}

.card-extra-props{
  border-radius: 10%;
  backface-visibility: #ddd;
  -moz-box-shadow:    1px 1px 2px 2px #ccc;
  -webkit-box-shadow: 1px 1px 2px 2px #ccc;
  box-shadow:         2px 2px 2px 4px rgb(177, 177, 177);
  /* border: 3px solid rgb(235, 12, 68); */
}

</style>
