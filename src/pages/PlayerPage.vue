<template>
  <mdb-container>
    <h2 class="h1-responsive font-weight-bold text-center my-5">{{ player_info.name }}
        <h6 class="font-weight-bold mb-3 green-text">
            <mdb-icon icon="futbol" class="pr-2" />Player</h6>
    </h2>
    <mdb-row>
      <mdb-col lg="3">
        <img :src="player_info.image" style="border-radius: 70%;"/>
      </mdb-col>
      <mdb-col lg="7">
        <h3 class="font-weight-bold mb-3 p-0" style="color: rgb(85, 233, 183)">
          <strong>Team: {{ player_info.team_name }}</strong>
        </h3>
        <mdb-list-group flush>
            <mdb-list-group-item><strong>Common Name</strong>{{ player_info.common_name }}</mdb-list-group-item>
            <mdb-list-group-item><strong>Nationality</strong>{{ player_info.nationality }}</mdb-list-group-item>
            <mdb-list-group-item><strong>Birthdate</strong>{{ player_info.birthdate }}</mdb-list-group-item>
            <mdb-list-group-item><strong>Birthcountry</strong>{{ player_info.birthcountry }}</mdb-list-group-item>
            <mdb-list-group-item><strong>Position</strong>{{ player_info.position ? player_info.position : "unknown" }}</mdb-list-group-item>
            <mdb-list-group-item><strong>Height</strong>{{ player_info.height ? player_info.height : "unknown" }}</mdb-list-group-item>
            <mdb-list-group-item><strong>Weight</strong>{{ player_info.weight ? player_info.weight : "unknown" }}</mdb-list-group-item>
        </mdb-list-group>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
	  import { mdbContainer, mdbRow, mdbCol, mdbIcon, mdbListGroup, mdbListGroupItem } from 'mdbvue';
	export default {
		name: 'PlayerPage',
		components: {
			mdbContainer,
            mdbRow,
            mdbCol,
            mdbIcon,
            mdbListGroup,
            mdbListGroupItem
		},
        data() {
            return {
                player_info:{},
                follow:false,
            }
        },
        async created(){
            var response;
            try{
                response = await this.axios.get(this.$root.store.server_url+"/players/page/"+this.$route.params.playerID);
                if (response.status !== 201) this.$router.replace("/NotFound");
                console.log(response);
                this.player_info = response.data
                console.log("player page");
                console.log(this.player_info)
            }catch( err){
                this.$router.push("/NotFound");
            }
        }
	}
</script>

<style>
    
</style>