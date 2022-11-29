
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]


use enigo::{Enigo, Key::*, KeyboardControllable, MouseControllable};
fn key_op(key: &str, flag: &str) {
    let mut enigo = Enigo::new();
    let bdkey = match key{
        "Backspace" => Backspace,
        "Tab" => Tab,
        "Enter" => Return,
        "Escape" => Escape,
        "Space" => Space,
        "Home" => Home,
        "Left" => LeftArrow,
        "Up" => UpArrow,
        "Right" => RightArrow,
        "Down" => DownArrow,
        "Insert" => Raw(0x2D),
        "Delete" => Delete,
        "Numrow0" => Raw(0x30),
        "Numrow1" => Raw(0x31),
        "Numrow2" => Raw(0x32),
        "Numrow3" => Raw(0x33),
        "Numrow4" => Raw(0x34),
        "Numrow5" => Raw(0x35),
        "Numrow6" => Raw(0x36),
        "Numrow7" => Raw(0x37),
        "Numrow8" => Raw(0x38),
        "Numrow9" => Raw(0x39),
        "A" => Raw(0x41),
        "B" => Raw(0x42),
        "C" => Raw(0x43),
        "D" => Raw(0x44),
        "E" => Raw(0x45),
        "F" => Raw(0x46),
        "G" => Raw(0x47),
        "H" => Raw(0x48),
        "I" => Raw(0x49),
        "J" => Raw(0x4A),
        "K" => Raw(0x4B),
        "L" => Raw(0x4C),
        "M" => Raw(0x4D),
        "N" => Raw(0x4E),
        "O" => Raw(0x4F),
        "P" => Raw(0x50),
        "Q" => Raw(0x51),
        "R" => Raw(0x52),
        "S" => Raw(0x53),
        "T" => Raw(0x54),
        "U" => Raw(0x55),
        "V" => Raw(0x56),
        "W" => Raw(0x57),
        "X" => Raw(0x58),
        "Y" => Raw(0x59),
        "Z" => Raw(0x5A),
        "Numpad0" => Raw(0x60),
        "Numpad1" => Raw(0x61),
        "Numpad2" => Raw(0x62),
        "Numpad3" => Raw(0x63),
        "Numpad4" => Raw(0x64),
        "Numpad5" => Raw(0x65),
        "Numpad6" => Raw(0x66),
        "Numpad7" => Raw(0x67),
        "Numpad8" => Raw(0x68),
        "Numpad9" => Raw(0x69),
        "MULTIPLY" => Raw(0x6A),  // *
        "ADD" => Raw(0x6B),       // +
        "SEPARATOR" => Raw(0x6C),
        "SUBTRACT" => Raw(0x6D),  // -
        "DECIMAL" => Raw(0x6E),   // .
        "DIVIDE" => Raw(0x6F),    // /
        "F1" => F1,
        "F2" => F2,
        "F3" => F3,
        "F4" => F4,
        "F5" => F5,
        "F6" => F6,
        "F7" => F7,
        "F8" => F8,
        "F9" => F9,
        "F10" => F10,
        "F11" => F11,
        "F12" => F12,
        "NumLock" => Raw(0x90),
        "ScrollLock" => Raw(0x91),
        "CapsLock" => CapsLock,
        "LShift" => Raw(0xA0),
        "RShift" => Raw(0xA1),
        "LControl" => Raw(0xA2),
        "RControl" => Raw(0xA3),
        "," => Raw(0xBC),
        "." => Raw(0xBE),
        "/" => Raw(0xBF),
        &_ => Return
    };

    if flag == "down" {
        enigo.key_down(bdkey);
    }else if flag == "up"{
        enigo.key_up(bdkey);
    }else{
        enigo.key_click(bdkey);
    }

}

#[tauri::command]
fn pushkey(push_button: &str) {
    //use std::{thread::sleep, time::Duration};
    key_op(push_button, "down");
    //sleep(Duration::from_millis(50));
}

#[tauri::command]
fn releasekey(release_button: &str) {
    key_op(release_button, "up");
}

#[tauri::command]
fn clickkey(click_button: &str) {
    key_op(click_button, "click");
}

#[tauri::command]
fn wheelscroll(scroll_value: i32) {
    let mut enigo = Enigo::new();
    enigo.mouse_scroll_y(scroll_value);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![pushkey, releasekey, clickkey, wheelscroll])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

