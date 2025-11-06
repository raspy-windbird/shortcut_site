import {Link} from "./assets/Link.js";
import {hasCOOKie,COOKie,deleteCOOKie} from "./assets/COOKie.js";
import { registerShortcut } from "./assets/Shortcut.js";

//init
const nomallink = hasCOOKie("link");
console.log(nomallink);//test
const newlink = new Link(nomallink);
console.log(newlink);//test

registerShortcut("Ctrl+G",newlink.open);