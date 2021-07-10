<template>
  <div class="team-preview">
    <div :title="name" class="team-title"> {{ name }}</div>
    <!-- <ul class="team-content"> -->
      <!-- <li> team id: {{ id }}</li> -->
    <div class="team-content">
      <img 
        @click="teamPageEnter"
        :src="pic"
        style="width: 50px; height: 50px;"
        class="d-inline-block center"
        alt=""
        />
    </div>
    <!-- </ul> -->
  </div>
</template>

<script>
export default {
  name: "TeamPreview",
  props: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      pic: {
        type: String,
        required: true
      }
  }, 
  methods:{
    teamPageEnter() {
      this.$router.push({
        name: "teampage",
        params: { teamID: this.id ,teamName: this.name , teamPic: this.pic},
      });
    },
  }, 
  mounted(){
    console.log("Team preview mounted")
  } 
};
</script>

<style>
.team-preview {
  display: inline-block;
  width: 200px;
  height: 100px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 4px;
  border-color: rgb(71, 157, 167);
  /* align-items: center;
  align-content: center; */
}

.team-preview .team-title {
  text-align: center;
  text-transform: uppercase;;
  color:  rgb(10, 54, 59);
}

.team-preview .team-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
}
</style>
