<template>
    <div class="customerOrder">
        <div class="nav" v-if="box1">
            <el-tabs class="tabs" v-model="activeName1">
                <!-- <el-tab-pane label="全部订单" name="first">
                    <div class="search">
                        <div class="search-inout">
                            <el-autocomplete
                                class="inline-input"
                                v-model="form1.search"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                :trigger-on-focus="false"
                                @select="startChang"
                                style="width:300px;"
                            ></el-autocomplete>
                        </div>
                        <div class="search-but">
                            <el-button
                                size="mini"
                                type="primary"
                                prefix-icon="el-icon-search"
                                style="width:100px;"
                            >查找</el-button>
                        </div>
                    </div>
                    <div class="form">
                        <el-table :data="tableData" border class="table">
                            <el-table-column
                                prop="index"
                                label="序号"
                                width="50"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="ocd"
                                label="订单编号"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="zct"
                                label="起运地"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="xct"
                                label="目的地"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="dis"
                                label="距离(km)"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="on"
                                label="货物名称"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="dw"
                                label="重量(吨)"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="dv"
                                label="体积(方)"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="qyf"
                                label="期望运费"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="drne"
                                label="司机名称"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="drph"
                                label="司机电话"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="cn"
                                label="车牌号"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="zdy"
                                label="装货时间"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column label="操作" width="100" align="center">
                                <template slot-scope="scope">
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="detailed(scope.$index, scope.row)"
                                    >详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>-->
                <el-tab-pane label="待派车" name="first">
                    <div class="search">
                        <div class="search-inout">
                            <el-autocomplete
                                class="inline-input"
                                v-model="form1.search"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入订单号/起运地/目的地/货物名称"
                                :trigger-on-focus="false"
                                @select="startChang"
                                style="width:300px;"
                            ></el-autocomplete>
                        </div>
                        <div class="search-but">
                            <el-button
                                size="mini"
                                type="primary"
                                prefix-icon="el-icon-search"
                                style="width:100px;"
                                @click="getData(2)"
                            >查找</el-button>
                            <el-button
                                size="mini"
                                type="primary"
                                prefix-icon="el-icon-search"
                                style="width:100px;"
                                @click="reset"
                            >重置</el-button>
                        </div>
                    </div>
                    <div class="form">
                        <el-table :data="tableData" border class="table">
                            <el-table-column
                                prop="index"
                                label="序号"
                                width="50"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="ocd"
                                label="订单编号"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="zct"
                                label="起运地"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="xct"
                                label="目的地"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="dis"
                                label="距离(km)"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="on"
                                label="货物名称"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="dw"
                                label="重量(吨)"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="dv"
                                label="体积(方)"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="qyf"
                                label="期望运费"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="drne"
                                label="司机名称"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="drph"
                                label="司机电话"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="cn"
                                label="车牌号"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="zdy"
                                label="装货时间"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column label="操作" width="300" align="center">
                                <!-- <el-button size="mini" type="primary">派车</el-button>
                                            <el-button size="mini" type="primary">撤单</el-button>
                                            <el-button size="mini" type="primary">修改</el-button>
                                <el-button size="mini" type="primary">详情</el-button>-->
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="sendCart(scope.$index, scope.row)"
                                    >派车</el-button>
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="withdraw(scope.$index, scope.row)"
                                    >撤单</el-button>
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="modify(scope.$index, scope.row)"
                                    >修改</el-button>
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="detailed(scope.$index, scope.row)"
                                    >详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <!-- <el-tab-pane label="已派车" name="third">
                    <div class="search">
                        <div class="search-inout">
                            <el-autocomplete
                                class="inline-input"
                                v-model="form1.search"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                :trigger-on-focus="false"
                                @select="startChang"
                                style="width:300px;"
                            ></el-autocomplete>
                        </div>
                        <div class="search-but">
                            <el-button
                                size="mini"
                                type="primary"
                                prefix-icon="el-icon-search"
                                style="width:100px;"
                            >查找</el-button>
                        </div>
                    </div>
                    <div class="form">
                        <el-table :data="tableData" border class="table">
                            <el-table-column
                                prop="index"
                                label="序号"
                                width="50"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="ocd"
                                label="订单编号"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="zct"
                                label="起运地"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="xct"
                                label="目的地"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="dis"
                                label="距离(km)"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="on"
                                label="货物名称"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="dw"
                                label="重量(吨)"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="dv"
                                label="体积(方)"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="qyf"
                                label="期望运费"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="drne"
                                label="司机名称"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="drph"
                                label="司机电话"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="cn"
                                label="车牌号"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="zdy"
                                label="装货时间"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column label="操作" width="100" align="center">
                                <template slot-scope="scope">
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="detailed(scope.$index, scope.row)"
                                    >详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已撤销" name="fourth">
                    <div class="search">
                        <div class="search-inout">
                            <el-autocomplete
                                class="inline-input"
                                v-model="form1.search"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                :trigger-on-focus="false"
                                @select="startChang"
                                style="width:300px;"
                            ></el-autocomplete>
                        </div>
                        <div class="search-but">
                            <el-button
                                size="mini"
                                type="primary"
                                prefix-icon="el-icon-search"
                                style="width:100px;"
                            >查找</el-button>
                        </div>
                    </div>
                    <div class="form">
                        <el-table :data="tableData" border class="table">
                            <el-table-column
                                prop="index"
                                label="序号"
                                width="50"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="ocd"
                                label="订单编号"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="zct"
                                label="起运地"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="xct"
                                label="目的地"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="dis"
                                label="距离(km)"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="on"
                                label="货物名称"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="dw"
                                label="重量(吨)"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="dv"
                                label="体积(方)"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="qyf"
                                label="期望运费"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="drne"
                                label="司机名称"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="drph"
                                label="司机电话"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="cn"
                                label="车牌号"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="zdy"
                                label="装货时间"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column label="操作" width="100" align="center">
                                <template slot-scope="scope">
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="detailed(scope.$index, scope.row)"
                                    >详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>-->
            </el-tabs>
        </div>
        <ImportTable v-if="box2" @Refresh="Refresh" @cancel="cancel"></ImportTable>
        <customerList ref="customerList" @show="show"></customerList>
        <sendCart ref="sendCart" v-if="box3" @goBack="goBack"></sendCart>
        <detailed ref="detailed"></detailed>
        <Withdraw ref="Withdraw" @Refresh="Refresh"></Withdraw>
        <modify ref="modify" @Refresh="Refresh"></modify>
        <waybillDetails ref="waybillDetails" @Refresh="Refresh"></waybillDetails>
        <signing ref="signing" @open="open" @Refresh="Refresh"></signing>
        <revoke ref="revoke" @Refresh="Refresh"></revoke>
        <receipt ref="receipt" @Refresh="Refresh"></receipt>
        <close ref="close" @Refresh="Refresh"></close>
        <rectify ref="rectify" @Refresh="Refresh"></rectify>
        <payment ref="payment" @Refresh="Refresh" @open="open"></payment>
    </div>
