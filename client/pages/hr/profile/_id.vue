<template>
  <div>
    <template>
      <v-card color="teal darken-2" dark flat>
        <v-responsive class="p-4">
          <v-avatar size="150" class="ma-3">
            <img
              src="https://avatars.githubusercontent.com/u/43791325?s=460&u=1676d13c2b41915647bbdf66170daf6b27a081f7&v=4"
              alt="alt"
            />
          </v-avatar>
        </v-responsive>
        <div>
          <v-card-title class="headline"> Raju Ahmed </v-card-title>
          <v-card-subtitle> Jr. Software Engineer </v-card-subtitle>
        </div>
      </v-card>
      <v-card>
         <v-responsive class="pt-4">
           <v-card-title primary-title>
             Details Here
           </v-card-title>
         </v-responsive>
      </v-card>
       
      <v-divider></v-divider>

      <!-- info tables -->
      <template>
        <v-card class="mx-auto mt-4">
          <v-card-subtitle
            class="font-weight-bold mb-0 pb-0 pl-0 mt-4 h-3 text-center"
          >
            <h4>Personal Information</h4>
          </v-card-subtitle>
          <v-card-text>
            <v-row class="d-flex justify-space-between">
              <v-col
                cols="6"
                md="6"
                sm="12"
                v-for="(item, index) in title"
                :key="index"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <h5>{{ item }}:</h5>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>

      <!-- employee info -->
      <template>
        <v-card class="mx-auto mt-10" tile>
          <v-card-subtitle
            class="font-weight-bold mb-0 pb-0 pl-0 mt-4 h-3 text-center"
            ><h4>Employee Information</h4></v-card-subtitle
          >

          <v-row class="d-flex justify-space-around">
            <v-col cols="6" md="6" sm="12">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><h5>EMP ID:</h5></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><h5>Department:</h5></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    ><h5>Designation: Developer</h5></v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><h5>Unit:</h5></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><h5>Team:</h5></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>

            <v-col cols="6" md="6" sm="12">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><h5>Project:</h5></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><h5>DOJ:</h5></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><h5>Reporting To:</h5></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    ><h5>Employment Type:</h5></v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><h5>Job Location:</h5></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </template>

      <template>
        <v-card-subtitle
          v-text="`Address`"
          class="font-weight-bold mb-0 pb-0 pl-0 mt-4 text-center"
        ></v-card-subtitle>
        <v-divider class="mt-0 mb-4"></v-divider>
        <v-data-table
          :headers="addressHeaders"
          :items="address"
          class="elevation-1"
          hide-default-footer
        ></v-data-table>
      </template>

      <template>
        <v-card-subtitle
          v-text="`Education`"
          class="font-weight-bold mb-0 pb-0 pl-0 text-center"
        ></v-card-subtitle>
        <v-divider class="mt-0 mb-4"></v-divider>
        <v-data-table
          :headers="educationHeaders"
          :items="educationalQualifications"
          class="elevation-1"
          hide-default-footer
        ></v-data-table>
      </template>
      <template>
        <v-card-subtitle
          v-text="`Work Experiences`"
          class="font-weight-bold mb-0 pb-0 pl-0 text-center"
        ></v-card-subtitle>
        <v-divider class="mt-0 mb-4"></v-divider>
        <v-data-table
          :headers="workHeaders"
          :items="workExperience"
          class="elevation-1"
          hide-default-footer
        ></v-data-table>
      </template>
      <template>
        <v-card-subtitle
          v-text="`Training Details`"
          class="font-weight-bold mb-0 pb-0 pl-0 text-center"
        ></v-card-subtitle>
        <v-divider class="mt-0 mb-4"></v-divider>
        <v-data-table
          :headers="trainingDetailsHeaders"
          :items="trainingDetails"
          class="elevation-1"
          hide-default-footer
        ></v-data-table>
      </template>
      <template>
        <v-card-subtitle
          v-text="`Skills/Competencies `"
          class="font-weight-bold mb-0 pb-0 pl-0 text-center"
        ></v-card-subtitle>
        <v-divider class="mt-0 mb-4"></v-divider>
        <v-data-table
          :headers="skillHeaders"
          :items="skillDetails"
          class="elevation-1"
          hide-default-footer
        ></v-data-table>
      </template>
      <template>
        <v-card-subtitle
          v-text="`Bank Details`"
          class="font-weight-bold mb-0 pb-0 pl-0 text-center"
        ></v-card-subtitle>
        <v-divider class="mt-0 mb-4"></v-divider>
        <v-data-table
          :headers="bankDetailsHeaders"
          :items="bankDetails"
          class="elevation-1"
          hide-default-footer
        ></v-data-table>
      </template>
      <v-btn class="mt-3 primary text-center">
        <v-icon>mdi-arrow-down-bold</v-icon>Download
      </v-btn>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: [
        "Full Name",
        "Preferred Nickname",
        "Date Of Birth",
        "Father's Name",
        "Mother's Name",
        "Marital Status",
        "Spouse Name",
        "Number of Dependents",
        "NID",
        "Pasport No.",
        "Gender",
        "Religion",
        "Nationality",
        "Blood Group",
      ],
      workHeaders: [
        {
          text: "Company Name",
          align: "start",
          sortable: false,
          value: "companyName",
        },
        { text: "Designation", value: "designation" },
        { text: "Department", value: "department" },
        { text: "Duration", value: "duration" },
        { text: "Supervisor Name", value: "supervisorName" },
        { text: "Supervisor Contact", value: "supervisorContact" },
      ],
      educationHeaders: [
        {
          text: "Professional Qualification",
          align: "start",
          sortable: false,
          value: "professionalQualification",
        },
        { text: "Degree", value: "degree" },
        { text: "Faculty", value: "faculty" },
        { text: "Institution", value: "institution" },
        { text: "PassingYear", value: "passingYear" },
        { text: "CGPA/Grade", value: "cgpa" },
      ],
      addressHeaders: [
        {
          text: "House Number",
          align: "start",
          sortable: false,
          value: "houseNumber",
        },
        { text: "Village", value: "village" },
        { text: "PostOffice", value: "postOffice" },
        { text: "Upozilla", value: "upozilla" },
        { text: "District", value: "district" },
      ],
      trainingDetailsHeaders: [
        {
          text: "Training Title",
          align: "start",
          sortable: false,
          value: "trainingTitle",
        },
        { text: "Duration", value: "duration" },
        { text: "Key Areas of Learning", value: "keyOfLearning" },
        { text: "Training Institute Name", value: "trainingInstitution" },
      ],
      skillHeaders: [
        {
          text: "Functional Competencies",
          align: "start",
          sortable: false,
          value: "functionalCompetencies",
        },
        { text: "Language", value: "language" },
        { text: "Computer & IT Skills", value: "computerSkills" },
        { text: "Soft Competencies", value: "softCompentices" },
      ],
      bankDetailsHeaders: [
        {
          text: "Account Name",
          align: "start",
          sortable: false,
          value: "accountName",
        },
        { text: "Bank name", value: "bankName" },
        { text: "Branch Name", value: "branchName" },
        { text: "Account Number", value: "accountNo" },
        { text: "Account Type", value: "accountType" },
        { text: "Purpose of Use", value: "purposeOfUse" },
      ],
      workExperience: [
        {
          companyName: "Shurjomukhi Ltd",
          designation: "jr. software engineer",
          department: "IT",
          duration: "2 years",
          supervisorName: "Rock Gomes",
          supervisorContact: "01700000000",
        },
        {
          companyName: "Pranisheba Ltd",
          designation: "jr. software engineer",
          department: "AI",
          duration: "1 years",
          supervisorName: "Rock Gomes",
          supervisorContact: "01700000000",
        },
      ],
      educationalQualifications: [
        {
          professionalQualification: "BSc",
          degree: "Engineering",
          faculty: "CSE",
          institution: "BAIUST",
          passingYear: "2019",
          cgpa: "2.10",
        },
        {
          professionalQualification: "HSC",
          degree: "HSC",
          faculty: "Science",
          institution: "Sylhet Cadet College",
          passingYear: "2014",
          cgpa: "5.00",
        },
      ],
      address: [
        {
          houseNumber: "23B/C",
          village: "Somewhere",
          postOffice: "Salil Aurora",
          upozilla: "Nagarpur",
          district: "Tangail",
        },
        {
          houseNumber: "24B/C",
          village: "anywhere",
          postOffice: "Salil Aurora",
          upozilla: "Nagarpur",
          district: "Tangail",
        },
      ],
    }
  },
}
</script>

<style></style>
