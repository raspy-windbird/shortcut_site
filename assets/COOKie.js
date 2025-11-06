//複数プロパティが出てきたときはjson形式で作り直さないとかも？

/**
 * 引数の名のcookieがあるか？
 * yes: そのまま返す
 * no : 新規で作成して返す
 */
export function hasCOOKie (e) {
	const oldcookie = new COOKie(e).get;
	console.log(oldcookie);//test
	if (oldcookie) {
		return oldcookie;
	} else {
		const newcookie = ["google.com","yahoo.co.jp"];//入力を促すようにしたい
		return newcookie;
	}
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
