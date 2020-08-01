export default {
    state: {
        loginData: {},
        url: "http://192.168.0.66:9010",
        key: "",
        addressList: [],
        item: {
            ne: "",
            ph: "",
            com: "",
            cte: "",
            ctm: "",
            id: "",
            st: ''
        },
        popup: {},
        key:"",
        name:"",
        address:[]

    },
    mutations: {
        setLoginData(state, n) {
            // console.log(111)
            state.loginData = n;
        },
        setItem(state, n) {
            // console.log(111)
            state.item = n;
        },
        setPopup(state, n) {
            // console.log(111)
            state.popup = n;
        },

        setaddressList(state, n) {
            state.addressList = n;
        },
        setaddress(state, n) {
            state.address = n;
        },
        setUrl(state, n) {
            state.url = n;
        },
        setkey(state, n){
            state.key = n;
        },
        setName(state, n) {
            state.name = n;
        }
    }
}