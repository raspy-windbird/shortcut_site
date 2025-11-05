/**
 * 与えられたリンクを成形&開く
 */
export class Link {
    constructor(...href){
        const newhref = [];
        for (let i in href) {
            newhref[i] = "https://"+href[i];
        }
        console.log(newhref);//test
        this.href = newhref;
    }
    open (links = this.href) {
        for (let i in links) {
            window.open(links[i],"_blank");
        }
    }
}
