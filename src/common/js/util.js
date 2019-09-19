/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse(){
    let url = window.location.search;    //拿到url参数字符串
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;    //以?或&开头后面跟着不是以?或&开头的字符串,再跟着=然后又是不是以?或&开头的字符串 
    let arr = url.match(reg);//数组的第一个匹配到id=12345,第二个匹配到a=b
    if(arr){
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            //由于是url参数所以要用decodeURLComponent
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        })
    }
    return obj;
}























