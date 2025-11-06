import {Link} from "./assets/Link.js";
import {hasCOOKie,COOKie,deleteCOOKie} from "./assets/COOKie.js";
import { registerShortcut } from "./assets/Shortcut.js";

//init
const nomallink = hasCOOKie("link");
console.log(nomallink);//test　[]が返ってくる
const newlink = new Link(nomallink);
const openlink = () => newlink.open();
console.log(newlink);//test

registerShortcut("Ctrl+G",openlink);
console.log("finish");