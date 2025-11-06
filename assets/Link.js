/**
 * 与えられたリンクを成形&開く
 */
export class Link {
    constructor(...href){
        console.log("Link: "+href);
        const newhref = {};
        for (let i of href) {
            newhref = "https://"+href[i];
        }
        console.log("newhref: "+newhref);//test
        this.href = newhref;
    }
    open (links = this.href) {
        for (let i in links) {
            window.open(links[i],"_blank");
        }
    }
}
