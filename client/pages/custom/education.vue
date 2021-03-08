<template>
  <v-form>
    <v-container v-for="(person, k) in persons" :key="k">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="person.firstname"
            label="First name"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="person.lastname"
            label="Last name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="person.email" label="E-mail"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-btn @click="submit()">Submit</v-btn>
    <v-btn @click="add()">Add</v-btn>
    <v-btn @click="remove()" v-show="persons.length > 1">remove</v-btn>
  </v-form>
</template>
<script>
export default {
  data: () => ({
    persons: [{ firstname: "", lastname: "", email: "" }]
  }),
  methods: {
    submit() {
      console.log(this.persons);
    },
    add() {
      this.persons.push({ firstname: "", lastname: "", email: "" });
    },
    remove() {
      this.persons.pop();
    }
  }
};
</script>
