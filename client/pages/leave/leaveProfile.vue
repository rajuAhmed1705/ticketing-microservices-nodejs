<template>
  <div class="members">
    <h1 class="heading display-1">Leave Profile</h1>
    <v-container fluid>
      <v-row align-content="center">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="member in members"
          :key="member.name"
        >
          <v-card flat class="text-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="110" color="grey lighten-2">
                <img :src="member.avatar" alt="alt" />
              </v-avatar>
            </v-responsive>
            <v-card-text class="text-primary">
              <div class="heading">{{ member.name }}</div>
              <div class="subheading">{{ member.role }}</div>
            </v-card-text>

            <v-spacer></v-spacer>

            
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  head: () => ({
    title: "Members",
  }),
  data: () => ({
    members: [
      {
        name: "Adam Smith",
        role: "Senior Developer",
        team: ["ShurjoPay"],
        remainingLeave: 5,
        availedLeave: [
          {
            leaveType: "CL",
            availed: 10,
          },
          {
            leaveType: "SL",
            availed: 10,
          },
          {
            leaveType: "AL",
            availed: 16,
          },
          {
            leaveType: "CO",
            availed: 4,
          },
        ],
        avatar:
          "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
      },
      {
        name: "Adam Sandler",
        role: "Junior Developer",
        team: ["ShurjoERP"],
        remainingLeave: 5,
        availedLeave: [
          {
            leaveType: "CL",
            availed: 10,
          },
          {
            leaveType: "SL",
            availed: 8,
          },
          {
            leaveType: "LWP",
            availed: 2,
          },
        ],
        avatar:
          "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
      },
      {
        name: "Mary Elizabeth",
        role: "Intern",
        team: ["ShurjoERP"],
        remainingLeave: 0,
        availedLeave: [],
        avatar:
          "https://cdn2.vectorstock.com/i/1000x1000/01/66/businesswoman-character-avatar-icon-vector-12800166.jpg",
      },
      {
        name: "Prakash Kumar",
        role: "Business Analyst",
        team: ["Business Development"],
        remainingLeave: 6,
        availedLeave: [
          {
            leaveType: "CL",
            availed: 10,
          },
          {
            leaveType: "SL",
            availed: 7,
          },
          {
            leaveType: "ML",
            availed: 6,
          },
          {
            leaveType: "LWP",
            availed: 3,
          },
        ],
        avatar:
          "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
      },
    ],
  }),
}
</script>

<style>
</style>
