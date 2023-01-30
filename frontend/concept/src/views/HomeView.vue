<template>
  <div class="flexed-page">
    <div class="slider-container">
      <AppSlideBar />
    </div>
    <div class="main-content">
      <AppNavBar title="Dashboard" />
      <div class="grid-page">
        <v-card class="fifty-grid1 rounded-lg" flat>
          <InfoCard :icon="salesIcon" :elements="salesInfo"></InfoCard>
        </v-card>
        <v-card class="fifty-grid2 rounded-lg" flat>
          <InfoCard :icon="costumerIcon" :elements="costumersInfo"></InfoCard>
        </v-card>
        <v-card class="stats1 rounded-lg" flat>
          <canvas id="myChart"></canvas>
        </v-card>
        <v-card class="endcard rounded-lg" flat>
          <InfoCard :icon="baughtIcon" :elements="boughtInfo"></InfoCard>
        </v-card>
        <v-card class="stats2 rounded-lg" flat>
          <canvas id="myChart2"></canvas>
        </v-card>
        <v-card class="endcard rounded-lg" flat>
          <InfoCard :icon="vendorIcon" :elements="vendorsInfo"></InfoCard>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
import AppSlideBar from "../components/AppSlideBar";
import AppNavBar from "../components/AppNavBar";
import InfoCard from "../components/InfoCard.vue";
import Chart from 'chart.js/auto';


export default {
  components: {
    AppSlideBar,
    AppNavBar,
    InfoCard,
  },
  data() {
    return {
      salesInfo: [
        {
          title: "Solde Products",
          inf: "1.000.000",
        },
        {
          title: "Best Selling",
          inf: "1.000.000",
        },
        
      ],
      salesIcon: "mdi-shopping-outline",
      costumersInfo: [
        {
          title: " Costumers",
          inf: "1",
        },
        {
          title: "Best Costumers",
          inf: "1",
        },
      ],
      costumerIcon: "mdi-account-outline",
      boughtInfo: [
        {
          title: "Bought Products",
          inf: "1.000.000",
        },
        {
          title: "Best Selling",
          inf: "1.000.000",
        },
      ],
      baughtIcon: "mdi-chart-donut",
      vendorsInfo: [
        {
          title: "Vendors",
          inf: "1.000.000",
        },
        {
          title: "Best Selling",
          inf: "1.000.000",
        },
      ],
      vendorIcon: "mdi-account-outline",
    }
  },
  mounted () {
  this.chart1();
  this.chart2(); 
  },
  
  methods: {
    chart1(){
      console.log('hhhhhh');

const ctx = document.getElementById('myChart');

const myChart =  new Chart(ctx, {
type: 'bar',
data: {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [{
    label: '# of Client',
    data: [12, 19, 3, 5, 2, 3],
    borderWidth: 1
  }]
},
options: {
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
});
},
  chart2(){
    const ctx2 = document.getElementById('myChart2');

const myChart2 =  new Chart(ctx2, {
  type: 'line',
  data: {
    labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'May', 'Juin','Julliet','Aout','Septembre','Octobre','Novembre','Decembre'],
    datasets: [{
      label: '# of Sales',
      data: [12, 19, 3, 5, 2, 3,6,15,6,4,14],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
  }
  }
}
</script>

<style scoped>
.flexed-page {
  height: 100%;
  display: flex;
}

.slider-container {
  height: 100%;
}

.grid-page {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  margin: 10px;
}

.fifty-grid1 {
  grid-column: 1 / 4;
}

.fifty-grid2 {
  grid-column: 4 / 7;
}

.stats1 {
  grid-column: 1 / 5;
  grid-row: 2 / 4;
}

.stats2 {
  grid-column: 1 / 5;
  grid-row: 4 / 6;
}

.endcard {
  grid-column: 5 / 7;
}

.main-content {
  width: 100%;
  height: 100%;
}

.stats1,
.stats2 {
  display: flex;
  justify-content: center;

}
</style>
