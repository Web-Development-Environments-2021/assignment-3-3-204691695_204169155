<template>
  <mdb-container>
    <mdb-row class="justify-content-md-center">
    <h2 class="h1-responsive font-weight-bold text-center my-5">{{ $route.params.teamName }}
        <h6 class="font-weight-bold mb-3 green-text">
            <mdb-icon icon="users" class="pr-2" />Team</h6>
    </h2>
    </mdb-row>
      <vue-horizontal-list :items="players" :options="options">
        <template v-slot:default="{ item }">
          <div>
            <div class="image-container">
              <img :src="item.image" />
              <div class="middle">
                <mdb-btn @click="playerPageEnter(item.player_id)" color="light-blue" size="sm" class="waves-light ">View Page</mdb-btn>
              </div>
            </div>

            <div class="subtitle">
              <div>Player Name</div>
            </div>

            <h4>{{ item.name }}</h4>
            <p><b>Position</b> : {{ item.position }}</p>
          </div>
        </template>
      </vue-horizontal-list>
      <h2 style="margin-top:40px">Past Games</h2>
      <!-- Past Matches display-->
            <div class="row">
                <div class="col-lg-12 center-all">
                    <b-table id="past-match-table" :fields="pastFields" :items="pastGames" :per-page="perPage" :current-page="pastCurrentPage">
                        <template #cell(game_id)="data">
                            {{data.item.game_id}}
                        </template>
                        <template #cell(hometeam)="data">
                            {{data.item.homeTeam_name}}
                        </template>
                        <template #cell(awayteam)="data">
                            {{data.item.visitorTeam_name}}
                        </template>
                        <template #cell(date)="data">
                            {{data.item.game_date}}
                        </template>
                        <template #cell(hour)="data">
                            {{data.item.game_hour}}
                        </template>
                        <template #cell(stadium)="data">
                            {{data.item.stadium}}
                        </template>
                        <template #cell(referee)="data">
                            {{data.item.referee}}
                        </template>
                        <template #cell(score)="data">
                            {{data.item.score}}
                        </template>
                        <template #cell(events)="data">
                            <a href="#" class="text-success" @click="showEvents(data.item.game_id)"><i class="fa fa-info"></i>&nbsp;&nbsp;logs</a>
                        </template>
                    </b-table>
                    <b-pagination
                        v-model="pastCurrentPage"
                        :total-rows="pastRows"
                        :per-page="perPage"
                        aria-controls="past-match-table"
                    ></b-pagination>
                </div>
            </div>        
        <h2 style="margin-top:40px">Future Games</h2>
        <div class="container">
            <!-- Future Matches display-->
            <div class="row">
                <div class="col-lg-12 center-all">
                    <b-table id="future-match-table" :fields="futureFields" :items="futureGames" :per-page="perPage" :current-page="futureCurrentPage">
                        <template #cell(game_id)="data">
                            {{data.item.game_id}}
                        </template>
                        <template #cell(hometeam)="data">
                            {{data.item.homeTeam_name}}
                        </template>
                        <template #cell(awayteam)="data">
                            {{data.item.visitorTeam_name}}
                        </template>
                        <template #cell(date)="data">
                            {{data.item.game_date}}
                        </template>
                        <template #cell(hour)="data">
                            {{data.item.game_hour}}
                        </template>
                        <template #cell(stadium)="data">
                            {{data.item.stadium}}
                        </template>
                        <template #cell(referee)="data">
                            {{data.item.referee}}
                        </template>                       
                    </b-table>
                    <b-pagination
                        v-model="futureCurrentPage"
                        :total-rows="futureRows"
                        :per-page="perPage"
                        aria-controls="future-match-table"
                    ></b-pagination>
                </div>
            </div>
        </div>  
        <br/>
        <br/>
        <br/>
        <br/>
        <!-- Add Event Modal -->
        <div id="overlay" v-if="showEventModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> Game Event Log </h5>
                        <button type="button" class="close" @click="clearEvents()" >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body p-8">
                        <b-form>       
                            <!--Event -->
                            <b-table id="event-log-table" :fields="eventFields" :items="eventsDetails" :per-page="perPage" :current-page="futureCurrentPage">
                                <template #cell(game_date)="data">
                                    {{data.item.game_date}}
                                </template>
                                 <template #cell(hour)="data">
                                    {{data.item.hour}}
                                </template>
                                <template #cell(minutes)="data">
                                    {{data.item.minutes}}
                                </template>
                                <template #cell(description)="data">
                                    {{data.item.description}}
                                </template>
                            </b-table>
                        </b-form>
                        </div>
                    </div>
                </div>    
        </div>
      <mdb-row class="justify-content-md-center">
        <span v-if="team_info.future_games && team_info.future_games.length == 0 ">
          <h5 class="h4-responsive font-weight-bold text-center my-5">No Future available for this team</h5>
        </span>
      </mdb-row>
  </mdb-container>
