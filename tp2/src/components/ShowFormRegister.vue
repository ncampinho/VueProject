<template>
  <v-container>
    <h1>{{Text}}</h1>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="showData.showName"
        label="Show Name"
        outlined
        rounded
      ></v-text-field>
      <v-container class="combobox_container">
        <v-combobox
        v-model="selections.selectionLocation"
          :items="items.itemsLocation"
          label="Location"
          outlined
          rounded
        ></v-combobox>
        <v-combobox
        v-model="selections.selectionType"
          :items="items.itemsType"
          label="Type"
          outlined
          rounded
        ></v-combobox>
      </v-container>
      <v-container class="combobox_container">
        <v-combobox
        v-model="selections.selectionRating"
          :items="items.itemsRating"
          label="Rating"
          outlined
          rounded
        ></v-combobox>
        <v-combobox
        v-model="selections.selectionSpotlight"
          :items="items.itemsSpotlight"
          label="Is Spotlight?"
          outlined
          rounded
        ></v-combobox>
      </v-container>
      <v-container class="combobox_container">
        <v-text-field
          v-model="showData.price"
          label="Price"
          outlined
          rounded
        ></v-text-field>
        <v-text-field
          v-model="showData.availableTickets"
          label="Available Tickets"
          outlined
          rounded
        ></v-text-field>
      </v-container>
      <v-container class="combobox_container">
        
      <v-menu
        v-model="dateShow"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateForShow"
            label="Select a date for the show"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            outlined
            rounded
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateForShow" @input="dateShow = false"></v-date-picker>
      </v-menu>
        <v-text-field
          v-model="showData.showTime"
          label="Time of the show"
          hint="Format: HHhMM"
          outlined
          rounded
        ></v-text-field>
      </v-container>

      <v-menu
        v-model="datePurchase"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateForPurchase"
            label="Limit for purchase"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            outlined
            rounded
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateForPurchase" @input="datePurchase= false"></v-date-picker>
      </v-menu>
      <v-textarea
        v-model="showData.showDescription"
        outlined
        name="input-7-4"
        label="Show description"
      ></v-textarea>
      <v-file-input
        label="Add new image"
        outlined
        rounded
        prepend-icon="mdi-camera"
        v-model="showData.imageLocation"
      ></v-file-input>
    </v-form>
    <v-btn rounded color="primary" dark @click="submit()">Submit</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "ShowRegister",
  props: {
    Text: String,
  },
  data: () => ({
    showData: {
      showName: "",
      showDate: "",
      showDescription: "",
      availableTickets: null,
      price: null,
      idLocation: null,
      idShowType: null,
      idRating: 0,
      imageLocation: "",
      isSpotlight: 0,
      showTime: "",
    },
    items: {
      itemsLocation: [],
      itemsRating: [],
      itemsType: [],
      itemsSpotlight: ["Yes", "No"],
    },
    selections: {
      selectionLocation: [],
      selectionRating: [],
      selectionType: [],
      selectionSpotlight: [],
    },
    temp: null,
    dateForShow: new Date().toISOString().substr(0, 10),
    dateShow: false,
    dateForPurchase: new Date().toISOString().substr(0, 10),
    datePurchase: false,
    //Rules for each field of the form -> helps validate and warn the users input before submiting
    rules: {
      required: (value) => !!value || "Required",
    },
  }),

  //When component is mounted -> Fetches all zipcodes to insert into a combobox
  mounted() {
    this.getLocations();
    this.getShowTypes();
    this.getShowRatings();
  },
  methods: {
    getLocations() {
      this.$axios
        .get(`http://localhost:3000/api/tp2/locations`)
        .then((response) => {
          response.data.forEach((element) => {
            this.items.itemsLocation.push(element.building);
          });
        })
        .catch((error) => console.log(error));
    },
    getShowTypes() {
      this.$axios
        .get(`http://localhost:3000/api/tp2/types`)
        .then((response) => {
          response.data.forEach((element) => {
            this.items.itemsType.push(element.type);
          });
        })
        .catch((error) => console.log(error));
    },
    getShowRatings() {
      this.$axios
        .get(`http://localhost:3000/api/tp2/ratings`)
        .then((response) => {
          response.data.forEach((element) => {
            this.items.itemsRating.push(element.rating);
          });
        })
        .catch((error) => console.log(error));
    },
    submit() {
        this.getIdLocation()
        this.getIdRating()
        this.getIdType()
        
        setTimeout(() => this.createShow(), 1000);
        
    },
    getIdSpotlight(){
        return this.selections.selectionSpotlight === 'Yes' ?  1 :  0;
    },
    getIdRating(){
        var newRatingRequest = this.selections.selectionRating.replace('/', '%2F')
        console.log(newRatingRequest)

        this.$axios
        .get(`http://localhost:3000/api/tp2/rating/` + newRatingRequest)
        .then((response) => {
          response.data.forEach((element) => {
            this.showData.idRating =  element.idRating;
          });
        })
        .catch((error) => console.log(error));
    },
    getIdType() {
         this.$axios
        .get(`http://localhost:3000/api/tp2/type/` + this.selections.selectionType)
        .then((response) => {
          response.data.forEach((element) => {
            this.showData.idShowType = element.idShowType;
          });
        })
        .catch((error) => console.log(error));
    },
    getIdLocation(){
         this.$axios
        .get(`http://localhost:3000/api/tp2/location/` + this.selections.selectionLocation)
        .then((response) => {
          response.data.forEach((element) => {
         this.showData.idLocation = element.idLocation;
          });
        })
        .catch((error) => console.log(error));

    },
    createShow() {
        const requestBody = {
            showName:this.showData.showName,
            showDescription:this.showData.showDescription,
            price:this.showData.price,
            availableTickets:this.showData.availableTickets,
            idRating:this.showData.idRating,
            idShowType:this.showData.idShowType,
            idLocation: this.showData.idLocation,
            limitPurchaseDate:this.dateForPurchase,
            showDate:this.dateForShow,
            isSpotlight: this.getIdSpotlight(),
            image: this.showData.imageLocation.name,
            showTime: this.showData.showTime
        }

        console.log(requestBody)

        this.$axios.post('http://localhost:3000/api/tp2/show/new_show', requestBody)
        .then((response) => response)
        .catch((error) => console.log(error));

    }
  },
};
</script>

<style scoped>
.container {
  padding: 0px;
  width: 45%;
}

.combobox_container {
  width: 100%;
  display: flex;
}

.combobox_container > .v-input:nth-child(1n) {
  padding: 0 0px;
  margin-right: 5px !important;
  width: 50% !important;
}

.combobox_container > .v-input:nth-child(2n) {
  padding: 0 0px;
  margin-left: 10px !important;
  width: 50% !important;
}

.container > h1 {
  margin-bottom: 15px;
}
</style>