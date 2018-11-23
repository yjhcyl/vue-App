/**
 *
 *解析url参数
 *@example ?id=12345&a=b
 *@return Object {id: 12345}
 *
 */
  export function urlParse () {
        let url = window.location.search
        let obj = {}
        let party = /[?&][^?&]+=[^?&]+/g
        let arr = url.match(party)
        if (arr) {
          arr.forEach((item) => {
            let temArray = item.slice(1).split('=')
            let key = decodeURIComponent(temArray[0])
            let value = decodeURIComponent(temArray[1])
            obj[key] = value
          })
        }
        return obj
}
