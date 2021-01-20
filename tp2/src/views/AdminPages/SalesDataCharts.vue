<template>
  <v-container>
    <p></p>
    <h1>Sales</h1>
    <v-row justify="space-around">
      <v-col cols="12" md="4">
        <div class="graph-area">
          <h5>Sales by year</h5>
          <v-container class="horizontal_display">
            <v-text-field type="number" v-model="year" label="Year" ></v-text-field>
            <v-btn rounded color="red" dark @click="submitYear()" style="margin-bottom: 1%">Submit</v-btn>
          </v-container>

          <bar-chart :chart-data="datacollection" />
        </div>
        <div class="graph-area">
          <h5>Sales by month</h5>
          <v-container class="horizontal_display">
             <v-menu
              v-model="showMonth"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="year_month" v-bind="attrs"
                  v-on="on" label="Month" readonly ></v-text-field>
                  </template>
            <v-date-picker
              v-model="year_month"
              type="month"
              color="red"
              @input="showMonth=!showMonth"
            ></v-date-picker>
            </v-menu>
            
            
            <v-btn
              rounded
              color="red"
              dark
              @click="submitYearMonth()"
              style="margin-bottom: 1%"
            >Submit</v-btn>
          </v-container>

          <bar-chart :chart-data="datacollection_ym" />
        </div>

        <div class="graph-area">
          <h5>Between months</h5>
          <v-container class="horizontal_display">

            <v-menu
              v-model="showMonthv1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="betweenMonthPrev" v-bind="attrs"
                  v-on="on" label="Inicial Month" readonly ></v-text-field>
                  </template>
            <v-date-picker
              v-model="betweenMonthPrev"
              type="month"
              color="red"
              @input="showMonthv1=!showMonthv1"
            ></v-date-picker>
            </v-menu>

            <v-menu
              v-model="showMonthv2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="betweenMonthAfter" v-bind="attrs"
                  v-on="on" label="End Month" readonly ></v-text-field>
                  </template>
            <v-date-picker
              v-model="betweenMonthAfter"
              type="month"
              color="red"
              @input="showMonthv2=!showMonthv2"
            ></v-date-picker>
            </v-menu>

            <v-btn
              rounded
              color="red"
              dark
              @click="submitBetweenMonth()"
              style="margin-bottom: 1%"
            >Submit</v-btn>
          </v-container>
          <line-chart :chart-data="datacollection_between_m" />
        </div>
        <div class="graph-area">
          <v-container class="horizontal_display">

              <v-menu
              v-model="showDay"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="year_month_day" v-bind="attrs"
                  v-on="on" label="Year of results" readonly ></v-text-field>
                  </template>
            <v-date-picker
              v-model="year_month_day"
              color="red"
              @input="showDay=!showDay"
            ></v-date-picker>
            </v-menu>



            <v-btn
              rounded
              color="red"
              dark
              @click="submitYearMonthDay()"
              style="margin-bottom: 1%"
            >Submit</v-btn>
          </v-container>

          <bar-chart :chart-data="datacollection" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BarChart from "../../components/Charts/BarChart.js";
