<template>
  <v-row justify="center">
    <v-dialog v-bind="$attrs" v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          <slot name="btnName"></slot>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <slot name="cardName"></slot>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                  <slot name="fName"></slot>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <ReusableInput
                  v-model="details.lName"
                  label="Last Name*"
                  type="text"
                />
              </v-col>
              <v-col cols="12">
                <ReusableInput
                  v-model="details.email"
                  label="Email*"
                  type="email"
                />
              </v-col>
              <v-col cols="12">
                <ReusableInput
                  v-model="details.password"
                  label="Password *"
                  type="password"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <ReusableSelect :items="selectItems"
                v-model="details.items"
                label="Select Item" />
              </v-col>
              <v-col cols="12" sm="6">
                <ReusableAutoComplete />
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    props:{
        selectItems:{
            type: Array,
            default:[]
        }

    },
  data: () => ({
    details: {
      fName: "",
      lName: "",
      password: "",
      email: "",
      select: {
        catering: false,
        music: false,
      },
      items: [
        "Casual Leave",
        "Sick Leave",
        "Annual Leave",
        "Marriage Leave",
        "Paternity Leave",
        "Compensatory Leave",
        "Leave Without Pay",
      ],
    },
    dialog: false,
    props: {
      title: {
        type: String,
        default: "",
      },
    },
  }),
}
</script>