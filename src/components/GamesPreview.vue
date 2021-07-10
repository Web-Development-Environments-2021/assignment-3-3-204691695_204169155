<template>
  <div>
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>        
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
            <b-col>{{ row.item.age }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
            <b-col>{{ row.item.isActive }}</b-col>
          </b-row>

          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: ['Team_1', 'Team_2', 'show_details'],
        items: [
          { isActive: true, age: 40, Team_1: 'Dickerson', Team_2: 'Macdonald' },
          { isActive: false, age: 21, Team_1: 'Larsen', Team_2: 'Shaw' },
          {
            isActive: false,
            age: 89,
            Team_1: 'Geneva',
            Team_2: 'Wilson',
            _showDetails: true
          },
          { isActive: true, age: 38, Team_1: 'Jami', Team_2: 'Carney' }
        ]
      }
    }
  }
</script>