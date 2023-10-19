<template>

  <v-app>
    <v-app-bar style=" margin:10px;width: 99%" rounded>
      <v-row>
        <v-col
            cols="12"
            sm="6"
            md="1">
          <h2 class="ml-5">teamteam</h2>
        </v-col>
        <v-col
            cols="12"
            sm="6"
            md="2">
        </v-col>
        <v-col
            cols="12"
            sm="6"
            md="1">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                  append-icon="mdi-chevron-down"
                  v-bind="props"
              >
                Водителям
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                  v-for="(item, index) in listOfMenuPass"
                  :key="index"
                  :value="index"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col
            cols="12"
            sm="6"
            md="1">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                  append-icon="mdi-chevron-down"
                  v-bind="props"
              >
                Пользователям
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                  v-for="(item, index) in listOfMenuPass"
                  :key="index"
                  :value="index"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col
            cols="12"
            sm="6"
            md="6">
        </v-col>
        <v-col
            cols="12"
            sm="6"
            md="1">
          <v-btn
              prepend-icon="mdi-account"
              class="mr-4"
              @click="dialogAuth=true">Войти
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-app-bar v-if="orderForm" style="margin-left: 10px;margin-top: 50px; width: 470px;height:405px" rounded>
      <v-card
          style="margin-top: 330px"
          width="470"
          height="420"
          class="pa-0">
        <v-card-title>

        </v-card-title>
        <v-card-text>
          <v-autocomplete
              label="Откуда"
              v-model="fromOrder"

              :items="fromOrderItems"
              variant="solo"
              rounded>
          </v-autocomplete>
          <v-autocomplete
              label="Куда?"
              v-model="toOrder"
              :items="toOrderItems"
              variant="solo"
              rounded>
          </v-autocomplete>
          <v-slide-group
              v-model="selectedCarClass"
              class="pa-4"
              selected-class="bg-blue-grey-lighten-5"
              mandatory
              show-arrows
          >
            <v-slide-group-item
                v-for="n in 4"
                :key="n"
                v-slot="{ isSelected, toggle, selectedClass }"
            >
              <v-card
                  color="white-lighten-1"
                  :class="['ma-1', selectedClass]"
                  height="128"
                  width="92"
                  @click="toggle"
              >
                <v-card-title>
                  <v-img :height="50" :width="300" :src=urlToImagesTaxi[n-1]></v-img>
                </v-card-title>
                <v-card-subtitle class="text-sm">
                  {{ namesOfClassCar[n - 1] }}
                </v-card-subtitle>
                <v-card-text>
                  100
                </v-card-text>

                <div class="d-flex fill-height align-center justify-center">
                  <v-scale-transition>
                    <v-icon
                        v-if="isSelected"
                        color="white"
                        size="48"
                        icon="mdi-close-circle-outline"
                    ></v-icon>
                  </v-scale-transition>
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-card-text>
        <v-card-actions>
          <v-btn
              variant="elevated"
              color="indigo"
              style="margin-left: 20px"
              :disabled="disableOrder"
              rounded="xl"
              @click="takeOrder()"
          >
            Сделать заказ
          </v-btn>
          <v-btn
              variant="elevated"
              color="indigo"
              icon="mdi-cog"
              @click="dialogSettingOrder=true"
          >

          </v-btn>
        </v-card-actions>
      </v-card>
    </v-app-bar>

    <div ref="mapContainer" :style="{height:screen_height+'px',width:screen_width+'px',}"></div>

    <v-dialog
        v-model="dialogSettingOrder"
        width="auto"
    >
      <v-card>
        <v-card-title>Настройки поездки</v-card-title>
        <v-card-text>
          <div class="text-subtitle-2">Тип оплаты</div>
          <v-btn-toggle
              v-model="paymentType"
              rounded="0"
              color="deep-purple-accent-3"
              group
          >
            <v-btn value="cash">
              Наличные
            </v-btn>

            <v-btn value="card">
              Картой
            </v-btn>

            <v-btn value="transfer">
              Перевод водителю
            </v-btn>

          </v-btn-toggle>
        </v-card-text>
        <v-card-actions>
          <v-btn block @click="dialogSettingOrder = false">Сохранить изменения</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
        v-model="dialogAuth"
        width="auto"
    >
      <v-container class="fill-height">
        <v-layout class="d-flex fill-height flex-grow-1 align-center justify-center ">
          <v-card min-width="400px" class="elevation-12">
            <v-toolbar color="gray">
              <v-toolbar-title>Авторизация</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form class="pa-4 form" validate-on="submit" @submit.prevent="login()">
                <v-text-field
                    class=""
                    prepend-icon="mdi-account"
                    v-model="email"
                    label="Email"
                    type="email"
                    :rules="[required]">
                </v-text-field>
                <v-text-field
                    class="py-2"
                    prepend-icon="mdi-lock"
                    v-model="userPassword"
                    label="Пароль"
                    type="password"
                    :rules="[password,required]"
                >
                </v-text-field>
                <div class="d-flex justify-space-between">
                  <v-btn color="gray"
                         class="mr-4 flex-grow-1"
                         type="sumbit"
                  >
                    Войти
                  </v-btn>
                  <registration-form/>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-layout>
      </v-container>
    </v-dialog>

    <v-bottom-navigation
        :active="visionDrive"
        style=" margin:10px;width: 99%"
        rounded>
      <v-row
          class="align-center">
        <v-progress-linear v-if="timeOfRoute"
                           v-model="rideProcess"
                           style="width: 98%"
                           height="20"
                           :max="Math.round(timeOfRoute % 3600 / 60)"
                           stream
                           color="green"
                           rounded
        >
          <strong v-if="timeOfRoute">Осталось ехать {{ timeLeft }} мин.</strong>
        </v-progress-linear>
      </v-row>


    </v-bottom-navigation>
  </v-app>


