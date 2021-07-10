<template>
  <div id="search-div" class="content">
    <br />
    <br />
    <h2 class="title">Superliga Search</h2>
    <b-form-radio-group
      label="Individual radios"
      v-slot="{ ariaDescribedby }"
      :checked="searchType" 
      class="radios"
    >
      <b-form-radio
        v-model="searchType"
        :aria-describedby="ariaDescribedby"
        name="some-radios"
        value="teams"
        @change="cleanSelections()"
        >Teams</b-form-radio
      >

      <b-form-radio
        v-model="searchType"
        :aria-describedby="ariaDescribedby"
        name="some-radios"
        value="players"
        >Players</b-form-radio
      >
    </b-form-radio-group>
    <br>
   
    <!-- Search Row -->
      <b-input-group id="search-input" dir="" size="lg">
  
        <!-- Switch for advanced search -->
        <b-input-group-prepend is-text v-if="searchType == 'players'" size="lg" >
          <b-form-checkbox switch class="mr-n2" v-model="useFilter" :checked="useFilter" >
            Advance
          </b-form-checkbox>
        </b-input-group-prepend>

        <!-- Query input -->
        <b-form-input
          v-model="searchQuery"
          placeholder = "Insert your query (e.g. James or Rangers)"
          style="text-align:center"
          v-on:keypress="isLetter($event)"
        ></b-form-input>

        <!-- Search query button -->
        <b-input-group-append>
          <b-button
            @click="search(searchQuery)"
            :disabled="searchQuery == ''"
            variant="info"
            style="margin:0%;"
            >Go</b-button>
        </b-input-group-append>
      </b-input-group>
    
    <div v-if="useFilter&&searchType=='players'" class="filter-div">
      <br/>
      <b-form-radio-group
        label="Individual radios"
        v-slot="{ ariaDescribedby }"
        :checked="filterBy"
        class="radios filters"
      >
        <b-form-radio
          v-model="filterBy"
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          value= "Team Name"
          >Team Name</b-form-radio
        >

        <b-form-radio
          v-model="filterBy"
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          value="Player Position"
          @change="()=>teamFilter=''"
          >Player Position</b-form-radio
        >
      </b-form-radio-group>
      

      <b-input-group class="filters" prepend="Team Name" v-if="filterBy=='Team Name'">
        <b-form-input 
          v-model="teamFilter"
          placeholder="Team filter (Optional)"
          style="text-align:center;"
          v-if="filterBy=='Team Name'"
        ></b-form-input>
      </b-input-group>

      <b-input-group class="filters" v-else-if="filterBy==='Player Position'">
        <label for="playerPosSlide" class="form-label" style="margin-left:5%;"
          >Player's Position</label
        >
        <input
          type="range"
          class="form-range"
          min="1"
          max="11"
          step="1"
          id="playerPosSlide"
          style="margin-left:10%;"
          v-model="positionFilter"
        />
        <label style="margin-left:5%;"> {{positionFilter}}</label>
      </b-input-group>
    </div>

    <div id="scroll-here">
    </div>

    <!-- Results !!!  -->
    <div id="show-results" class="resultsDetails" v-if="resultsNum!==0"> 
      <br/>
      Showing {{ resultsNum }} results ({{ time }} seconds)
      <br/>
    </div>
    <br />

    <div
      class="spinner-border"
      style="width: 7rem; height: 7rem;"
      v-if="progress"
    >
      <span class="sr-only">Loading...</span>
    </div>

    <div class="content2" v-else-if="players">
      <div class="show">
        <b-select
          id="Sort"
          class="sorting"
          v-model="sort"
          @change="sortChanges()"
        >
          <option disabled value="">Sort By</option>
          <option value="1">Player Name: A-Z (Accending)</option>
          <option value="2">Player Name: Z-A (Decending)</option>
          <option value="3">Team Name: A-Z (Accending)</option>
          <option value="4">Team Name: Z-A (Decending)</option>
        </b-select>

        <div>
          <b-pagination
          v-model="currentPage"
          :total-rows="resultsNum"
          :per-page="perPage"
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
          ></b-pagination>
        </div>
      </div>
        <br />
        <div>
          <PlayerPreview
            v-for="p in players.slice((currentPage-1)*perPage,(currentPage-1)*perPage+perPage)"
            :id="p.player_id"
            :name="p.name"
            :position="p.position"
            :team_name="p.team_name"
            :pic="p.image"
            :key="p.player_id"  
          ></PlayerPreview>
      </div>
      <br>
      <br>
    </div>

    <div class="content2" v-else-if="teams">
      <div class="show">
        <b-select
          class="sorting"
          id="sort-select"
          v-model="sort"
          @change="sortChanges()"
          aria-placeholder="Sort By"
        >
          <option disabled value="">Sort By</option>
          <option value="1">Team Name: A-Z (Accending)</option>
          <option value="2">Team Name: Z-A (Decending)</option>
        </b-select>
        <b-pagination
        v-model="currentPage"
        :total-rows="resultsNum"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        ></b-pagination>
      </div>
      <br />
      <br />
      <div>
        <TeamPreview
          v-for="t in teams.slice((currentPage-1)*perPage,(currentPage-1)*perPage+perPage)"
          :id="t.team_id"
          :name="t.name"
          :pic="t.logo"
          :key="t.team_id"
        ></TeamPreview>
        <br/>
        <br/>
        <br/>
      </div>
    </div>

    <div v-else-if="!firstTime">
      no results
    </div>

  </div>
