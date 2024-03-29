<script setup>
  import {keyconfig, defaultGame} from "../config.js";
  import { ref } from 'vue';

  let configList = [];
  let gameList = keyconfig.gamelist;
  let selectedGame = defaultGame;
  let options = [];
  let mouseMode = false;
  let onehandleMode = false;
  let twohandleMode = false;
  let twohandleAabMode = false;

  const buttonSelected = ref([]);

  let gameSelect = {};
  gameSelect["options"] = [];
  Object.keys(gameList).forEach((keys ,i) => {
    
    gameSelect.options.push({
      value: keys,
      text: gameList[keys].name
    });
  });
  self.gameSelect = gameSelect;
  let gameconfig = gameList[selectedGame];

  function loadConfig (){
    gameconfig = gameList[selectedGame];
    configList = [];
    keyconfig.nowconfig = {};
    configList.push({
      name: gameconfig.name,
      buttons: []
    })
    Object.keys(gameconfig.keylist).forEach((keys ,i) => {
      let button = ""
      let buttonDesc = ""
      
      let switchButton = gameconfig.keylist[keys].bind;
      buttonDesc = gameconfig.keylist[keys].desc

      if (Array.isArray(switchButton)) {
        switchButton.forEach(k => {
          button = k;
          keyconfig.nowconfig[button] = keys
          if (buttonDesc){
            configList[0].buttons.push({
              description: buttonDesc,
              button: button,
              key: keys
            });
          }
        });
      }else{
        if (switchButton == "") {
          button = "未割り当て"
        }else{
          button = switchButton;
        }
        if (buttonDesc){
          configList[0].buttons.push({
            description: buttonDesc,
            button: button,
            key: keys
          });
        }
        keyconfig.nowconfig[button] = keys
      }
      buttonSelected.value.splice(i, i, button);
    });
    keyconfig.nowconfig["mouse"] = gameconfig.mouse;
    keyconfig.nowconfig["onehandle"] = gameconfig.onehandle;
    keyconfig.nowconfig["twohandle"] = gameconfig.twohandle;
    keyconfig.nowconfig["twohandleAab"] = gameconfig.twohandleAab;
    keyconfig.nowconfig["override"] = gameconfig.override;
    options = gameconfig.switchbuttonlist;
    mouseMode = gameconfig.mouse;
    onehandleMode = gameconfig.onehandle;;
    twohandleMode = gameconfig.twohandle;
    twohandleAabMode = gameconfig.twohandleAab;
  }

  loadConfig();
  self.configList = configList;

  function changeKeybind(button, key){
    let beforbuton = gameconfig.keylist[key].bind;
    let afterbutton = button;
    if (afterbutton != "未割り当て") {
      Object.keys(gameconfig.keylist).forEach(k => {
        if ( gameconfig.keylist[k].bind == afterbutton ){
          gameconfig.keylist[k].bind = beforbuton;
        }
      });
      gameconfig.keylist[key].bind = afterbutton;
    }else{
      keyconfig.nowconfig[beforbuton] = "";
      gameconfig.keylist[key].bind = "";
    }
    loadConfig();
    self.configList = configList;
  }

  function changeGame(game){
    selectedGame = game;
    loadConfig();
  }

  function modeChange(value, mode){
    switch (mode) {
      case "mouseMode":
        keyconfig.gamelist[selectedGame].mouse = true;
        keyconfig.gamelist[selectedGame].onehandle = false;
        keyconfig.gamelist[selectedGame].twohandle = false;
        keyconfig.gamelist[selectedGame].twohandleAab = false;
        break;
      case "onehandleMode":
        keyconfig.gamelist[selectedGame].mouse = false;
        keyconfig.gamelist[selectedGame].onehandle = true;
        keyconfig.gamelist[selectedGame].twohandle = false;
        keyconfig.gamelist[selectedGame].twohandleAab = false;
        break;
      case "twohandleMode":
        keyconfig.gamelist[selectedGame].mouse = false;
        keyconfig.gamelist[selectedGame].onehandle = false;
        keyconfig.gamelist[selectedGame].twohandle = true;
        keyconfig.gamelist[selectedGame].twohandleAab = false;
        break;
      case "twohandleAabMode":
        keyconfig.gamelist[selectedGame].mouse = false;
        keyconfig.gamelist[selectedGame].onehandle = false;
        keyconfig.gamelist[selectedGame].twohandle = false;
        keyconfig.gamelist[selectedGame].twohandleAab = true;
        break;
    }
    loadConfig();
  }
</script>

<template>
    <div v-for='config in configList'>
      <div v-if="config.buttons.length > 0">
        <div class="container">
          <div class="row">
            <i class='col col-sm-auto bi bi-controller fs-2 pt-1'></i>
            <b-form-select class="col fw-bold border-0 rounded-0 ps-0" size="lg" v-model="selectedGame" :options="gameSelect.options" v-on:change="changeGame($event)"></b-form-select>
          </div>
          <p class="pt-2 text-end fs-6">{{gameList[selectedGame].discription}}</p>
          <div v-if="keyconfig.nowconfig.override" class="row mb-2">
            <div class="col">
              <b-form-checkbox class="me-2" v-model="mouseMode" :disabled="mouseMode" v-on:change="modeChange($event, 'mouseMode')" switch>
                マウスモード
              </b-form-checkbox>
            </div>
            <div class="col">
              <b-form-checkbox class="me-2" v-model="onehandleMode" :disabled="onehandleMode" v-on:change="modeChange($event, 'onehandleMode')" switch>1ハンドル</b-form-checkbox>
            </div>
            <div class="col">
              <b-form-checkbox class="me-2" v-model="twohandleMode" :disabled="twohandleMode" v-on:change="modeChange($event, 'twohandleMode')" switch>
                2ハンドル
              </b-form-checkbox>
            </div>
            <div class="w-100"></div>
            <div class="col offset-4">
              <b-form-checkbox class="me-2" v-model="twohandleAabMode" :disabled="twohandleAabMode" v-on:change="modeChange($event, 'twohandleAabMode')" switch>
                自動空気ブレーキ
              </b-form-checkbox>
            </div>
          </div>
        </div>
        <div class="container pt-2">
          <div class="row" v-for='(buttons, index) in config.buttons'>
            <div class="col pt-1 fw-bold border-bottom">{{buttons.description}}</div>
            <b-form-select class="col border-bottom border-0 rounded-0" size="sm" v-model="buttonSelected[index]" :options="options" v-on:change="changeKeybind($event, buttons.key)"></b-form-select>
          </div>
        </div>
      </div>
    </div>
</template>


