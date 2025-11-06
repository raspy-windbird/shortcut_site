/**
 * 与えられたリンクを成形&開く
 */
export class Link {
    constructor(...href){
        console.log("helf: "+href);//test
        const newhref = [];
        for (let i of href) {
            newhref.push("https://"+i);
            console.log("newhref add: "+i);//test
        }
        console.log("newhref: "+newhref);//test
        this.href = newhref;
    }
    get open () {
        const links = this.href;    
        for (let i in links) {
            window.open(i,"_blank");
            console.log("i: "+i+" links[i]: "+links[i]);//test
        }
    }
}
