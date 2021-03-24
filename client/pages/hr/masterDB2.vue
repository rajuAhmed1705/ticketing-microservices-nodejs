<template>
  <div>
    <template>
      <v-data-table :headers="headers" :items="allEmployees" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="d-flex align-center">
              <v-icon color="teal darken-2">mdi-database</v-icon> Master
              Database</v-toolbar-title
            >
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Employee
                </v-btn>
              </template>
              <v-card>
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn dark text @click="dialog = false">
                      Save
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <v-container>
                    <v-card>
                      <v-tabs v-model="tab" background-color="cyan" glow>
                        <v-tab key="personal">
                          Personal Details
                        </v-tab>
                        <v-tab key="employee">
                          Employee Information
                        </v-tab>
                        <!-- <v-tab key="contacts">
                          Contacts
                        </v-tab> -->
                        <v-tab key="bank">
                          Bank Details
                        </v-tab> 
                        <v-tab key="education">
                          Education Details
                        </v-tab> 
                        <v-tab key="work">
                          Work Experiences
                        </v-tab> 
                        <v-tab key="training">
                          Training Details
                        </v-tab>
                        <v-tab key="skills">
                          Skills
                        </v-tab> 
                      </v-tabs>
                      <v-tabs-items v-model="tab">
                        <v-tab-item key="personal">
                          <v-card-text>
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.personalDetails.fullName"
                                  label="Full Name"
                                  :rules="rules.stringRule"
                                  required
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="
                                    employee.personalDetails.preferredNickName
                                  "
                                  label="Preferred Nickname"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                            
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                  v-model="
                                    employee.personalDetails.personalEmail
                                  "
                                  label="Personal Email"
                                  :rules="rules.emailRules"
                                  required
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                  v-model="
                                    employee.personalDetails.personalNumber
                                  "
                                  label="Personal Number"
                                  
                                  type="number"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.personalDetails.fathersName"
                                  label="Father's Name"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="
                                    employee.personalDetails.fathersProfession
                                  "
                                  label="Father's Profession"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.personalDetails.mothersName"
                                  label="Mother's Name"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="
                                    employee.personalDetails.mothersProfession
                                  "
                                  label="Mother's Profession"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-select
                                  :items="maritalItems"
                                  dense
                                  outlined
                                  v-model="
                                    employee.personalDetails.matitalStatus
                                  "
                                  label="Marital Status"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.personalDetails.spouseName"
                                  label="Spouse Name"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              
                              <v-col cols="12" sm="6" md="6">
                                <v-menu
                                  v-model="employeeBirthDay"
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                  offset-y
                                  max-width="290px"
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="
                                        employee.personalDetails.dateOfBirth
                                      "
                                      label="Date of Birth"
                                      readonly
                                      v-on="on"
                                      prepend-inner-icon="mdi-calendar"
                                      outlined
                                      dense
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="
                                      employee.personalDetails.dateOfBirth
                                    "
                                    no-title
                                    @input="employeeBirthDay = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-select
                                  v-model="
                                    employee.personalDetails.numberOfDependents
                                  "
                                  label="Number of Dependents"
                                  :items="depedentNumber"
                                  dense
                                  outlined
                                ></v-select>
                              </v-col>
                                 <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.personalDetails.nid"
                                  label="NID"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.personalDetails.passport"
                                  label="Passport No."
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.personalDetails.gender"
                                  label="Gender"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.personalDetails.religion"
                                  label="Religion"
                                  dense
                                  outlined
                                ></v-text-field> 
                              </v-col> 
                               <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.personalDetails.nationality"
                                  label="Nationality"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.personalDetails.bloodGroup"
                                  label="Blood Group"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-tab-item>
                        <v-tab-item key="employee">
                          <v-card-text>
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="
                                    employee.employeeInformation.employeeId
                                  "
                                  label="Employee ID"
                                  :rules="rules.stringRule"
                                  required
                                  
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                               <!-- <v-col cols="12" sm="6" md="6">
                                <v-menu
                                  v-model="dateOfJoining"
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                  offset-y
                                  max-width="290px"
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="
                                        employee.employeeInformation.dateOfJoin
                                      "
                                      label="Joining Date"
                                      readonly
                                      v-on="on"
                                      prepend-inner-icon="mdi-calendar"
                                      outlined
                                      dense
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="
                                      employee.employeeInformation.dateOfJoin
                                    "
                                    no-title
                                    @input="dateOfJoining = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="
                                    employee.employeeInformation.department
                                  "
                                  label="Department"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col> -->
                              <!-- <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="
                                    employee.employeeInformation.designation
                                  "
                                  label="Designation"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.employeeInformation.unit"
                                  label="Unit"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.employeeInformation.team"
                                  label="Team"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="
                                    employee.employeeInformation.employmentType
                                  "
                                  label="Employment Type"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.employeeInformation.project"
                                  label="Project"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col> -->
                              <!-- <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="
                                    employee.employeeInformation.reportingTo
                                  "
                                  label="Reporting To"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col> -->
                              <!-- <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="
                                    employee.employeeInformation.jobLocation
                                  "
                                  label="Job Location"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col> 
                               <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="
                                    employee.employeeInformation.turnover
                                  "
                                  label="Turnover Type"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col> 
                               <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="
                                    employee.employeeInformation.salaryGrade
                                  "
                                  label="Salary Grade"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col> 
                               <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="
                                    employee.employeeInformation.separation
                                  "
                                  label="Separation"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col> 
                               <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="
                                    employee.employeeInformation.employeeStatus
                                  "
                                  label="Employee Status"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col> 
                               <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="
                                    employee.employeeInformation.confirmationRule
                                  "
                                  label="Confirmation Rule"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>  -->
                            </v-row>
                          </v-card-text>
                        </v-tab-item>
                        <!-- <v-tab-item key="contacts">
                          <v-card-text>
                            <v-row> -->
                              <!-- <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.contacts.personalNumber"
                                  label="Personal Number"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col> -->
                              <!-- <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.contacts.emergencyContact"
                                  label="Emergency Contact"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                  v-model="employee.contacts.email"
                                  :rules="rules.emailRules"
                                  label="Email"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="6" md="6">
                                <template outline>
                                  <v-card-subtitle
                                    v-text="'Present Address:'"
                                    class="font-weight-medium"
                                  >
                                  </v-card-subtitle>
                                  <v-card-text>
                                    <v-col cols="12" sm="12" md="12">
                                      <v-text-field
                                        v-model="
                                          employee.contacts.presentAddress
                                            .houseNumber
                                        "
                                        label="House Number"
                                        dense
                                        outlined
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                      <v-text-field
                                        v-model="
                                          employee.contacts.presentAddress
                                            .village
                                        "
                                        label="Village"
                                        dense
                                        outlined
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                      <v-text-field
                                        v-model="
                                          employee.contacts.presentAddress
                                            .postOffice
                                        "
                                        label="Post Office"
                                        dense
                                        outlined
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                      <v-text-field
                                        v-model="
                                          employee.contacts.presentAddress
                                            .upozilla
                                        "
                                        label="Upozilla"
                                        dense
                                        outlined
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                      <v-text-field
                                        v-model="
                                          employee.contacts.presentAddress
                                            .district
                                        "
                                        label="District"
                                        dense
                                        outlined
                                      ></v-text-field>
                                    </v-col>
                                  </v-card-text>
                                </template>
                              </v-col>
                              <v-col cols="6" sm="6" md="6">
                                <template outline>
                                  <v-card-subtitle
                                    v-text="'Permanent Adress:'"
                                    class="font-weight-medium"
                                  >
                                  </v-card-subtitle>
                                  <v-card-text>
                                    <v-col cols="12" sm="12" md="12">
                                      <v-text-field
                                        v-model="
                                          employee.contacts.permanentAddress
                                            .houseNumber
                                        "
                                        label="House Number"
                                        dense
                                        outlined
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                      <v-text-field
                                        v-model="
                                          employee.contacts.permanentAddress
                                            .village
                                        "
                                        label="Village"
                                        dense
                                        outlined
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                      <v-text-field
                                        v-model="
                                          employee.contacts.permanentAddress
                                            .postOffice
                                        "
                                        label="Post Office"
                                        dense
                                        outlined
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                      <v-text-field
                                        v-model="
                                          employee.contacts.permanentAddress
                                            .upozilla
                                        "
                                        label="Upozilla"
                                        dense
                                        outlined
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                      <v-text-field
                                        v-model="
                                          employee.contacts.permanentAddress
                                            .district
                                        "
                                        label="District"
                                        dense
                                        outlined
                                      ></v-text-field>
                                    </v-col>
                                  </v-card-text>
                                </template>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-tab-item>
                         -->

                       <v-tab-item key="bank">
                          <v-card-text
                            v-for="(bank, k) in employee.bankDetails"
                            :key="k"
                          >
                            <v-card-actions>
                              <v-row class="justify-start align-start">
                                <v-col cols="6" sm="3" md="3" >
                                  <v-card-subtitle
                                    v-text="`Bank Details ${k + 1}`"
                                    class="font-weight-bold mb-0 pb-0 pl-0"
                                  >

                               </v-card-subtitle>
               
                                </v-col>
                                
                                <v-col
                                  cols="12"
                                  sm="6"
                                  md="6"
                                  class="d-flex align-end justify-end"
                                >
                                  <!-- <v-icon
                                    small
                                    @click="removeBankField(k)"
                                    v-show="employee.bankDetails.length > 1"
                                    color="error"
                                  >
                                    mdi-delete
                                  </v-icon> -->
                                </v-col>
                              </v-row>
                            </v-card-actions>

                            <v-divider class="mt-0 mb-4"></v-divider>

                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.bankDetails.accountName"
                                  label="Account Name"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.bankDetails.accountNumber"
                                  label="Account Number"
                                  dense
                                  outlined
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.bankDetails.bankName"
                                  label="Bank Name"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.bankDetails.branchName"
                                  label="Branch Name"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.bankDetails.address"
                                  label="Address"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.bankDetails.accountType"
                                  label="Account Type"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="employee.bankDetails.purposeOfUse"
                                  label="Purpose of Use"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <!-- <v-btn
                              color="blue darken-1"
                              @click="
                                addBankField(employee.bankDetails)
                              "
                              v-show="employee.bankDetails.length < 10"
                            >
                              Add More
                            </v-btn> -->
                          </v-card-actions>
                        </v-tab-item> 

                        <v-tab-item key="education">
                          <v-card-text
                            v-for="(educationDetail,
                            k) in employee.educationDetails"
                            :key="k"
                          >
                            <v-card-actions>
                              <v-row>
                                <v-col cols="12" sm="6" md="6" class="pl-1">
                                  <v-card-subtitle
                                    v-text="`Academic ${k + 1}`"
                                    class="font-weight-bold mb-0 pb-0 pl-0"
                                  >
                                  </v-card-subtitle>
                                </v-col>
                                <v-col
                                  cols="12"
                                  sm="6"
                                  md="6"
                                  class="d-flex align-end justify-end"
                                >
                                  <!-- <v-icon
                                    small
                                    @click="removeEducationField(k)"
                                    v-show="
                                      employee.educationDetails.length > 1
                                    "
                                    color="error"
                                  >
                                    mdi-delete
                                  </v-icon> -->
                                </v-col>
                               </v-row>
                            </v-card-actions>

                            <v-divider class="mt-0 mb-4"></v-divider>
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="
                                    educationDetail.professionalQualification
                                  "
                                  label="Professional Qualification"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="educationDetail.degree"
                                  label="Degree"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="educationDetail.faculty"
                                  label="Faculty"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="educationDetail.institution"
                                  label="Institution"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                               
                                <v-menu
                                  v-model="passingYear[k]"
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                  offset-y
                                  max-width="290px"
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="educationDetail.passingYear"
                                      label="Passing Year"
                                      readonly
                                      v-on="on"
                                      prepend-inner-icon="mdi-calendar"
                                      outlined
                                      dense
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="educationDetail.passingYear"
                                    no-title
                                    type="year"
                                    @input="passingYear[k] = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="educationDetail.cgpa"
                                  label="CGPA/Grade"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <!-- <v-btn
                              color="blue darken-1"
                              @click="
                                addEducationField(employee.educationDetails)
                              "
                              v-show="employee.educationDetails.length < 10"
                            >
                              Add More
                            </v-btn> -->
                          </v-card-actions>
                        </v-tab-item> 
                       <v-tab-item key="work">
                          <v-card-text
                            v-for="(workExperience,
                            k) in employee.workExperiences"
                            :key="k"
                          >
                            <v-card-actions>
                              <v-row>
                                <v-col cols="12" sm="6" md="6" class="pl-1">
                                  <v-card-subtitle
                                    v-text="`Work Experience ${k + 1}`"
                                    class="font-weight-bold mb-0 pb-0 pl-0"
                                  >
                                  </v-card-subtitle>
                                </v-col>
                                <v-col
                                  cols="12"
                                  sm="6"
                                  md="6"
                                  class="d-flex align-end justify-end"
                                >
                                  <!-- <v-icon
                                    small
                                    @click="removeWorkField(k)"
                                    v-show="employee.workExperiences.length > 1"
                                    color="error"
                                  >
                                    mdi-delete
                                  </v-icon> -->
                                </v-col>
                              </v-row>
                            </v-card-actions>
                            <v-divider class="mt-0 mb-4"></v-divider>
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="workExperience.companyName"
                                  label="Company Name"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="workExperience.designation"
                                  label="Designation"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="workExperience.department"
                                  label="Department"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="workExperience.duration"
                                  label="Duration"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="workExperience.supervisorName"
                                  label="Supervisor's Name"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="workExperience.supervisorContact"
                                  label="Supervisor's Contact"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <!-- <v-btn
                              color="blue darken-1"
                              @click="addWorkField(employee.workExperiences)"
                              v-show="employee.workExperiences.length < 10"
                            >
                              Add More
                            </v-btn> -->
                          </v-card-actions>
                        </v-tab-item> 
                        <v-tab-item key="trainig">
                          <v-card-text
                            v-for="(training, k) in employee.trainingDetails"
                            :key="k"
                          >
                            <v-card-actions>
                              <v-row>
                                <v-col cols="12" sm="6" md="6" class="pl-1">
                                  <v-card-subtitle
                                    v-text="`Training ${k + 1}`"
                                    class="font-weight-bold mb-0 pb-0 pl-0"
                                  >
                                  </v-card-subtitle>
                                </v-col>
                                <v-col
                                  cols="12"
                                  sm="6"
                                  md="6"
                                  class="d-flex align-end justify-end"
                                >
                                  <!-- <v-icon
                                    small
                                    @click="removeTrainingField(k)"
                                    v-show="employee.trainingDetails.length > 1"
                                    color="error"
                                  >
                                    mdi-delete
                                  </v-icon> -->
                                </v-col>
                              </v-row>
                            </v-card-actions>

                            <v-divider class="mt-0 mb-4"></v-divider>

                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="training.certificationName"
                                  label="Certification Name"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="training.duration"
                                  label="Duration"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="training.learning"
                                  label="Learning"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="training.institution"
                                  label="Institution"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <!-- <v-btn
                              color="blue darken-1"
                              @click="
                                addTrainingField(employee.trainingDetails)
                              "
                              v-show="employee.trainingDetails.length < 10"
                            >
                              Add More
                            </v-btn> -->
                          </v-card-actions>
                        </v-tab-item>
                        <v-tab-item key="skills">
                          <v-card-text
                            v-for="(skill, k) in employee.skills"
                            :key="k"
                          >
                            <v-card-actions>
                              <v-row>
                                <v-col cols="12" sm="6" md="6" class="pl-1">
                                  <v-card-subtitle
                                    v-text="`Skill ${k + 1}`"
                                    class="font-weight-bold mb-0 pb-0 pl-0"
                                  >
                                  </v-card-subtitle>
                                </v-col> 
                                <v-col
                                  cols="12"
                                  sm="6"
                                  md="6"
                                  class="d-flex align-end justify-end"
                                >
                                  <!-- <v-icon
                                    small
                                    @click="removeSkillField(k)"
                                    v-show="employee.skills.length > 1"
                                    color="error"
                                  >
                                    mdi-delete
                                  </v-icon> -->
                                </v-col>
                               </v-row>
                            </v-card-actions>

                            <v-divider class="mt-0 mb-4"></v-divider>
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="skill.functionalCompetency"
                                  label="Functional Competency"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="skill.language"
                                  label="Language"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="skill.computerSkill"
                                  label="Computer Skills"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="skill.skillsoftCompetency"
                                  label="Soft Competency"
                                  dense
                                  outlined
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <!-- <v-btn
                              color="blue darken-1"
                              @click="addSkillField(employee.skills)"
                              v-show="employee.skills.length <10"
                            >
                              Add More
                            </v-btn> -->
                          </v-card-actions>
                        </v-tab-item> 
                      </v-tabs-items>
                    </v-card>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="saveEmployeeData()">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteEmployeeData(employee.id)"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small color="warning" class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon
            small
            color="red"
            @click="deleteItem (item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:[`item.personalDetails.fullName`]="{ item }">
          <nuxt-link to="/hr/profile/_id">{{
            item.personalDetails.fullName
          }}</nuxt-link>
        </template>
        <template>
          <div></div>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </template>
  </div>
