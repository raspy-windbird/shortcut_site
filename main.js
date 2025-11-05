import {Link} from "./assets/Link.js";
import {hasCOOKie,COOKie,deleteCookie} from "./assets/COOKie.js";
import { registerShortcut } from "./assets/Shortcut.js";

//init
const nomallink = hasCOOKie("link");
const openlink = Link(nomallink).open;

registerShortcut("Ctrl+G",openlink);