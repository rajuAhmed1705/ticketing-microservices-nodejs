<template>
  <div>
    <v-card>
      <v-card-title> Application Form</v-card-title>
    </v-card>
    <v-card-text>
      <!-- form starts  -->
      <v-form>
        <!-- category select  -->
        <ReusableSelect
          v-model="application.leaveCategory"
          :items="items"
          label="Leave Category"
          :rules="[(v) => !!v || 'Leave Category is required']"
          required
        />
        <!-- date picker from menu  -->
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="2">
            <ReusableDatePicker label="From Date" />
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="2">
            <ReusableTimePicker label="Time" />
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="2">
            <ReusableDatePicker label="To Date" />
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="2">
            <ReusableTimePicker label="Time" />
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="2">
            <v-badge left color="primary" content="#" inline>
              days Leave
            </v-badge>
          </v-col>
        </v-row>

        <ReusableTextArea
          outlined
          name="input-7-1"
          label="Reason for Leave"
          placeholder="Please write your reason for leave"
          v-model="application.leaveReason"
        />
        <ReusableFileInput label="Documents for validation" />
        
        <v-btn
        color="success"
        class="mr-4"
        type="submit"
      >
        submit
      </v-btn>
      </v-form>
      <!-- form ends  -->
    </v-card-text>
  </div>
</template>

<script>
export default {
  data: () => ({
    application: {
      leaveCategory: "",
      leaveReason:""
    },
    items: [
      "Sick Leave",
      "Casual Leave",
      "Annual Leave",
      "Marriage Leave",
      "Paternity Leave",
      "Leave Without Pay",
      "Compensatory Leave",
    ],
    menu: false,
    dates: [
      new Date().toISOString().substr(0, 10),
      new Date().toISOString().substr(0, 10),
    ],
  }),
  methods:{
    clear(){
      this.application.leaveCategory="",
      this.application.leaveReason=""
    }
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ")
    },
  },
}
</script>

<style>
</style>