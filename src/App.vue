<script setup>

import { ref, onMounted } from 'vue';
import TopHeader from './components/TopHeader.vue'
import LocationService from './services/LocationService.js'

const count = ref(0)
const locations= ref(null)
const activelocation= ref(null)
const view = ref('list')
const blablaOpen = ref('false')
const isWelcome = ref('true')
const tags= ref(null)
const isv2= ref('false')

onMounted(() => {
  initLocations()  
})

function initLocations() {
      LocationService.getLocations() 
      .then((response) => {
        locations.value = response.data;
      })
      .catch((error) => {
        console.log(error)
      })
}
function getActivelocation(q) {
  LocationService.getLocation(q) 
  .then((response) => {
        activelocation.value = response.data
      }),
      isWelcome.value = false
}


function changeMapPosition(x,y){
      console.log('onscroll la map');

          let box = document.querySelector('#ixellesMap img');
          let boxInside = document.querySelector('#ixellesMap');
          let boxwidth = box.offsetWidth;
          let boxheight = box.offsetHeight;
          let decX = boxInside.offsetWidth/2;
          let decY = boxInside.offsetHeight/2;
          let posX = boxwidth*x/100 - decX;
          let posY = boxheight*y/100 - decY;
         document.getElementById('ixellesMap').scrollTo(posX, posY);
      
   
    }
</script>

<template>
  <div>
    <div :class="view == 'map' ? 'mapView' : 'listView'">
      <div id="grid">
        <ul></ul>
      </div>


    <div id="mainContent">
      <TopHeader />


      <div class="pageColumns">
        <div id="searchForm">
          <form method="GET" action="#">
            <input type="text" name="search" placeholder="find">
          </form>
        </div>

    
        <aside>
          <div id="switchView">

            <a @click="view = 'map'" class="actionMap">Map</a> 
            <a @click="view = 'list'" class="actionList">Liste</a>

          </div>
      
        
        <div id="ixellesMap">
            <div>
              <img src="https://iloveixelles.be/storage/image/map.svg" />
              <ul>
                  <li v-for="item in locations" :key="item.id" class="dot" :style="{ left: item.coordX + '%', top: item.coordY + '%' }">{{ item.coordX }} <span> 
                  <a @click="getActivelocation(item.id), changeMapPosition(item.coordX,item.coordY)">  {{ item.name }} </a></span></li>
                </ul>   
            </div>
          </div>
          <div id="filters" v-if="isv2">
            <ul>
              <li v-for="item in tags" :key="item.id" >{{ item.title }}</li>
            </ul>
          </div>
          <div id="locationsList">
            
            <ul>
              <li v-for="item in locations" :key="item.id"> <a @click="getActivelocation(item.id)"> {{ item.name }} </a>
              </li>
            </ul>
          </div>
        </aside>
       
        <main>
          <img v-if="isWelcome" src="https://iloveixelles.be/storage/image/coffee.gif" />

          <div v-else>
          <div class="text">
            <h2>{{ activelocation.name }}</h2>
           tags

          

          </div>


          <img v-if="activelocation.path" :src="'http://back.visitixelles.com/storage/'+activelocation.path" ><br />

          <div class="specialLink">
            <a @click="blablaOpen = !blablaOpen" class="blabla">+ de blaBla</a>

          </div>
          <div class="blablacontent" v-if="blablaOpen">
            <span class="close" @click="blablaOpen = false"></span>
            {{ activelocation.description }}
          </div>

        </div>

        </main>
      </div></div></div>
     
</div>

</template>

<style >* {
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
  font-family: 'Courier New', Courier, monospace;
  color: #000;
}

header {
  padding: 20px;
  position: fixed;
  background-color: rgb(249 54 16 / 89%);
  top: 0;
  width: 100%;
  z-index: 10;
}

header .instalink {
  float: right;
}

#grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

#grid ul {
  list-style: none;
}

#grid li:nth-child(even) {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 100vh;
  background-color: rgba(127, 255, 212, 0.5);
}

#grid li:nth-child(odd) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 1px;
  background-color: rgba(127, 255, 212, 0.5);
}

#mainContent {
  position: relative;
  z-index: 2;
}

aside {
  padding: 50px;
  padding-top: 100px;
  width: 50%;
  height: 100vh;
  overflow-y: scroll;
}

aside li {
  margin-bottom: 10px;
}

aside li.active a {
  background-color: #ffed51e3;
  text-decoration: none;
  padding: 4px;
}

main {
  background-color: #fff;
  width: 50%;
  overflow: hidden;
  display: flex;
  height: 100vh;
  position: relative;
  padding: 60px 0 0 0px;
  flex-direction: column;
  box-shadow: -3px 15px 19px #4b515f5c;
}

main .text {
  padding: 30px 0 0 30px;
}

main img {
  display: block;
  width: 100%;
}

.pageColumns {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  font-size: 13px;
  background-color: #d0ffff;
  margin: 3px;
  display: inline-block;
  text-decoration: none;
  padding: 2px 4px;
}

.tag.active {
  background-color: #89ffff;
}

#searchForm {
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: none
}

.allFilters {
  margin-bottom: 20px;
  margin-left: -10px;
}

#ixellesMap {
  position: absolute;
  width: 50vw;
  top: 60px;
  overflow: scroll;
  height: calc( 100vh - 60px);
}

#ixellesMap>div {
  display: block;
  width: 500%;
  position: relative;
}

#ixellesMap .dot {
  position: absolute;
  top: 0;
  list-style: none;
}

#ixellesMap .dot:before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: aquamarine;
  border-radius: 50%;
}

#ixellesMap>div img {
  width: 100%;
  display: block;
  opacity: 0.5;
}

aside {
  position: relative;
}

#switchView {
  position: absolute;
  bottom: 40px;
  right: 30px;
  z-index: 9;
}

#locationsList {
  position: absolute;
  left: 0;
  width: 50vw;
  padding: 0 50px;
}

.listView #ixellesMap {
  left: -50vw;
}

.listView #locationsList {
  left: 0
}

.mapView #ixellesMap {
  left: 0;
}

.mapView #locationsList {
  left: -50vw;
}

.specialLink {
  position: absolute;
  bottom: 3%;
  right: 3%;
  text-align: right;
}

.blablacontent {
  background-color: #fff;
  border: 1px solid grey;
  padding: 10px;
  position: absolute;
  bottom: 6%;
  right: 3%;
  max-width: 94%;
  min-width: 290px;
  min-height: 150px;
  box-shadow: 2px 2px 42px #eee;
  text-align: left;
}

#switchView .active,
.blabla.active {
  background-color: lightsalmon;
}

.close {
  position: absolute;
  right: 4px;
  top: -27px;
  width: 20px;
  height: 21px;
  opacity: 0.3;
  cursor: pointer;
}

.close:hover {
  opacity: 1;
}

.close:before,
.close:after {
  position: absolute;
  left: 10px;
  content: ' ';
  height: 20px;
  width: 2px;
  background-color: #333;
}

.close:before {
  transform: rotate(45deg);
}

.close:after {
  transform: rotate(-45deg);
}</style>
