export default {
    //澳門手機號碼
    macaoPhone: {
    	pattern: /^[\d]{8}$/,
    	empty: "請輸入您的澳門手機號碼",
    	error: '您輸入的手機號碼有誤'
    },
    checkCode: {
        pattern: /^[\d]{6}$/,
    	empty: "請輸入短信驗證碼",
    	error: '您輸入的驗證碼有誤'
    },
    searchNum4: {
        pattern: /^\d{1,4}$/,
    	empty: "請輸入您的1-4位心水數字",
    	error: '請輸入您的1-4位心水數字'
    },
    autoPhone: {  //澳门或者大陆手机号
        pattern: /^(\d{8}|\d{11})$/,
        empty: "請輸入您的手機號碼",
        error: "您輸入的手機號有誤"
    }   
}