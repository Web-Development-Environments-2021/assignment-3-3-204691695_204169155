<template>
  <b-container>
    <b-row class="mb-5 mt-3" v-for="i in rowCount" :key="i">
      <b-col cols="4" v-for="r in itemCountInRow(i)" :key="r.id">
        <MatchPreview :matches="m"></MatchPreview>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MatchPreview from "./MatchPreview.vue";
export default {
  name: "RecipePreviewGrid",
  components: {
    MatchPreview,
  },
  props: {
    matches: {
      type: Array,
      required: true,
    },
    itemsPerRow:{
      type: Number,
      default: 3,
      required: false
    }
  },
   computed: {
        rowCount: function() {
            return Math.ceil(this.matches.length / this.itemsPerRow);
    },
  },
  methods: {
    itemCountInRow(index) {
      return this.matches.slice(
        (index - 1) * this.itemsPerRow,
        index * this.itemsPerRow
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>