</template>
<script>
import vHead from '../common/Header.vue';
import customerList from '../popup/customerList.vue';
import sendCart from './contract.vue';
import detailed from '../popup/details.vue';
import Withdraw from '../popup/Withdraw.vue';
import modify from '../popup/modify.vue';
import waybillDetails from '../popup/waybillDetails.vue';
import signing from '../popup/signing.vue';
import revoke from '../popup/revoke.vue';
import receipt from '../popup/receipt.vue';
import close from '../popup/close.vue';
import rectify from '../popup/rectify.vue';
import payment from '../popup/payment.vue';
import ImportTable from './upload-excel.vue';
import encryptUtil from '../../assets/js/encryptUtil.js';
import request from '../../assets/js/request.js';

export default {
    data() {
        return {
            box1: true,
            box2: false,
            box3: false,
            tagsList: [],
            collapse: false,

            search: '',
            restaurants: '',
            activeName1: 'first',
            activeIndex1: 0,

            activeIndex2: 0,
            form1: {
                search: ''
            },
            form2: {
                search: ''
            },
            tableData: [],
            waybillData: [],
            name: '',
            item: {},
            loginData: {},
            sk: ''
        };
    },
    components: {
        vHead,
        customerList,
        sendCart,
        detailed,
        Withdraw,
        modify,
        waybillDetails,
        signing,
        revoke,
        receipt,
        close,
        rectify,
        payment,
        ImportTable
        // addCustomer
    },
    created() {
        this.sk = this.$store.state.Login.key;

        this.startProvinceChange();
    },
    mounted() {
        this.box1 = true;
        // console.log(111);
        this.item = this.$store.state.Login.item;
        if (this.item.id) {
            this.getData(2);
        }else{
            
        }
    },
    methods: {
        //处理货源数据
        startProvinceChange() {
            this.loginData = this.$store.state.Login.loginData;
            var storage = window.localStorage;
            let AddressList = JSON.parse(storage.AddressList);
            this.restaurants = AddressList;
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
            // console.log(queryString, cb);
        },

        createStateFilter(queryString) {
            return (houseNumber) => {
                return houseNumber.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1;
            };
        },

        loadAll() {
            return this.restaurants;
        },
        startChang(item) {},
        // handleClick1(tab, event) {
        //     if (tab.label == '全部订单') {
        //         this.activeIndex1 = 0;
        //         this.getData(0);
        //     }
        //     if (tab.label == '待派车') {
        //         this.activeIndex1 = 2;
        //         this.getData(2);
        //     }
        //     if (tab.label == '已派车') {
        //         this.activeIndex1 = 3;
        //         this.getData(3);
        //     }
        //     if (tab.label == '已撤销') {
        //         this.activeIndex1 = 4;
        //         this.getData(4);
        //     }
        // },
        // handleClick2(tab, event) {
        //     if (tab.label == '全部运单') {
        //         this.activeIndex2 = 0;
        //         this.getWaybill(0);
        //     }
        //     if (tab.label == '待签约') {
        //         this.activeIndex2 = 2;
        //         this.getWaybill(2);
        //     }
        //     if (tab.label == '待收货') {
        //         this.activeIndex2 = 4;
        //         this.getWaybill(4);
        //     }
        //     if (tab.label == '待关闭') {
        //         this.activeIndex2 = 6;
        //         this.getWaybill(6);
        //     }
        // },

        // replace() {
        //     this.$refs.customerList.receipt();
        // },
        add() {
            // this.$refs.addCustomer.receipt();
        },
        //获取数据
        show() {
            this.box1 = true;
            this.item = this.$store.state.Login.item;
            console.log(111);
            this.getData(2);

            // console.log(this.item);
        },
        //查询订单列表
        async getData(num) {
            let action = this.$store.state.Login.url + '/30005';
            this.item = this.$store.state.Login.item;
            this.loginData = this.$store.state.Login.loginData;
            var bd = {
                tid: this.loginData.tid,
                st: num,
                ss: this.form1.search,
                cid: this.item.id,
                mid: '',
                opid: '',
                dsid: '',
                pg: 1,
                sz: 100
            };
            var hd = {
                pi: 30005,
                si: this.loginData.si,
                sq: 9
            };
            let res = await request('/30005', hd, bd);
            let rid = res.data.hd.rid;

            if (rid >= 0) {
                let data = {};

                if (this.loginData.em == 0) {
                    data = JSON.parse(res.data.bd);
                }
                if (this.loginData.em == 1) {
                    let decryptData = encryptUtil.decrypt(res.data.bd, this.sk);
                    data = JSON.parse(decryptData);
                }
                let tableData = data.olst;

                if (tableData.length == 0) {
                    this.tableData = [];
                } else {
                    tableData.map((item, index) => {
                        item.index = index + 1;
                        let timeArr = item.zdy.split(' ');
                        item.zdy = timeArr[0];
                    });

                    this.tableData = tableData;
                    console.log(tableData);
                }
            } else {
                this.open2(res.data.hd.rmsg);
            }

            this.But = true;
            setTimeout(() => {
                this.But = false;
            }, 1000);
        },
        //订单详情
        detailed(index, row) {
            this.$store.commit('setPopup', row);
            console.log(row);
            this.$refs.detailed.receipt();
        },
        //派车
        sendCart(index, row) {
            this.$store.commit('setPopup', row);
            this.box1 = false;
            this.box2 = false;
            this.box3 = true;
        },
        //订单撤单
        withdraw(index, row) {
            this.$store.commit('setPopup', row);

            this.$refs.Withdraw.receipt();
        },
        //刷新页面列表
        Refresh() {
            console.log(222);
            this.getData(2);
        },
        //修改
        modify(index, row) {
            this.$store.commit('setPopup', row);
            // console.log(row);
            this.$refs.modify.receipt();
        },
        //查询运单

        //冲正运费
        rectify(index, row) {
            this.$store.commit('setPopup', row);
            // console.log(row);
            this.$refs.rectify.receipt();
        },
        //冲正运费
        payment(index, row) {
            this.$store.commit('setPopup', row);
            // console.log(row);
            this.$refs.payment.receipt();
        },
        //导入
        Imports() {
            this.box1 = false;
            this.box2 = true;
            this.box3 = false;
        },
        goBack() {
            this.box1 = true;
            this.box2 = false;
            this.box3 = false;
            this.Refresh();
        },
        cancel() {
            this.box1 = true;
            this.box2 = false;
            this.box3 = false;
            this.Refresh();
        },
        //重置
        reset() {
            this.form1.search = '';
            this.getData(2);
        },
        open() {
            this.$alert('确认已完成签约支付', {
                confirmButtonText: '确定',
                callback: (action) => {
                    this.Refresh();
                }
            });
        },
        open1(text) {
            this.$message({
                message: text,
                type: 'success',
                duration: 900
            });
        },
        open2(text) {
            this.$message({
                message: text,
                type: 'error',
                duration: 900
            });
        }
    },
    watch: {
        '$store.state.Nav.Imports': function (newVal) {
            this.Imports();
        },
        '$store.state.Nav.list': function (newVal) {
            this.box1 = false;
            // this.$refs.customerList.receipt();
        },
        '$store.state.Nav.refresh': function (newVal) {
            console.log(333);
            this.box1 = true;
            this.getData(2);
        }
    }
};
</script>
<style lang="scss" scoped>
.el-table--small td {
    padding: 3px 0 !important;
}
.el-table .cell.el-tooltip {
    font-size: 16px;
}
.customerOrder {
    height: 100%;
}

