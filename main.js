import {Link} from "./assets/Link.js";
import {hasCOOKie,COOKie,deleteCOOKie} from "./assets/COOKie.js";
import { registerShortcut } from "./assets/Shortcut.js";

//init
//クラス化しておく
const cook_google = hasCOOKie("google");
console.log(cook_google);//test　[]が返ってくる
const new_google = new Link(cook_google);

//宣言
const open_google = () => new_google.open();
console.log(new_google);//test

//登録
registerShortcut("Ctrl+G",open_google);


console.log("finish");