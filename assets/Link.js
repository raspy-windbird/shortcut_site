/**
 * 与えられたリンクを成形&開く
 */
export class Link {
    constructor(...href){
        console.log("helf: "+href);
        const newhref = [];
        for (let i of href) {
            newhref.push("https://"+href[i]);
            console.log("newhref add: "+i+" "+href[i])
        }
        console.log("newhref: "+newhref);//test
        this.href = newhref;
    }
    get open () {
        const links = this.href;    
        for (let i in links) {
            window.open(links[i],"_blank");
        }
    }
}
