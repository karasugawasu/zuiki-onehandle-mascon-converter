import { invoke } from "@tauri-apps/api/tauri";
import {keyconfig} from "./config.js";

let allowGamepad = "One Handle MasCon for Nintendo Switch"
let haveEvents = 'ongamepadconnected' in window;
let pushButtonList = [];
let pressButtonList = [];
let knotchLevel = 0;
let accelLevel = 0;
let brakeLevel = 0;
let Accel = 0;
let Brake = 0;

function connecthandler(e) {
  updateStatus(e.gamepad);
}

function disconnecthandler(e) {
  console.log("%d が切断されました", e.gamepad.id);
}

async function putKey(key) {
  if (key) {
    await invoke("pushkey", { pushButton: key });
  }
}

async function releaseKey(key) {
  if (key) {
    await invoke("releasekey", { releaseButton: key });
  }
}

async function wheelScroll(scroll) {
  await invoke("wheelscroll", { scrollValue: scroll });
}

async function putreleaseKey(key) {
  if (key) {
    await invoke("clickkey", { clickButton: key });
  }
}

function selectKeys() {
  switch(true) {
    case knotchLevel == 1:
      accelLevel = 5;
      break;
    case knotchLevel > 0.8:
      accelLevel = 4;
      break;
    case knotchLevel > 0.6:
      accelLevel = 3;
      break;
    case knotchLevel > 0.4:
      accelLevel = 2;
      break;
    case knotchLevel > 0.2:
      accelLevel = 1;
      break;
    case knotchLevel > 0:
      accelLevel = 0;
      brakeLevel = 0;
      break;
    case knotchLevel > -0.25:
      brakeLevel = 1;
      break;
    case knotchLevel > -0.35:
      brakeLevel = 2;
      break;
    case knotchLevel > -0.45:
      brakeLevel = 3;
      break;
    case knotchLevel > -0.55:
      brakeLevel = 4;
      break;
    case knotchLevel > -0.65:
      brakeLevel = 5;
      break;
    case knotchLevel > -0.75:
      brakeLevel = 6;
      break;
    case knotchLevel > -0.86:
      brakeLevel = 7;
      break;
    case knotchLevel > -0.97:
      brakeLevel = 8;
      break;
    case knotchLevel >= -1:
      brakeLevel = 9;
      break;
    default:
      console.log('error knotch!!');
      console.log(knotchLevel);
  }
  
  let bfUpP = 0;
  let bfDownP = 0;
  let bfUpB = 0;
  let bfDownB = 0;

  if (Accel < accelLevel) { bfUpP = accelLevel - Accel; }
  if (Accel > accelLevel) { bfDownP = Accel - accelLevel; }
  if (Brake > brakeLevel) { bfDownB = Brake - brakeLevel; }
  if (Brake < brakeLevel) { bfUpB = brakeLevel - Brake; }
  
  let nowconfig = keyconfig.nowconfig;

  if (!nowconfig.mouse) {
    if (nowconfig.onehandle) {
      if (brakeLevel == 9 && Brake !== 9 && bfUpB > 0) {
        putreleaseKey(nowconfig['KNOTCH_EMG_BRAKE']);
      }else{
        [...Array(bfDownP + bfUpB)].forEach(() => {
          putreleaseKey(nowconfig['KNOTCH_BRAKE']);
        });
      }

      [...Array(bfUpP + bfDownB)].forEach(() => {
        putreleaseKey(nowconfig['KNOTCH_ACCEL']);
      });
    }else if (nowconfig.twohandle) {
      if (brakeLevel == 9 && Brake !== 9 && bfUpB > 0) {
        if (nowconfig['KNOTCH_EMG_BRAKE']) {
          putreleaseKey(nowconfig['KNOTCH_EMG_BRAKE']);
        }else{
          [...Array(9)].forEach(() => {
            putreleaseKey(nowconfig['KNOTCH_P_DOWN']);
            putreleaseKey(nowconfig['KNOTCH_B_UP']);
          });
        }
      }else{
        [...Array(bfUpB)].forEach(() => {
          putreleaseKey(nowconfig['KNOTCH_B_UP']);
        });
      }

      if (accelLevel == 0 && Accel !== 0 && bfDownP > 0) {
        if (nowconfig['KNOTCH_NEUTRAL_P']) {
          putreleaseKey(nowconfig['KNOTCH_NEUTRAL_P']);
        }else{
          [...Array(9)].forEach(() => {
            putreleaseKey(nowconfig['KNOTCH_P_DOWN']);
            putreleaseKey(nowconfig['KNOTCH_B_DOWN']);
          });
        }
      }else{
        [...Array(bfDownP)].forEach(() => {
          putreleaseKey(nowconfig['KNOTCH_P_DOWN']);
        });
      }

      if (brakeLevel == 0 && Brake !== 0 && bfDownB > 0) {
        if (nowconfig['KNOTCH_NEUTRAL_B']) {
          putreleaseKey(nowconfig['KNOTCH_NEUTRAL_B']);
        }else{
          [...Array(9)].forEach(() => {
            putreleaseKey(nowconfig['KNOTCH_P_DOWN']);
            putreleaseKey(nowconfig['KNOTCH_B_DOWN']);
          });
        }
      }else{
        [...Array(bfDownB)].forEach(() => {
          putreleaseKey(nowconfig['KNOTCH_B_DOWN']);
        });
      }

      //加速
      [...Array(bfUpP)].forEach(() => {
        putreleaseKey(nowconfig['KNOTCH_P_UP']);
      });
    }
  }else{
    //JR EAST向け マウスタイプ
    if (brakeLevel == 9 && Brake !== 9) {
      wheelScroll(1*14)
    }else{
      wheelScroll(1*(bfDownP + bfUpB));
    }
    wheelScroll(-1*(bfUpP + bfDownB));
  }
  
  Accel = accelLevel;
  Brake = brakeLevel;

  pressButtonList.forEach(function(key){
    if (!pushButtonList.includes(key)) {
      releaseKey(nowconfig[key]);
    }
  });

  pushButtonList.forEach(function(key){
    if (!pressButtonList.includes(key)){
      putKey(nowconfig[key]);
      pressButtonList.push(key);
    }
  });
  
  pressButtonList = pushButtonList;
}


