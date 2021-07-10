<template>
  <div class="league-preview">
    <b-card
    img-alt="Image"
    tag="article"
    style="max-width: 100rem;"
    class="mb-2"
  >
      <b-card-title>{{leagueName}}</b-card-title>
      <b-card-text>
        Season: {{ season }}
        <br/>
        Stage: {{ stage }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    leagueName: {
      type: String,
      required: true
    },
    season: {
      type: String,
      required: true
    },
    stage: {
      type: String,
      required: true
    },
  }
}
</script>

<style>
.league-preview {
  display: inline-block;
  width: 250px;
  margin: 10px 10px;
  border-radius: 15px;
  border-width: 5px;
  border-color:rgb(0, 0, 0);
  opacity: 0.90;
}
</style>