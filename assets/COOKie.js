//複数プロパティが出てきたときはjson形式で作り直さないとかも？

/**
 * 引数の名のcookieがあるか？
 * yes: そのまま返す
 * no : 新規で作成して返す
 */
export function hasCOOKie (e) {
	const cookie = new COOKie();
	const oldcookie = cookie.get;
	
	console.log(oldcookie);//test
	if (oldcookie) {
		console.log("found cookie");
	} else {
		cookie.set("google.com","yahoo.co.jp");//入力を促すようにしたい
		console.log("not found cookie");//test
		console.log(cookie.get);//test
	}
	return cookie;
}

/**
 * cookieをセットする
 */
export class COOKie{
	constructor (name){this.name = name;}

	set(value, options = {}) {
		Cookies.set(this.name, value,options);
	}

	get get(){
		return Cookies.get(this.name);
	}
}

/**
 * 自動で全削除
 */
export function deleteCOOKie(){
    const oldcookie = Cookies.get();//オブジェクトで返ってくる
    if (oldcookie){
        for (key in oldcookie){
            Cookies.remove(key);
        }
    }
}
