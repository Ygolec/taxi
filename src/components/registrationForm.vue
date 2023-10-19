<template>
  <v-dialog
      v-model="registrationDialog"
      persistent
      width="512">
    <template v-slot:activator="{ props }">
      <v-btn
          color="primary"
          class="flex-grow-1"
          v-bind="props"
      >
        Регистрация
      </v-btn>
    </template>
    <v-card>
      <v-form
          ref="registrationForm"

      >
      <v-card-title>
        Регистрация
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
                cols="12">
              <v-text-field
                  label="Имя"
                  v-model="user.name"
                  :rules="[required]"
                  required
              >
              </v-text-field>
            </v-col>
            <v-col
                cols="12">
              <v-text-field
                  label="Фамилия"
                  v-model="user.surName"
                  :rules="[required]"
                  required
              >
              </v-text-field>
            </v-col>
            <v-col
                cols="12">
              <v-text-field
                  label="Отчество"
                  v-model="user.middleName"
                  :rules="[required]"
                  required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Номер телефона"
                  prefix="8"
                  placeholder="8005553535"
                  :rules="[telephone,required]"
                  v-model="user.telNumber"
                  counter
                  maxlength="10"
                  type="tel"
                  required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Email"
                  type="email"
                  v-model="user.email"
                  :rules="[email,required]"
                  placeholder="test@gmail.com"
                  required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Пароль"
                  v-model="user.password"
                  :rules="[password,required]"
                  counter
                  maxlength="20"
                  type="password"
                  required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Повторите пароль"
                  v-model="secondPassword"
                  type="password"
                  counter
                  maxlength="20"
                  :rules="[checkSecondPassword(user.password)]"
                  required
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            @click="registrationDialog=false"
            variant="outlined"
            color="error">
          Отменить регистрацию
        </v-btn>
        <v-btn
            color="success"
            variant="outlined"
            @click="validate">
          Зарегистрироваться
        </v-btn>
      </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>

import {reactive, ref} from "vue";
import { checkSecondPassword, email, password, required, telephone} from "@/utils/rules";

// const valid=ref(true)
const registrationDialog = ref()
const registrationForm=ref()
const user = reactive({
  name: "",
  surName: "",
  middleName: "",
  telNumber: "",
  email: "",
  password: "",
})
const secondPassword=ref()

async function validate() {

  const {valid} = await registrationForm.value.validate()

 if (valid) {
   await fetch('/api/auth/register',
       {
         method: 'post',
         body:user
       }).then(
       registrationDialog.value=false
   )
 }
}

</script>

<style>
.genderInput{
  margin-top: -15px;
}
.genderLabel{
  position: relative;
  top: -15px;
}
</style>