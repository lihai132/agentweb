export default {
    state: {
        Imports:"",
        list:"",
        refresh:""

    },
    mutations: {
        setImports(state, n) {
            // console.log(111)
            state.Imports = n;
        },
        setList(state, n) {
            // console.log(111)
            state.list = n;
        },
        setRefresh(state, n) {
            // console.log(111)
            state.refresh = n;
        }
        
    }
}