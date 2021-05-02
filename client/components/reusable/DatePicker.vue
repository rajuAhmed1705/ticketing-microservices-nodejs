<template>
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="picker"
            :label="label"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
    <v-date-picker
      v-model="picker"
      :allowed-dates="allowedDates"
     
      year-icon="mdi-calendar-blank"
      prev-icon="mdi-skip-previous"
      next-icon="mdi-skip-next"
      @input="menu2 = false"
      elevation-10
    ></v-date-picker>
      </v-menu>
</template>

<script>
  export default {
    props:{
      label:{
        type: String,
        default: 'Pick Date'
      }

    },
    data: () => ({
      menu2: false,
      picker: new Date().toISOString().substr(0, 10),
    }),

    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
    },
  }
</script>

<style>

</style>