function updateStatus(gamepad) {

  pushButtonList = [];
  
  if (gamepad.buttons[0].pressed) {
    pushButtonList.push('B')
  }
  if (gamepad.buttons[1].pressed) {
    pushButtonList.push('A')
  }
  if (gamepad.buttons[2].pressed) {
    pushButtonList.push('Y')
  }
  if (gamepad.buttons[3].pressed) {
    pushButtonList.push('X')
  }
  if (gamepad.buttons[4].pressed) {
    pushButtonList.push('L')
  }
  if (gamepad.buttons[5].pressed) {
    pushButtonList.push('R')
  }
  if (gamepad.buttons[6].pressed) {
    pushButtonList.push('ZL')
  }
  if (gamepad.buttons[7].pressed) {
    pushButtonList.push('ZR')
  }
  if (gamepad.buttons[8].pressed) {
    pushButtonList.push('MINUS')
  }
  if (gamepad.buttons[9].pressed) {
    pushButtonList.push('PLUS')
  }
  if (gamepad.buttons[12].pressed) {
    pushButtonList.push('UP')
  }
  if (gamepad.buttons[13].pressed) {
    pushButtonList.push('DOWN')
  }
  if (gamepad.buttons[14].pressed) {
    pushButtonList.push('LEFT')
  }
  if (gamepad.buttons[15].pressed) {
    pushButtonList.push('RIGHT')
  }
  if (gamepad.buttons[16].pressed) {
    pushButtonList.push('HOME')
  }
  if (gamepad.buttons[17].pressed) {
    pushButtonList.push('CAPTURE')
  }
  
  knotchLevel = gamepad.axes[1]
  
  selectKeys();
}

function scangamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      let gamepadId = gamepads[i].id;
      if (gamepadId.includes(allowGamepad)){
        updateStatus(gamepads[i]);
      }
    }
  }
}

window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);

if (!haveEvents) {
 setInterval(scangamepads, 25);
}

// window.addEventListener('load', () => { 
//   //loadKeyconfig();
// })