</template>
<script>
import PlayerPreview from "../components/PlayerPreview.vue";
import TeamPreview from "../components/TeamPreview.vue";
import { BPagination } from 'bootstrap-vue';
export default {
  components: { PlayerPreview, TeamPreview, BPagination },

  data() {
    return {
      searchType: localStorage.searchType || "teams",
      searchQuery: localStorage.searchQuery || "",
      players: "",
      teams: "",
      progress: false,
      resultsNum: 0,
      sort: 1,
      time: 0,
      firstTime: true,
      useFilter: localStorage.useFilter || "",
      filterBy: localStorage.filterBy || "Team Name",
      teamFilter: localStorage.teamFilter || "",
      positionFilter: localStorage.positionFilter || 1,
      element: '#show-results',
      // pagination
      perPage: 12,
      currentPage: 1,
    };
  },
  mounted(){
    if(this.$root.store.username){
      if(localStorage.lastSearch == "true"){
        this.search(localStorage.getItem('searchQuery'));
      }
    }
  },
  methods: {
    async sortChanges() {
      if (this.sort == 1) this.SortAccending();
      if (this.sort == 2) this.SortDecending();
      if (this.sort == 3) this.teamNameSortAccending();
      if (this.sort == 4) this.teamNameSortDecending();
    },
    async SortAccending() {
      var array = this.players ? this.players : this.teams;
      array.sort(function(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },

    async SortDecending() {
      var array = this.players ? this.players : this.teams;
      array.sort(function(a, b) {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
    },

    async teamNameSortAccending() {
      this.players.sort(function(a, b) {
        if (a.team_name < b.team_name) {
          return -1;
        }
        if (a.team_name > b.team_name) {
          return 1;
        }
        return 0;
      });
    },

    async teamNameSortDecending() {
      this.players.sort(function(a, b) {
        if (a.team_name > b.team_name) {
          return -1;
        }
        if (a.team_name < b.team_name) {
          return 1;
        }
        return 0;
      });
    },

    async cleanSelections(){
      this.useFilter= "";
      this.searchType="";
      this.filterBy = "Team Name";
      this.teamFilter = "";
      this.positionFilter = 1;
    },

    async search(query) {
      if(this)
        this.firstTime = false;
      this.resultsNum = 0;
      if (query == "") {
        this.players = "";
        this.teams = "";
      } else {
        try {
          this.teams = "";
          this.players = "";
          this.progress = true;
          this.currentPage = 1;

          var startTime = performance.now();
          if (this.searchType == "players") {
            
            var myQuery = "/search/players?playerName=" + query
            if (this.useFilter && this.filterBy=="Team Name")
              myQuery += "&teamName=" + this.teamFilter.toLowerCase()
            if (this.useFilter && this.filterBy=="Player Position")
              myQuery += "&playerPosition=" + this.positionFilter
            
            const response = await this.axios.get(
              this.$root.store.server_url + myQuery
            );
            this.time = ((performance.now() - startTime) / 1000).toFixed(3);
            this.progress = false;
            if (response.data.length != 0) {
              this.players = response.data;
              this.resultsNum = this.players.length;
            }
          } else {
            const response = await this.axios.get(
              this.$root.store.server_url + "/search/teams/" + query
            );
            this.time = ((performance.now() - startTime) / 1000).toFixed(3);
            this.progress = false;
            if (response.data.length != 0) {
              this.teams = response.data;
              this.resultsNum = this.teams.length;
            }

          }
          this.sortChanges();
          this.goToResults();
          if(this.$root.store.username) {
            this.saveLastSearch();
          }
        } catch (err) {
          this.progress = false;
          console.log(err);
        }
      }
    }, 

    async goToResults() {
      setTimeout(()=> {
          document.getElementById('scroll-here').scrollIntoView({
            block: "start",
            behavior: 'smooth'
          })
      }, 1000);
    },

    async isLetter(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if(/^[A-Za-z ]+$/.test(char)) return true; // Match with regex 
      else e.preventDefault(); // If not match, don't add to input text
    },
    saveLastSearch(){
      localStorage.lastSearch = "true"
      localStorage.searchQuery = this.searchQuery
      localStorage.searchType = this.searchType
      localStorage.filterBy = this.filterBy
      localStorage.teamFilter = this.teamFilter
      localStorage.positionFilter = this.positionFilter
      localStorage.useFilter = this.useFilter
    }
  },
};
</script>

<style>
.title {
  color: #227dbf;
  font-family: 'Mansalva', cursive; 
  font-style: italic;
  font-weight: 300;
  font-size: 70px;
  margin-top: 0.5%;
  margin-bottom: 2%;
}

#search-input {
  width: 45%;
  height: 20%;
}

.filters {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin-top: 1%;
  width: 55%;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-div{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  /* border: 3px solid rgb(14, 209, 196); */
}

.radios {
  display: flex;
  flex-direction: row;
  width: 350px;
  justify-content: space-around;
  /* border: 3px solid rgb(12, 235, 19); */

}

.content2 {
  display: inline-block;
  justify-items: center;
  width: 95%;
  /* border: 3px solid rgb(12, 235, 19); */
}

.resultsDetails {
  color: rgb(130, 127, 127);
  font-size: 90%;
}

.show {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.black-background {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* color: white; */
    /* background-color: black; */
    padding: 10px;
}

.sorting {
  font-size: 15px;
  justify-self: center;
  width: 25%;
}
</style>
