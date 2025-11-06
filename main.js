import {Link} from "./assets/Link.js";
import {hasCOOKie,COOKie,deleteCOOKie} from "./assets/COOKie.js";
import { registerShortcut } from "./assets/Shortcut.js";

//init
const nomallink = hasCOOKie("link");
console.log(nomallink);//test
const openlink = new Link(nomallink).open;

registerShortcut("Ctrl+G",openlink);