export function formatDate(date,fmt) {

    if(/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1,(data.getFullYear()+'').substr(4-RegExp.$1.length))	//$1匹配到(y+)这个值yyyy
	};
	let o = {
		'M+':date.getMonth() + 1,
		'd+':date.getDate(),
		'h+':date.getHours(),
		'm+':date.getMinutes(),
		's+':date.getSeconds()	
	};
	for(let k in o){
		if(new RexEep(`(${k})`).test(fmt)){
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str));
		}
	}
	return date;
}

function padLeftZero(str){
	return ('00'+str).substr(str.length);
}
