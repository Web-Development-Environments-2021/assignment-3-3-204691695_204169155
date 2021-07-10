<template>
    <div class="center-all">
        <h2 class="center-all title-season">Current Season Games</h2>
        <h2 style="margin-top:40px">Past Games</h2>
        <div class="container">
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
                        <template v-if="loginUser()" #cell(favorite)="data">
                            <div>
                                <b-form-checkbox switch 
                                :disabled="isCheck(data.item.game_id)"
                                :checked="isCheck(data.item.game_id)"
                                @change="change(data.item.game_id)"
                                />
                            </div>
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
    </div>
</template>

<script>
export default {
    name:"SeasonGames",
    data() {
        return {
            showEventModal: false,
            favorites: [],
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
                { key: 'favorite', label: 'Favorite' },
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
        async getGamesDetails(){
            const response = await this.axios.get(this.$root.store.server_url + "/season");
            localStorage.setItem('seasonGames',JSON.stringify(response.data));
        },
        getSavedGamesDetails(){
            const games = JSON.parse(localStorage.getItem('seasonGames'));
            this.pastGames = games.past_games.games;
            this.events = games.past_games.eventLogs;
            console.log(games.past_games.eventLogs);
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
        async change(game_id){
            try{
                const response = await this.axios.post(
                    this.$root.store.server_url + "/users/favoriteGames",
                {
                    game_id: game_id,
                });
                this.favorites.push(game_id);
            }catch(e){
                console.log("error adding game to favorites");
            }
        },
        isCheck(game_id){
            const x = this.favorites.find((e)=> e == game_id);
            if(x){
                return true;
            }
            return false;
        },
        loginUser(){
            if(this.$root.store.username){
                return true;
            }
            return false;
        },
    },
    async created(){
        await this.getGamesDetails();            
         if(this.$root.store.username){
            try{
                const response = await this.axios.get(this.$root.store.server_url + "/users/favoriteGames");
                if(response.data){
                    response.data.forEach((res)=>{
                        const gameId = res.game_id;
                        this.favorites.push(gameId);
                        }
                    );
                }
            }catch(e){console.log("");}
        }
        this.getSavedGamesDetails();
        this.$root.$on('logout', x => {
            this.pastGames = [];
            this.futureGames = [];
        });
        
    },
}
</script>

<style scoped>
    #overlay{
     position: fixed;
     top:0;
     bottom: 0;
     left: 0;
     right: 0;
     background: rgb(0, 0, 0,0.6);   
    }

    .center-all{
        display: flex;
        flex-direction: column;
        align-items: center;

    }

    .title-season{
        color: #227dbf;
        font-family: 'Mansalva', cursive; 
        font-style: italic;
        font-weight: 300;
        font-size: 55px;
        margin-top: 0.5%;
        margin-bottom: 2%;
    }
</style>