.tabs {
    /deep/.el-tabs__nav-scroll {
        padding: 0 39.3%;
    }
    /deep/.el-tabs__nav-wrap::after {
        height: 1px !important;
    }
}

.tabs {
    height: 100%;
    /deep/.el-tabs__nav-scroll {
        padding: 0 39.4%;
    }
    /deep/.el-tabs__nav-wrap::after {
        height: 1px !important;
    }
    /deep/.el-tabs__content {
        height: 94%;
        /deep/#pane-first,
        /deep/#pane-second,
        /deep/#pane-third,
        /deep/#pane-fourth {
            height: 100%;
            display: flex;
            flex-direction: column;
            .search {
                height: 32px;
            }
            .form {
                margin-top: 20px;
                height: 80%;
                // flex: 1;
                // overflow: scroll;
                .table {
                    /deep/.el-table__body-wrapper {
                        height: 95%;
                    }
                }
            }
        }
        /deep/#pane-first,
        /deep/#pane-second,
        /deep/#pane-third,
        /deep/#pane-fourth {
            // height: 97%;
            .form {
                margin-top: 20px;
                flex: 1;
                .table {
                    height: 95%;

                    /deep/.el-table__body-wrapper {
                        height: 92.5%;
                        overflow: scroll;
                    }
                }
            }
        }
    }
}

.nav {
    width: 96%;
    margin: auto;
    padding: 10px 20px 20px 20px;
    // border: 1px solid rgba($color: #000000, $alpha: 0.2);
    height: 100%;

    display: flex;
    flex-direction: column;
    .search {
        display: flex;
        height: 32px;
        .search-but {
            margin-left: 10px;
        }
    }
    .form {
        margin-top: 20px;
        // flex: 1;
        // border-bottom: 1px solid #ccc;
        // overflow-x: scroll;
        .table {
            // height: 75%;
            /deep/.el-table__body-wrapper {
                // overflow: scroll;
                /deep/.el-table__body {
                    // height: 100%;
                    // overflow: scroll;
                    // overflow-x: scroll;
                }
            }

            /deep/.el-table__body-wrapper::-webkit-scrollbar {
                width: 0px;
                height: 15px;
            }
            // /deep/.el-table__body-wrapper::-webkit-scrollbar:hover {
            //     height: 15px;
            // }
            /deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
                background: #ccc;
                width: 7px;
                opacity: 0.4;
                border-radius: 7px;
                z-index: 99;
            }
        }
    }
}
</style>