</template>

<script>
  import VueHorizontalList from "../../node_modules/vue-horizontal-list";
	import { mdbContainer, mdbIcon, mdbBtn,mdbRow } from 'mdbvue';
	export default {
		name: 'TeamPage', 
		components: {
			mdbContainer,
      mdbIcon,
      VueHorizontalList,
      mdbBtn,
      mdbRow,
		},
    data() {
      return {
        team_info:{},
        players:[],
        follow:false,
        options: {
          responsive: [
            { end: 576, size: 1 },
            { start: 576, end: 768, size: 2 },
            { start: 768, end: 992, size: 3 },
            { size: 4 },
          ],
        },
        showEventModal: false,
        eventFields:[
            { key: 'game_date', label: 'Date' },
            { key: 'hour', label: 'Hour' },
            { key: 'minutes', label: 'Minutes' },
            { key: 'description', label: 'Description' },
        ],
        eventsDetails:[],
        events:[],
        pastGames:[],
        futureGames:[],
        pastFields:[
            { key: 'game_id', label: 'Game ID' },
            { key: 'hometeam', label: 'Home Team' },
            { key: 'awayteam', label: 'Away Team' },
            { key: 'date', label: 'Date' },
            { key: 'hour', label: 'Hour' },
            { key: 'Stadium', label: 'Stadium' },
            { key: 'referee', label: 'Referee' },
            { key: 'score', label: 'Score' },
            { key: 'events', label: 'Events' },
        ],
        futureFields:[
            { key: 'game_id', label: 'Game ID' },
            { key: 'hometeam', label: 'Home Team' },
            { key: 'awayteam', label: 'Away Team' },
            { key: 'date', label: 'Date' },
            { key: 'hour', label: 'Hour' },
            { key: 'Stadium', label: 'Stadium' },
            { key: 'referee', label: 'Referee' },
        ],
        perPage:5,
        pastCurrentPage:1,
        futureCurrentPage:1,
      }
    },
    computed: {
      pastRows() {
        return this.pastGames.length
      },
      futureRows() {
        return this.futureGames.length
      },
    },
    methods: {
      playerPageEnter(id) {
        this.$router.push({
          name: "playerpage",
          params: { playerID: id },
        });
      },
      async getGamesDetails(){
        const response = await this.axios.get(this.$root.store.server_url+"/season");
        console.log(response);
        localStorage.setItem('season',JSON.stringify(response.data));
      },
      getSavedGamesDetails(){
        const games = JSON.parse(localStorage.getItem('season'));
        console.log(games);
        this.pastGames = games.past_games;
        this.events = games.past_games.eventLogs;
        this.futureGames = games.future_games;
      },
      showEvents(game_id){
          this.events.forEach((e)=>{
              e.forEach((e2)=>{
                  if(e2.game_id == game_id){
                      this.eventsDetails.push(e2);
                  }
              })
          });
          this.showEventModal = true;
      },
      clearEvents(){
          this.showEventModal = false;
          this.eventsDetails = [];
      },
    },
    async created(){
      try{
        const response = await this.axios.get(this.$root.store.server_url+"/teams/page/"+this.$route.params.teamID);
        //localStorage.setItem('teamData',JSON.stringify(response.data))
        //var team_data = JSON.parse(localStorage.getItem('teamData'))
        var team_data = response.data
        this.players = team_data.players
        this.past_games = team_data.past_games
        this.future_games = team_data.future_games
      }catch(err){
        console.log(err);
      }
      await this.getGamesDetails();            
      this.getSavedGamesDetails();
      this.$root.$on('logout', x => {
          this.pastGames = [];
          this.futureGames = [];
      });
    },
	}
</script>

<style scoped>
p {
  margin-top: 6px;
}
h4 {
  margin: 0;
}
.subtitle {
  margin-top: 8px;
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
}
.image-container {
  border-radius: 10px;
  
  
  overflow: hidden;
  position: relative;
  width: 100%;
  padding-top: 60%;
}
.image-container:hover img {
  opacity: 0.3;
}
.image-container:hover .middle {
  opacity: 1;
}
img {
  object-fit: cover;
  width: auto;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: .5s ease;
  backface-visibility: hidden;
}
.middle {
  transition: .5s ease;
  opacity: 0;
  position: relative;
  top: 30%;
  left: 65%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
</style>