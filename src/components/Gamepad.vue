<script setup>
    import ConfigList from "./ConfigList.vue"
    import { keyconfig } from "../config.js";
    import { invoke } from "@tauri-apps/api/tauri";
    import { ref } from 'vue';

    let allowGamepad = "One Handle MasCon for Nintendo Switch"
    let controller = [];
    let nIntervId;
    let pushButtonList = [];
    let pressButtonList = [];
    let knotchLevel = 0;
    let accelLevel = 0;
    let brakeLevel = 0;
    let Accel = 0;
    let Brake = 0;

    let connected = ref(false);
    function connecthandler(e) {
        if (!nIntervId) {
            nIntervId = setInterval(updateStatus, 20);
            connected.value = true;
        }
    }

    function disconnecthandler(e) {
        console.log(e.gamepad.id + "が切断されました");
        controller = [];
        if (e.gamepad.id.includes(allowGamepad)){
            clearInterval(nIntervId);
            nIntervId = null;
            connected.value = false;
        }
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


    function updateStatus() {

    scangamepads();

    pushButtonList = [];
    
    if (controller.buttons[0].pressed) {
        pushButtonList.push('B')
    }
    if (controller.buttons[1].pressed) {
        pushButtonList.push('A')
    }
    if (controller.buttons[2].pressed) {
        pushButtonList.push('Y')
    }
    if (controller.buttons[3].pressed) {
        pushButtonList.push('X')
    }
    if (controller.buttons[4].pressed) {
        pushButtonList.push('L')
    }
    if (controller.buttons[5].pressed) {
        pushButtonList.push('R')
    }
    if (controller.buttons[6].pressed) {
        pushButtonList.push('ZL')
    }
    if (controller.buttons[7].pressed) {
        pushButtonList.push('ZR')
    }
    if (controller.buttons[8].pressed) {
        pushButtonList.push('MINUS')
    }
    if (controller.buttons[9].pressed) {
        pushButtonList.push('PLUS')
    }
    if (controller.buttons[12].pressed) {
        pushButtonList.push('UP')
    }
    if (controller.buttons[13].pressed) {
        pushButtonList.push('DOWN')
    }
    if (controller.buttons[14].pressed) {
        pushButtonList.push('LEFT')
    }
    if (controller.buttons[15].pressed) {
        pushButtonList.push('RIGHT')
    }
    if (controller.buttons[16].pressed) {
        pushButtonList.push('HOME')
    }
    if (controller.buttons[17].pressed) {
        pushButtonList.push('CAPTURE')
    }
    
    knotchLevel = controller.axes[1]
    
    selectKeys();
    }

    function scangamepads() {
        let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
        for (var i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
                let gamepadId = gamepads[i].id;
                if (gamepadId.includes(allowGamepad)){
                    controller = gamepads[i];
                }
            }
        }
    }

    window.addEventListener("gamepadconnected", connecthandler);
    window.addEventListener("gamepaddisconnected", disconnecthandler);

    let dismissCountDown = ref(0);
    let dismissSecs = ref(5);
    function countDownChanged(dismissCountDown) {
        dismissCountDown.value = dismissCountDown.value
    }
    function showAlert() {
        dismissCountDown.value = dismissSecs.value
    }
</script>

<template>
    <div class="ps-2 mb-2" v-if="connected"><div class="ms-2 row d-flex align-items-center"><span class="col col-2 badge bg-success ">マスコン接続中</span><span class="col col-5 ms-2 badge bg-warning text-dark">開始時は一度EBに入れてください</span></div></div>
    <div class="ps-2 mb-2" v-else><div class="ms-2 row d-flex align-items-center"><span class="col col-2 badge bg-danger ">マスコン未接続</span><span class="col col-7 ms-2 badge bg-warning text-dark">接続している場合はなにかボタンを押してください</span></div></div>
    <ConfigList />
</template>


