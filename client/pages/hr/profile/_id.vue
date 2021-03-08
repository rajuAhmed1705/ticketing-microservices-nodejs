<template>
  <div>
    <template>
      <v-row class=" d-flex justify-space-between">
        <!-- left -->
        <v-col cols="20" md="3" sm="5" class="mb-3">
          <v-card-text class="px-0">
            <div class="mt-3">
              <div class="font-weight-medium">
                <h4>Adress</h4>
              </div>
              <v-divider></v-divider>
              <div class="d-flex align-center">
                <v-icon small class="mr-2 ">mdi-home</v-icon>
                Dhaka
              </div>
            </div>
            <div class="mt-3">
              <div class="font-weight-medium">
                <h4>Contacts</h4>
              </div>
              <v-divider></v-divider>
              <div class="d-flex align-center">
                <v-icon small class="mr-2">mdi-phone</v-icon>
                Personla Number: 0177777777
              </div>
              <div class="d-flex align-center">
                <v-icon small class="mr-2">mdi-email</v-icon>
                Email: rajucse1705@gmail.com
              </div>
              <div class="d-flex align-center">
                <v-icon small class="mr-2">mdi-car-emergency</v-icon>
                Emergency Contact: 0177777777
              </div>
            </div>
          </v-card-text>
        </v-col>
        <!-- right -->
        <v-col cols="4" md="3" sm="5" class="mb-3">
          <v-card class="mx-auto" max-width="434" tile>
            <v-img
              height="100%"
              src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
            >
              <v-row align="end" class="fill-height">
                <v-col align-self="start" class="pa-0" cols="12">
                  <v-avatar class="profile" color="grey" size="164" tile>
                    <v-img
                      src="https://avatars.githubusercontent.com/u/43791325?s=460&u=1676d13c2b41915647bbdf66170daf6b27a081f7&v=4"
                    ></v-img>
                  </v-avatar>
                </v-col>
                <v-col class="py-0">
                  <v-list-item color="rgba(0, 0, 0, .4)" dark>
                    <v-list-item-content>
                      <v-list-item-title class="title">
                        Raju Ahmed
                      </v-list-item-title>
                      <v-list-item-subtitle
                        >Jr. Software Engineer</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <!-- info tables -->
      <template>
        <v-card class="mx-auto mt-4" tile>
          <h3 class="text-center">Personal Information</h3>
          <v-row class="d-flex justify-space-between">
            <v-col cols="6" md="6" sm="12">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Full Name: Raju Ahmed</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Preferred Nickname: Raju</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Date Of Birthday: 1/1/1996</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Father's Name: Abc</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Mother's Name: Abc</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Marital Status: Unmarried</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Spouse Name: Abc</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="6" md="6" sm="12">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Number of Dependents</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>NID:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Pasport No.:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Gender:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Religion:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Nationality:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Blood Group:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </template>

      <!-- employee info -->
      <template>
        <v-card class="mx-auto mt-10" tile>
          <h3 class="text-center">Employee Information</h3>

          <v-row class="d-flex justify-space-around">
            <v-col cols="6" md="6" sm="12">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>EMP ID: 1</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Department: IT</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Designation: Developer</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Unit: </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Team:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>

            <v-col cols="6" md="6" sm="12">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Project:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>DOJ:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Reporting To:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Employment Type:</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Job Location:</v-list-item-title>
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
        >
        </v-card-subtitle>
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
        >
        </v-card-subtitle>
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
        >
        </v-card-subtitle>
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
        >
        </v-card-subtitle>
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
        >
        </v-card-subtitle>
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
        >
        </v-card-subtitle>
        <v-divider class="mt-0 mb-4"></v-divider>
        <v-data-table
          :headers="bankDetailsHeaders"
          :items="bankDetails"
          class="elevation-1"
          hide-default-footer
        ></v-data-table>
      </template>
      <v-btn class="mt-3 primary text-center"
        ><v-icon>mdi-arrow-down-bold</v-icon>Download</v-btn
      >
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
