<template>
  <div class="card">
    <div class="row1">
      <div class="col-6">
        <v-icon>{{ icon }}</v-icon>
      </div>
      <div class="col-6">
        <form action="">
          <select id="periode">
            <option value="0">This week</option>
            <option value="1">This month</option>
            <option value="2">This year</option>
          </select>
        </form>
      </div>
    </div>
    <div class="row2">
      <div class="inf" v-for="(element, index) in elements" :key="index">
        <div>
          <p>{{ element.title }}</p>
          <p>{{ element.inf }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoCard",
  props: ["elements", "icon"],
  data() {
    return {
      //
    }
  },
};
</script>

<style scoped>
.card {
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.row1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 1.5em 0;
}
.row1 div:nth-child(2){
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

select {
  border: none;
  font-size: 15px;
  color: #8B8D97;
}

.row2 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  justify-content: space-between;
}

.inf {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-right: 2em;
  width: 50%;
}

.inf p {
  margin: 1px;
  font-size: 15px;
  font-weight: 400;
  color: #8B8D97;
}

.inf p:nth-child(2) {
  font-size: 20px;
  font-weight: 700;
  color: #000000;
}
</style>
