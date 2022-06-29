<template>
  <div id="app">
    <h1>USA State Map</h1>
    <div class="search">
      <input v-model="currentState" @input="handleInput" placeholder="Enter the state name"/>
      <ul class="search-result">
        <li v-for="state in matchedStates"
            :key="state.name"
            @click="handleClickState(state.name)">
           {{state.name}}
        </li>
      </ul>
    </div>
    <div class="map">
      <Map :city="currentState" />
    </div>
  </div>
</template>

<script>


import USAMap from '@/components/Map.vue';
import {SEARCH_STATES} from "@/queries";

export default {
  data: () => {
    return {
      currentState: '',
      matchedStates: []
    }
  },
  name: 'App',
  components: {
    Map: USAMap
  },
  methods: {
    handleClickState(state) {
      this.currentState = state;
      this.matchedStates = [];
    },
    handleInput(e) {
      let keyword = e.target.value;
      if (keyword.length === 0) {
        this.matchedStates = [];
        return;
      }
      this.$apollo.mutate({
        mutation: SEARCH_STATES,
        variables: {
          query: e.target.value
        }
      }).then(data => {
        this.matchedStates = data.data.states;
      })

    }
  }
}
</script>

<style>
.map {
  margin-top: 20px;
}
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search {
  position: relative;
}
#app input {
  padding: 10px;
  height: 30px;
}
.search-result {
  position: absolute;
  background-color: white;
  z-index: 1000;
  padding: 0;
  top: 40px;
  width: 100%;
  max-height: 500px;
  overflow: auto;
  list-style: none;
  box-shadow: 0 0 5px #333;
}
.search-result > li {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
.search-result > li:hover {
  background-color: #36a0ef;
}
</style>
