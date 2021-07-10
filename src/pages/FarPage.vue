<template>
    <div>
        <div class="container">
            <div class="row mt-3">
                <div class="col-lg-6">
                    <h3 class="text-info">Add New Match</h3>
                </div>
                <div class="col-lg-6">
                    <button class="btn btn-info float-right" @click="showAddModal=true">
                        <i class="fas fa-user"></i> Add Match
                    </button>
                </div>
            </div>
            <hr class="bg-info">
            <div class="alert alert-danger" v-if="errorMsg">
                {{Error_Msg}}
            </div>
            <div class="alert alert-success" v-if="successMsg">
                {{Success_Msg}}
            </div>
            <!-- Matches display-->
            <div class="row">
                <div class="col-lg-12 center">
                    <b-table 
                        id="match-table" :fields="fields"
                        :items="games" :per-page="perPage" 
                        :current-page="currentPage" 
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        :sort-compare="sortCompare"
                    >
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
                        <template #cell(score)="data">
                            {{data.item.score}}
                        </template>
                        <template #cell(referee)="data">
                            {{data.item.referee}}
                        </template>
                        <template #cell(stadium)="data">
                            {{data.item.stadium}}
                        </template>
                        <template #cell(add_score)="data">
                            <a v-if="!data.item.score" href="#" class="text-success" @click="showAddScoreModal = true; game_id =data.item.game_id;"><i class="fa fa-plus"></i>Score</a>
                        </template>
                        <template #cell(add_event)="data">
                            <a href="#" class="text-success" @click="showEventModal = true; game_id =data.item.game_id;"><i class="fa fa-plus"></i>Event</a>
                        </template>
                    </b-table>
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="match-table"
                    ></b-pagination>
                </div>
            </div>
        </div>
        <!-- Add Match Modal -->
        <div id="overlay" v-if="showAddModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> Add New Match </h5>
                        <button type="button" class="close" @click="showAddModal=false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body p-8">
                        <b-form @submit.prevent="onAddMatch" @reset.prevent="onReset">       
                            <!--Home Team -->
                            <b-form-group
                                id="input-group-hometeam"
                                label-cols-sm="3"
                                label="Home Team:"
                                label-for="hometeam"
                                >
                                <b-form-select
                                    id="hometeam"
                                    v-model="$v.form.hometeam.$model"
                                    :options="teams"
                                    :state="MatchvalidateState('hometeam')"
                                ></b-form-select>
                                <b-form-invalid-feedback v-if="!$v.form.hometeam.required">
                                    Home Team is required
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <!--Away Team -->
                            <b-form-group
                                id="input-group-awayteam"
                                label-cols-sm="3"
                                label="Away Team:"
                                label-for="awayteam"
                                >
                                <b-form-select
                                    id="awayteam"
                                    v-model="$v.form.awayteam.$model"
                                    :options="teams"
                                    :state="MatchvalidateState('awayteam')"
                                ></b-form-select>
                                <b-form-invalid-feedback v-if="!$v.form.awayteam.required">
                                    Away Team is required
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback v-else-if="!$v.form.awayteam.sameAsHome">
                                    Away Team must be diffrent from Home Team
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <!-- Date -->
                            <b-form-group
                                id="input-group-date"
                                label-cols-sm="3"
                                label="Date: "
                                label-for="date"
                            >
                                <b-form-datepicker
                                    id="date"
                                    v-model="$v.form.date.$model"
                                    :state="MatchvalidateState('date')"
                                    :min="dateConstraint"
                                    close-button
                                    dropleft
                                ></b-form-datepicker>
                                <b-form-invalid-feedback v-if="!$v.form.date.required">
                                    date is required
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <!-- hour -->
                            <b-form-group
                                id="input-group-hour"
                                label-cols-sm="3"
                                label="Time: "
                                label-for="hour"
                            >
                                <b-form-timepicker
                                    id="hour"
                                    v-model="$v.form.hour.$model"
                                    :state="MatchvalidateState('hour')"
                                    close-button
                                    :hour12="false"
                                    dropleft
                                ></b-form-timepicker>
                                <b-form-invalid-feedback v-if="!$v.form.hour.required">
                                    Time is required
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <!-- referee -->
                            <b-form-group
                                id="input-group-referee"
                                label-cols-sm="3"
                                label="Referee:"
                                label-for="referee"
                                >
                                <b-form-select
                                    id="referee"
                                    v-model="$v.form.referee.$model"
                                    :options="referees"
                                    :state="MatchvalidateState('referee')"
                                ></b-form-select>
                                <b-form-invalid-feedback v-if="!$v.form.referee.required">
                                    referee  is required
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <!-- stadium -->
                            <b-form-group
                                id="input-group-stadium"
                                label-cols-sm="3"
                                label="Stadium:"
                                label-for="stadium"
                                >
                                <b-form-select
                                    id="stadium"
                                    v-model="$v.form.stadium.$model"
                                    :options="stadiums"
                                    :state="MatchvalidateState('stadium')"
                                ></b-form-select>
                                <b-form-invalid-feedback v-if="!$v.form.stadium.required">
                                    Stadium  is required
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-button type="reset" variant="danger">Reset</b-button>
                                <b-button
                                    type="submit"
                                    variant="primary"
                                    style="width:250px;"
                                    class="ml-5 w-75"
                                >Add Match
                            </b-button>   
                        </b-form>
                        </div>
                    </div>
                </div>
        </div>
        <!-- Add Score Modal -->
        <div id="overlay" v-if="showAddScoreModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> Add Score To Match </h5>
                        <button type="button" class="close" @click="showAddScoreModal=false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body p-8">
                        <b-form @submit.prevent="onAddScore">       
                            <!--Score Input -->
                            <b-form-group
                                id="input-group-score"
                                label-cols-sm="3"
                                label="Score:"
                                label-for="score"
                                >
                                <b-form-input
                                    id="score"
                                    v-model="$v.score.$model"
                                    type="text"
                                    :state="ScorevalidateState('score')"
                                ></b-form-input>
                                <b-form-invalid-feedback v-if="!$v.score.required">
                                    Score is required
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback v-if="!$v.score.scoreCase">
                                    Invalid Score format, exmaple: 1-0
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-button
                                type="submit"
                                variant="primary"
                                style="width:250px;"
                                class="ml-5 w-75"
                            >Add Score
                            </b-button>   
                        </b-form>
                        </div>
                    </div>
                </div>
        </div>
        <!-- Add Event Modal -->
        <div id="overlay" v-if="showEventModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> Add Event Log To Match </h5>
                        <button type="button" class="close" @click="showEventModal=false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body p-8">
                        <b-form @submit.prevent="onAddEvent" @reset.prevent="onReset">       
                            <!-- Date -->
                            <b-form-group
                                id="input-group-dateEvent"
                                label-cols-sm="3"
                                label="Date: "
                                label-for="date"
                            >
                                <b-form-datepicker
                                    id="date"
                                    v-model="$v.eventForm.date.$model"
                                    :state="EventvalidateState('date')"
                                    :max="dateConstraint"
                                    close-button
                                    dropleft
                                ></b-form-datepicker>
                                <b-form-invalid-feedback v-if="!$v.eventForm.date.required">
                                    date is required
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <!-- hour -->
                            <b-form-group
                                id="input-group-hourEvent"
                                label-cols-sm="3"
                                label="Time: "
                                label-for="hour"
                            >
                                <b-form-timepicker
                                    id="hour"
                                    v-model="$v.eventForm.hour.$model"
                                    :state="EventvalidateState('hour')"
                                    close-button
                                    dropleft
                                ></b-form-timepicker>
                                <b-form-invalid-feedback v-if="!$v.eventForm.hour.required">
                                    Time is required
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <!-- description -->
                            <b-form-group
                                id="input-group-descriptionEvent"
                                label-cols-sm="3"
                                label="Event Type:"
                                label-for="description"
                                >
                                <b-form-select
                                    id="description"
                                    v-model="$v.eventForm.description.$model"
                                    :options="description_types"
                                    :state="EventvalidateState('description')"
                                ></b-form-select>
                                <b-form-invalid-feedback v-if="!$v.eventForm.description.required">
                                    Event  is required
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-button
                                type="submit"
                                variant="primary"
                                style="width:250px;"
                                class="ml-5 w-75"
                            >Add Event Log
                            </b-button>   
                        </b-form>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import {
  required,
  sameAs,
  not,
  helpers,
} from "vuelidate/lib/validators";
const scoreCase = helpers.regex('scoreCase',/\d-\d/);
export default {
    name:"FarPage",
    data() {
        return {
            dateConstraint: new Date(),
            sortBy: '',
            sortDesc: false,
            errorMsg:false,
            successMsg:false,
            Error_Msg:"",
            Success_Msg:"",
            showAddModal:false,
            showAddScoreModal:false,
            showEventModal:false,
            submitStatus: null,
            form:{
                hometeam:"",
                awayteam:"",
                stadium:"",
                referee:"",
                date:"",
                hour:"",
            },
            eventForm:{
                date:"",
                hour:"",
                description:""
            },
            score:null,
            game_id:null,
            teams: [{ value: null, text: "", disabled: true }],
            referees: [{ value: null, text: "", disabled: true }],
            stadiums: [{ value: null, text: "", disabled: true }],
            description_types:["Goal","Offside","Foul","Red Flag","Yellow Flag","Injury","Player Change"],
            games:[],
            fields:[
                { key: 'game_id', label: 'Game ID' },
                { 
                    key: 'hometeam', label: 'Home Team' ,
                    sortable:true, formatter: (value, key, item) => {return decodeURI(item.homeTeam_name)},
                    sortByFormatted: true,
                },
                { 
                    key: 'awayteam', label: 'Away Team' ,
                    sortable:true, formatter: (value, key, item) => {return decodeURI(item.visitorTeam_name)},
                    sortByFormatted: true,
                },
                { key: 'date', label: 'Date' , sortable:true },
                { key: 'hour', label: 'Hour' },
                { key: 'Stadium', label: 'Stadium' },
                { key: 'referee', label: 'Referee' },
                { key: 'score', label: 'Score'},
                { key: 'add_score', label: 'Add Score'},
                { key: 'add_event', label: 'Add Event'},
            ],
            perPage:5,
            currentPage:1,
        }
    },
    validations: {
        form: {
            hometeam: {
                required,
            },
            awayteam: {
                required,
                sameAsHome: not(sameAs("hometeam"))
            },
            date:{
                required,
            },
            hour:{
                required,
            },
            referee:{
                required,
            },
            stadium:{
                required,
            }
        },
        score:{
            required,
            scoreCase,
        },
        eventForm:{
            date:{
                required
            },
            hour:{
                required,
            },
            description:{
                required,
            }
        },
    },
    async created(){
        // local use
        //let fardata = JSON.parse(localStorage.getItem('farData'));
        // server user
        // add.data
        let fardata = await this.axios.get(this.$root.store.server_url+"/FAR/");
        fardata = fardata.data
            // for local save
            //localStorage.setItem('farData',JSON.stringify(fardata.data));
            //fardata = fardata.data;
        fardata.teams.forEach(element => {
            this.teams.push({value:[element.team_id,element.team_name],text:decodeURI(element.team_name)})
        });
        fardata.referees.forEach(element => {
            this.referees.push({value:element.referee_id,text:element.name})
        });
        fardata.stadiums.forEach(element => {
            this.stadiums.push({value:element.name,text:element.name})
        });
        this.games = fardata.games;
    },
    computed: {
      rows() {
        return this.games.length
      }
    },
    methods:{
        MatchvalidateState(param){
            const { $dirty, $error } = this.$v.form[param];
            return $dirty ? !$error : null;
        },
        ScorevalidateState(param){
            const { $dirty, $error } = this.$v[param];
            return $dirty ? !$error : null;
        },
        EventvalidateState(param){
            const { $dirty, $error } = this.$v.eventForm[param];
            return $dirty ? !$error : null;
        },
        onAddMatch(){
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                return;
            }
            this.submitNewMatch();
        },
        async onAddScore(){
            this.$v.$touch();
            if (this.$v.score.$anyError) {
                return;
            }
            try{
                console.log(this.game_id);
                console.log(this.score)
                const response = await this.axios.put(
                    this.$root.store.server_url+"/FAR/addScore",
                    {
                        game_id:this.game_id,
                        score:this.score,
                    }
                );
                this.$root.toast("Success","Score Added","success");
                this.showAddScoreModal = false;
                const matches = await this.axios.get(
                    this.$root.store.server_url+"/FAR/allMatches");
                this.games = matches.data
            }
            catch(err){
                this.form.submitError = err.response.data;
                console.log(err.response.data)
                this.$root.toast("Error Occored","Score didnt added,contact devs","warning");
                this.showAddScoreModal = false;
            }
        },
        async onAddEvent(){
            this.$v.eventForm.$touch();
            if (this.$v.eventForm.$anyError) {
                return;
            }
            try{
                const response = await this.axios.post(
                    this.$root.store.server_url+"/FAR/addEventLog",
                    {
                        game_id:this.game_id,
                        date:this.eventForm.date,
                        hour:this.eventForm.hour.slice(0,2),
                        minutes:this.eventForm.hour.slice(3,5),
                        description:this.eventForm.description
                    }
                );
                this.$root.toast("Success","Event Added","success");
                this.showEventModal = false;
            }catch(err){
                this.form.submitError = err.response.data;
                console.log(err.response.data)
                this.$root.toast("Error Occored","Event didnt added,contact devs","warning");
                this.showEventModal = false;
            }
            
        },
        onReset() {
            this.form = {
                hometeam:"",
                awayteam:"",
                stadium:"",
                referee:"",
                date:"",
                score:null
            };
            this.$nextTick(() => {
                this.$v.$reset();
            });
        },
        async submitNewMatch(){
            try {
                const response = await this.axios.post(
                    this.$root.store.server_url+"/FAR/addNewGame",
                        {
                        homeTeam:parseFloat(this.form.hometeam[0]),
                        visitorTeam:parseFloat(this.form.awayteam[0]),
                        date:this.form.date,
                        hour:this.form.hour,
                        referee:parseFloat(this.form.referee),
                        stadium:this.form.stadium,
                        homeTeam_name:this.form.hometeam[1],
                        visitorTeam_name:this.form.awayteam[1],
                    }
                );
                
                this.$root.toast("Success","Match Added","success");
                this.showAddModal = false;
                const matches = await this.axios.get(
                    this.$root.store.server_url+"/FAR/allMatches");
                this.games = matches.data
            } catch (err) {
                this.$root.toast("Error Occored","Match didnt added,contact devs","warning");
                this.form.submitError = err.response.data;
                console.log(err.response.data)
                this.showAddModal = false;
            }
        },
        sortCompare(aRow, bRow, key, sortDesc, formatter, compareOptions, compareLocale) {
            const date1 = aRow.game_date
            const date2 = bRow.game_date
            if (!formatter) {
                // If both compared fields native dates
                return date1.localeCompare(date2)
            } 
        }
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
    
    .center{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>