</template>

<script setup>

import "leaflet/dist/leaflet.css";

import {ref, watch,} from "vue";
import L from "leaflet";
import "leaflet-routing-machine";


import 'leaflet-search';
import {password, required} from "@/utils/rules";
import RegistrationForm from "@/components/registrationForm.vue";

//Меню
const listOfMenuPass = ref([{title: 'Например'}])
// import {watch} from "vue";
//Карта
const map = ref();
const mapContainer = ref();
// const zoom = ref(15);
//Координаты
const crd = ref();
const latitude = ref(47.41322);
const longitude = ref(-1.219482);
//Координаты пути
const fromLatitude = ref(55.6401);
const fromLongitude = ref(37.6097);
const toLatitude = ref(55.7506);
const toLongitude = ref(37.6176);


//Размеры экрана
const screen_height = ref(window.screen.height);
const screen_width = ref(window.screen.width);
//Заказ такси
const orderForm = ref(true)
const disableOrder = ref(true)
const toOrder = ref()
const fromOrder = ref()
const toOrderItems = ref(['Moskow'])
const fromOrderItems = ref(['Moskow'])
const dataOfRoute = ref()
//Переменные под заказ такси
const timeOfRoute = ref(0)
watch([longitude, latitude], () => {
  map.value = L.map(mapContainer.value).setView([latitude.value, longitude.value], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,

  }).addTo(map.value);

  dataOfRoute.value = L.Routing.control({
    show: false,
    waypoints: [
      L.latLng(fromLatitude.value, fromLongitude.value),
      L.latLng(toLatitude.value, toLongitude.value)
    ],

  }).addTo(map.value)
});


watch([toOrder, fromOrder], () => {
  if (toOrder.value != null && fromOrder.value != null) {
    disableOrder.value = false
  } else disableOrder.value = true
})


const selectedCarClass = ref(0);
const urlToImagesTaxi = ref(
    ['https://tc.mobile.yandex.net/static/images/40230/90604c3e-ac1a-40d5-af0c-1b04e400b360', 'https://tc.mobile.yandex.net/static/images/40230/64ab2cf7-ed9b-4dae-9442-aff65e12b5d7', 'https://tc.mobile.yandex.net/static/images/40230/5778e9ab-96d0-40bc-8ab8-697a893fe2c0', 'https://tc.mobile.yandex.net/static/images/10593/e412cbb1-191c-4270-bf9e-7286e2d0d360']
)
const namesOfClassCar = ref(
    [
      'Эконом',
      'Комфорт',
      'Бизнес',
      'Минивэн'
    ]
)
//Настройка заказа
const dialogSettingOrder = ref()
const paymentType = ref('cash')
//Авторизация
const dialogAuth = ref()
const email = ref('')
const userPassword = ref('')
//Отображение поездки
const visionDrive = ref(true)
const rideProcess = ref(0)
const timeLeft=ref()

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};


function success(pos) {
  crd.value = pos.coords;
  latitude.value = crd.value.latitude;
  longitude.value = crd.value.longitude;

}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

function login() {
  console.log('awd')
}

function takeOrder() {
  orderForm.value = false;
  visionDrive.value = true;
  timeOfRoute.value = dataOfRoute.value._routes[0].summary.totalTime
  timeLeft.value=Math.round(timeOfRoute.value % 3600 / 60)
  let timerId = setInterval(() => {
    rideProcess.value = rideProcess.value + 1;
    timeLeft.value=timeLeft.value-1;
    }, 1000);

  watch(rideProcess, () => {
    if (rideProcess.value === Math.round(timeOfRoute.value % 3600 / 60)) {
      clearInterval(timerId);
    }
  })
}


</script>

<style>
@import "../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css";
@import "../node_modules/leaflet/dist/leaflet.css";

.leaflet-top leaflet-right {
  visibility: hidden;
  display: none;
}

.selectedCarClass {
  background: gray;
}

.map {
  z-index: 1;
}
</style>