</template>
<script>
import { mapActions,mapGetters } from "vuex";
export default {
  data: () => ({
    
    employeeBirthDay: false,
    dateOfJoining: false,
    passingYear: [false],
    tab: null,
    employee: {
      personalDetails: {
        fullName: "",
        preferredNickName: "",
        personalEmail:"",
        personalNumber:"",
        fathersName: "",
        fathersProfession: "",
        mothersName: "",
        mothersProfession: "",
        matitalStatus: "",
        spouseName: "",
        dateOfBirth: "",
        numberOfDependents: "",
        nid:"",
        passport:"",
        gender:"",
        religion:"",
        nationality:"",
        bloodGroup:""
      },
      employeeInformation: {
        employeeId: "",
        // department: "",
        // designation: "",
        // unit: "",
        // team: "",
        // employmentType: "",
        // project: "",
        dateOfJoin: "",
        // reportingTo: "",
        // jobLocation: "",
        // turnover: "",
        // salaryGrade:"",
        // separation:"",
        // employeeStatus:"",
        // confirmationRule:""
      },
      bankDetails: [{
        accountName: "",
        accountNumber: "",
        bankName: "",
        branchName: "",
        address: "",
        accountType: "",
        purposeOfUse: ""
      }],
      educationDetails: [
        {
          professionalQualification: "",
          degree: "",
          faculty: "",
          institution: "",
          passingYear: "",
          cgpa: ""
        }
      ],
      // contacts: {
      //   // personalNumber: "",
      //   emergencyContact: "",
      //   email: "",
      //   presentAddress: {
      //     houseNumber: "",
      //     village: "",
      //     postOffice: "",
      //     upozilla: "",
      //     district: ""
      //   },
      //   permanentAddress: {
      //     houseNumber: "",
      //     village: "",
      //     postOffice: "",
      //     upozilla: "",
      //     district: ""
      //   }
      // },
      workExperiences: [
        {
          companyName: "",
          designation: "",
          department: "",
          duration: "",
          supervisorName: "",
          supervisorContact: ""
        }
      ],
      trainingDetails: [
        {
          certificationName: "",
          duration: "",
          learning: "",
          institution: ""
        }
      ],
      skills: [
        {
          functionalCompetency: "",
          language: "",
          computerSkill: "",
          softCompetency: ""
        }
      ],

      NID: "",
      Passport: "",
      birthCertificate: "",
      gender: "",
      religion: "",
      nationality: "",
      bloodGroup: ""
    },
    defaultEmployee: {
      personalDetails: {
        fullName: "",
        preferredNickName: "",
        personalEmail:"",
        personalNumber:"",
        fathersName: "",
        fathersProfession: "",
        mothersName: "",
        mothersProfession: "",
        matitalStatus: "",
        spouseName: "",
        dateOfBirth: "",
        numberOfDependents: ""
      },
      employeeInformation: {
        employeeId: "",
        // department: "",
        // designation: "",
        // team: "",
        // employmentType: "",
        // project: "",
        dateOfJoin: "",
        // reportingTo: "",
        // jobLocation: "",
        // turnover: "",
        // salaryGrade:"",
        // separation:"",
        // employeeStatus:"",
        // confirmationRule:""
      },
      bankDetails:[ {
        accountName: "",
        accountNumber: "",
        bankName: "",
        branchName: "",
        address: "",
        accountType: "",
        purposeOfUse: ""
      }],
      educationDetails: [
        {
          professionalQualification: "",
          degree: "",
          faculty: "",
          institution: "",
          passingYear: "",
          cgpa: ""
        }
      ],
      // contacts: {
      //   // personalNumber: "",
      //   emergencyContact: "",
      //   email: "",
      //   presentAddress: {
      //     houseNumber: "",
      //     village: "",
      //     postOffice: "",
      //     upozilla: "",
      //     district: ""
      //   },
      //   permanentAddress: {
      //     houseNumber: "",
      //     village: "",
      //     postOffice: "",
      //     upozilla: "",
      //     district: ""
      //   }
      // },
      workExperiences: [
        {
          companyName: "",
          designation: "",
          department: "",
          duration: "",
          supervisorName: "",
          supervisorContact: ""
        }
      ],
      trainingDetails: [
        {
          certificationName: "",
          duration: "",
          learning: "",
          institution: ""
        }
      ],
      skills: [
        {
          functionalCompetency: "",
          language: "",
          computerSkill: "",
          softCompetency: ""
        }
      ],

      NID: "",
      Passport: "",
      birthCertificate: "",
      gender: "",
      religion: "",
      nationality: "",
      bloodGroup: ""
    },
    maritalItems: ["single", "married", "devorced"],
    depedentNumber: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    // required(propertyType){
    //   return
    // },
    rules: {
      stringRule: [v => !!v || "This field is required"],
      emailRules: [v => /.+@.+/.test(v) || "E-mail must be valid"],
      // numberRules: [v => /[0-9]/ || "Field must be a number"]
    },

    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "EmpID",
        align: "start",
        value: "employeeInformation.employeeId"
      },
      {
        text: "Name",
        sortable: false,
        value: "personalDetails.fullName"
      },
      {
        text: "Department",
        value: "employeeInformation.department"
      },
      {
        text: "Designation",
        value: "employeeInformation.designation"
      },
      {
        text: "Unit",
        value: "employeeInformation.unit"
      },
      {
        text: "Team",
        value: "employeeInformation.team"
      },
      {
        text: "Type",
        value: "employeeInformation.employmentType.name"
      },
      {
        text: "Project",
        value: "employeeInformation.project[0].name"
      },
      {
        text: "DOJ",
        value: "employeeInformation.dateOfJoin"
      },
      {
        text: "Reporting",
        value: "employeeInformation.reportingTo.personalDetails.fullName"
      },
      {
        text: "Job Location",
        value: "employeeInformation.jobLocation.name"
      },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedIndex: -1
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  async created() {
    this.initialize();
    await this.fetchEmployee()
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Employee" : "Edit Employee Info";
    },
    ...mapGetters({
      allEmployees:"employees"
    })
  },
  beforeMounted() {
    this.$store.dispatch("loadEmployee");
  },

  methods: {
    ...mapActions({fetchEmployee:"loadEmployee",
                   addEmployee:"addEmployee",
                   removeEmployee:"removeEmployee",
                   updateEmployee:"updateEmployee"}),
    saveEmployeeData() {
      // console.log("employee from masterDB",this.employee);
      if (this.editedIndex > -1) {
        this.updateEmployee(this.employee)
      } else {
      this.addEmployee(this.employee);
      // this.$notifier.showMessage({ content: "Congrats!Successfully added one value!", color: "success" });
      this.employee = Object.assign({}, this.defaultEmployee);
      }
      this.close();
    },
    deleteEmployeeData(id) {
      this.removeEmployee(id);
      // console.log("deleted employee:",this.employee)
      this.closeDelete()
    },
    addEducationField(education) {
      return (
        this.employee.educationDetails.push({ education }) &&
        this.passingYear.push(false)
      );
    },
    removeEducationField(index) {
      return (
        this.employee.educationDetails.splice(index, 1) &&
        this.passingYear.splice(index, 1)
      );
    },
    addBankField(bank) {
      return this.employee.bankDetails.push({ bank });
    },
    removeBankField(index) {
      return this.employee.bankDetails.splice(index, 1);
    },
    addWorkField(work) {
      return this.employee.workExperiences.push({ work });
    },
    removeWorkField(index) {
      return this.employee.workExperiences.splice(index, 1);
    },
    addTrainingField(training) {
      return this.employee.trainingDetails.push({ training });
    },
    removeTrainingField(index) {
      return this.employee.trainingDetails.splice(index, 1);
    },
    addSkillField(skill) {
      return this.employee.skills.push({ skill });
    },
    removeSkillField(index) {
      return this.employee.skills.splice(index, 1);
    },

    initialize() {
      // console.log("Emplaoyee")
       this.$store.getters["employees"]
    },

    editItem(item) {
      this.editedIndex = this.allEmployees.indexOf(item);
      this.employee = Object.assign({}, item);
      this.dialog = true;
      // this.updateEmployee(item)
    },

    deleteItem(item) {
      this.editedIndex = this.allEmployees.indexOf(item);
      this.employee = Object.assign({}, item)
      this.dialogDelete = true;
      // this.removeEmployee(item.id)
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.employee = Object.assign({}, this.defaultEmployee);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.employee = Object.assign({}, this.defaultEmployee);
        this.editedIndex = -1;
      });
    },

    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.editedItem);
    //   } else {
    //     this.desserts.push(this.editedItem);
    //   }
    //   this.close();
    // }
  }
};
</script>
<style></style>