import LineChart from "../../components/Charts/LineChart.js";
export default {
  components: { BarChart, LineChart },
  data() {
    return {
      showDay:false,
      showMonth:false,
      showMonthv1:false,
      showMonthv2:false,
      year: "2021",
      year_month: "2021-01",
      year_month_day: "2021-01-16",
      datacollection: null,
      datacollection_ym: null,
      datacollection_between_m: null,
      loaded: false,
      chart_labels: [],
      chart_data: [],
      chart_labels_ym: [],
      chart_data_ym: [],
      chart_data_between_m: [],
      chart_labels_between_m: [],
      betweenMonthPrev: "2020-01",
      betweenMonthAfter: "2021-01",
      color: ["red", "blue"],
      charts_background: ["rgba(255,0,0,0.2)", "rgba(0,255,0,0.2)", "rgba(0,0,255,0.2)", "rgba(255,255,0,0.2)"],
      charts_line_color: ["rgba(255,0,0,1)", "rgba(0,255,0,1)", "rgba(0,0,255,1)", "rgba(255,255,0,1)"]
    };
  },
  mounted() {
    this.checkValidAccess();
    this.submitYear();
    this.submitYearMonth();
    this.submitBetweenMonth()
  },
  methods: {
    /**Data for yearly bar chart */
    submitYear() {
      this.chart_labels = [];
      this.chart_data = [];
      this.fetchChartDataYear(this.year);
    },
    fetchChartDataYear(year) {
      this.$axios
        .get("http://localhost:3000/api/tp2/purchase/count/byYear/" + year)
        .then((response) => {
          if (response.data.length === 0) {
            this.datacollection = {
              labels: [],
              datasets: [
                {
                  label: "Yearly purchases",
                  data: [],
                },
              ],
            };
          } else {
            response.data.forEach((element) => {
              this.chart_labels.push(this.changeLabelsToMonth(element.date));
              this.chart_data.push(element.count);
            });

            this.changeLabelsToMonth();

            this.datacollection = {
              labels: this.chart_labels,
              datasets: [
                {
                  label: "Yearly purchases",
                  backgroundColor: this.charts_background,
                  borderColor: this.charts_line_color,
                  pointBackgroundColor: "blue",
                  borderWidth: 1,
                  pointBorderColor: "blue",
                  data: this.chart_data,
                },
              ],
            };
          }

          this.loaded = true;
        })
        .catch((error) => console.log(error));
    },
    /**------------------------------------------- */

    /**Data for Year/Month bar chart */
    submitYearMonth() {
      var insertedDate = this.year_month.split("-");
      this.chart_labels_ym = [];
      this.chart_data_ym = [];
      this.fetchChartDataYearMonth(insertedDate);
    },
    fetchChartDataYearMonth(insertedDate) {
      this.$axios
        .get(
          `http://localhost:3000/api/tp2/purchase/count/byYearMonth/${insertedDate[0]},${insertedDate[1]}`
        )
        .then((response) => {
          if (response.data.length === 0) {
            this.datacollection_ym = {
              labels: [],
              datasets: [
                {
                  label: "Monthly purchases",
                  data: [],
                },
              ],
            };
          } else {
            response.data.forEach((element) => {
              this.chart_labels_ym.push(element.date);
              this.chart_data_ym.push(element.count);
            });

            this.datacollection_ym = {
              labels: this.chart_labels_ym,
              datasets: [
                {
                  label: "Monthly purchases",
                  backgroundColor: this.charts_background,
                  borderColor: this.charts_line_color,
                  pointBackgroundColor: "blue",
                  borderWidth: 1,
                  pointBorderColor: "blue",
                  data: this.chart_data_ym,
                },
              ],
            };
          }

          this.loaded = true;
        })
        .catch((error) => console.log(error));
    },
    /**------------------------------------------- */
    /** Fetch data to compare between months*/
    submitBetweenMonth() {
      var insertedDatePrev = this.betweenMonthPrev.split("-");
      var insertedDateAfter = this.betweenMonthAfter.split("-");

      var array_of_years = [insertedDatePrev[0], insertedDateAfter[0]];
      var array_of_months = [insertedDatePrev[1], insertedDateAfter[1]];

      (this.chart_data_between_m = []), (this.chart_labels_between_m = []);
      this.fetchDataBetweenMonth(array_of_years, array_of_months);
    },
    fetchDataBetweenMonth(array_of_years, array_of_months) {
      this.$axios
        .get(
          `http://localhost:3000/api/tp2/purchase/count/byBetweenMonths/${array_of_years[0]},${array_of_years[1]},${array_of_months[0]},${array_of_months[1]}`
        )
        .then((response) => {
          var j = 0
          if (response.data.length === 0) {
            this.datacollection_between_m = {
              labels: [],
              datasets: [
                {
                  label: "Monthly purchases",
                  data: [],
                },
              ],
            };
          } else {
            this.chart_labels_between_m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Dec']
            var auxDataset = []

            for(var i = parseInt(array_of_years[1]); i>= parseInt(array_of_years[0]); i--){
              var auxData = []
              var auxDatasetItem
              
              response.data.forEach((element) => {
                console.log(element.year, i)
                if(element.year === i){
                  auxData.push(element.count)
                }
              })
              auxDatasetItem = {
                  label: "Purchases of: " + i,
                  backgroundColor: "rgba(255,255,255,0)",
                  borderColor: this.charts_line_color[j],
                  pointBackgroundColor: this.charts_background[j],
                  borderWidth: 1,
                  pointBorderColor: this.charts_background[j],
                  data: auxData,
                },
              auxDataset.push(auxDatasetItem)
              j = j + 1
            }

            this.datacollection_between_m = {
              labels: this.chart_labels_between_m,
              datasets: auxDataset,
            };
          }

          this.loaded = true;
        })
        .catch((error) => console.log(error));
    },
    /**-------------------------------------------- */
    changeLabelsToMonth(month) {
      switch (month) {
        case 1:
          return "Jan";
          break;
        case 2:
          return "Feb";
          break;
        case 3:
          return "Mar";
          break;
        case 4:
          return "Apr";
          break;
        case 5:
          return "May";
          break;
        case 6:
          return "Jun";
          break;
        case 7:
          return "Jul";
          break;
        case 8:
          return "Aug";
          break;
        case 9:
          return "Sep";
          break;
        case 10:
          return "Oct";
          break;
        case 11:
          return "Nov";
          break;
        case 12:
          return "Dec";
          break;
      }
    },
    checkValidAccess(){
      if(!localStorage.getItem('user') || localStorage.getItem('user').idUserType === 1){
        this.$router.push( {path: '/' })
      }
    }
  },
};
</script>

<style scoped>
.graph-area {
  width: 33% !important;
  height: 150px !important;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  margin-bottom: 300px;
  padding: 2%;
}
.horizontal_display {
  width: 90%;
  display: flex;
  float: left;
}
.v-btn {
  margin-top: 0.7rem;
  margin-left: 0.1rem;
}

.col-12 {
  display: contents;
}
</style>