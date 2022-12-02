export const defaultGame = "JR_EAST_TRAIN_SIMULATOR";
export let keyconfig = {
    gamelist: {
        JR_EAST_TRAIN_SIMULATOR : {
            name: "JR East Train Simulator",
            keylist: {
                V: {
                    desc: "HUD 表示／非表示",
                    bind: ""
                },
                C: {
                    desc: "運転台表示切り替え",
                    bind: "ZR"
                },
                Escape: {
                    desc: "ポーズ",
                    bind: "HOME"
                },
                Up: {
                    desc: "レバーサ 前",
                    bind: "UP"
                },
                Down: {
                    desc: "レバーサ 後",
                    bind: "DOWN"
                },
                Left: {
                    desc: "十字キー左",
                    bind: "LEFT"
                },
                Right: {
                    desc: "十字キー右",
                    bind: "RIGHT"
                },
                E: {
                    desc: "EBリセットスイッチ",
                    bind: "Y"
                },
                Enter: {
                    desc: "警笛（1段目）",
                    bind: "A"
                },
                Backspace: {
                    desc: "警笛（2段目)",
                    bind: "X"
                },
                Space: {
                    desc: "ATS確認ボタン",
                    bind: "L"
                },
                X: {
                    desc: "警報持続ボタン",
                    bind: "R"
                },
                Y: {
                     desc: "ATS復帰スイッチ（常用）",
                     bind: "PLUS" 
                },
                U: {
                    desc: "ATS復帰スイッチ（非常）",
                    bind: "MINUS"
                },
                B: {
                    desc: "連絡ブザー",
                    bind: "B"
                },
                I: {
                    desc: "インチングボタン",
                    bind: ""
                },
                W: {
                    desc: "定速/抑速（抑速2）スイッチ",
                    bind: ""
                },
                D: {
                    desc: "抑速1スイッチ",
                    bind: ""
                },
                K: {
                    desc: "勾配起動ボタン ",
                    bind: ""
                },
                T: {
                    desc: "TASC切スイッチ",
                    bind: ""
                },
                Z: {
                    bind: ["KNOTCH_P_UP", "KNOTCH_ACCEL"]
                },
                A: {
                    bind: "KNOTCH_P_DOWN"
                },
                ",": {
                    bind: "KNOTCH_B_DOWN"
                },
                ".": {
                    bind: "KNOTCH_B_UP"
                },
                S: {
                    bind: "KNOTCH_NEUTRAL_P"
                },
                M: {
                    bind: "KNOTCH_NEUTRAL_B"
                },
                "/": {
                    bind: "KNOTCH_EMG_BRAKE"
                },
                Q: {
                    bind: "KNOTCH_BRAKE"
                }
            },
            discription: "JR East Train Simulator",
            switchbuttonlist: ["未割り当て","A","B","X","Y","UP","DOWN","LEFT","RIGHT","L","R","ZL","ZR","HOME","CAPTURE","PLUS","MINUS"],
            onehandle: false,
            twohandle: false,
            mouse: true,
            override: true
        },
        TRAMCITY: {
            name: "TRAMCITY",
            keylist: {
                Escape: {
                    desc: "ESCキー",
                    bind: "HOME"
                },
                Enter: {
                    desc: "警笛",
                    bind: "A"
                },
                RShift: {
                    desc: "電子警笛",
                    bind: "B"
                },
                Q: {
                    desc: "前扉(降) あける",
                    bind: "R"
                },
                W: {
                    desc: "後扉(降) あける",
                    bind: "PLUS"
                },
                Numrow2: {
                    desc: "後扉(降) しめる",
                    bind: "L"
                },
                Numrow1: {
                    desc: "前扉(降) しめる",
                    bind: "MINUS"
                },
                Space: {
                    desc: "車内放送",
                    bind: "Y"
                },
                Z: {
                    bind: "KNOTCH_P_UP"
                },
                A: {
                    bind: "KNOTCH_P_DOWN"
                },
                ",": {
                    bind: "KNOTCH_B_DOWN"
                },
                ".": {
                    bind: "KNOTCH_B_UP"
                },
                Up: {
                    bind: "UP"
                },
                Down: {
                    bind: "DOWN"
                },
                Left: {
                    bind: "LEFT"
                },
                Right: {
                    bind: "RIGHT"
                },
            },
            discription: "TRAMCITY",
            switchbuttonlist: ["未割り当て","A","B","X","Y","L","R","ZL","ZR","HOME","CAPTURE","PLUS","MINUS"],
            onehandle: false,
            twohandle: true,
            mouse: false,
            override: false
        },
        DENSHA_DE_GO_FINAL: {
            name: "電車でGO! FINAL",
            keylist: {
                Escape: {
                    desc: "ポーズ",
                    bind: "HOME"
                },
                E: {
                    desc: "左側アイテム",
                    bind: "L"
                },
                R: {
                    desc: "右側アイテム",
                    bind: "R"
                },
                Space: {
                    desc: "警笛",
                    bind: "A"
                },
                Enter: {
                    desc: "ATS確認 / 決定",
                    bind: "ZR"
                },
                V: {
                    desc: "視点切り替え",
                    bind: "X"
                },
                Down: {
                    bind: ["KNOTCH_P_UP", "DOWN"]
                },
                Up: {
                    bind: ["KNOTCH_P_DOWN", "UP"]
                },
                Left: {
                    bind: ["KNOTCH_B_DOWN" , "LEFT"]
                }
            },
            discription: "電車でGO! FINAL 2ハンドル",
            onehandle: false,
            twohandle: true,
            mouse: false,
            override: false,
            switchbuttonlist: ["未割り当て","A","B","X","Y","L","R","ZL","ZR","HOME","CAPTURE","PLUS","MINUS"],
        }
    },
    switchbuttonlist: ["未割り当て","A","B","X","Y","UP","DOWN","LEFT","RIGHT","L","R","ZL","ZR","HOME","CAPTURE","PLUS","MINUS"],
    nowconfig: {}
}
