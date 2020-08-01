<template>
    <div class="customerWaybill">
        <div class="nav" v-if="box1">
            <el-tabs class="tabs" v-model="activeName2" @tab-click="handleClick2">
                <el-tab-pane label="全部运单" name="first">
                    <div class="search">
                        <div class="search-inout">
                            <el-autocomplete
                                class="inline-input"
                                v-model="form2.search"
                                :fetch-suggestions="querySearch"
                                placeholder="运单号/起运地/目的地/货物名称/车牌号/司机名称"
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
                                @click="Refresh"
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
                        <el-table :data="waybillData" border class="table">
                            <el-table-column
                                prop="index"
                                label="序号"
                                width="50"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="wcd"
                                label="运单编号"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="stType"
                                label="运单状态"
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
                                width="100"
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
                                prop="dyf"
                                label="司机运费"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="tn"
                                label="税费"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="pyf"
                                label="已收货主运费"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="pdyf"
                                label="已付司机运费"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="cne"
                                label="司机名称"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="cph"
                                label="司机电话"
                                width="130"
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
                                prop="qzte"
                                label="装货时间"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="qxte"
                                label="卸货时间"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column label="操作" width="150" align="center">
                                <template slot-scope="scope">
                                    <!-- <el-button
                                                    size="mini"
                                                    type="primary"
                                                    @click="revoke(scope.$index, scope.row)"
                                    >撤单</el-button>-->
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="waybillDetails(scope.$index, scope.row)"
                                    >详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="待签约" name="second">
                    <div class="search">
                        <div class="search-inout">
                            <el-autocomplete
                                class="inline-input"
                                v-model="form2.search"
                                :fetch-suggestions="querySearch"
                                placeholder="运单号/起运地/目的地/货物名称/车牌号/司机名称"
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
                                @click="Refresh"
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
                        <el-table :data="waybillData" border class="table">
                            <el-table-column
                                prop="index"
                                label="序号"
                                width="50"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="wcd"
                                label="运单编号"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="stType"
                                label="运单状态"
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
                                width="100"
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
                                prop="dyf"
                                label="司机运费"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="tn"
                                label="税费"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="pyf"
                                label="已收货主运费"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="pdyf"
                                label="已付司机运费"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="cne"
                                label="司机名称"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="cph"
                                label="司机电话"
                                width="130"
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
                                prop="qzte"
                                label="装货时间"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="qxte"
                                label="卸货时间"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column label="操作" width="250" align="center">
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="signing(scope.$index, scope.row)"
                                    >签约</el-button>
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="revoke(scope.$index, scope.row)"
                                    >撤单</el-button>
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="waybillDetails(scope.$index, scope.row)"
                                    >详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="待收货" name="third">
                    <div class="search">
                        <div class="search-inout">
                            <el-autocomplete
                                class="inline-input"
                                v-model="form2.search"
                                :fetch-suggestions="querySearch"
                                placeholder="运单号/起运地/目的地/货物名称/车牌号/司机名称"
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
                                @click="Refresh"
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
                        <el-table :data="waybillData" border class="table">
                            <el-table-column
                                prop="index"
                                label="序号"
                                width="50"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="wcd"
                                label="运单编号"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="stType"
                                label="运单状态"
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
                                width="100"
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
                                prop="dyf"
                                label="司机运费"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="tn"
                                label="税费"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="pyf"
                                label="已收货主运费"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="pdyf"
                                label="已付司机运费"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="cne"
                                label="司机名称"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="cph"
                                label="司机电话"
                                width="130"
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
                                prop="qzte"
                                label="装货时间"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="qxte"
                                label="卸货时间"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column label="操作" width="450" align="center">
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="receipt(scope.$index, scope.row)"
                                    >确认收货</el-button>
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="revoke(scope.$index, scope.row)"
                                    >撤单</el-button>
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="payment(scope.$index, scope.row)"
                                    >支付运费</el-button>
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="rectify(scope.$index, scope.row)"
                                    >冲正运费</el-button>
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="waybillDetails(scope.$index, scope.row)"
                                    >详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="待关闭" name="fourth">
                    <div class="search">
                        <div class="search-inout">
                            <el-autocomplete
                                class="inline-input"
                                v-model="form2.search"
                                :fetch-suggestions="querySearch"
                                placeholder="运单号/起运地/目的地/货物名称/车牌号/司机名称"
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
                                @click="Refresh"
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
                        <el-table :data="waybillData" border class="table">
                            <el-table-column
                                prop="index"
                                label="序号"
                                width="50"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="wcd"
                                label="运单编号"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="stType"
                                label="运单状态"
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
                                width="100"
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
                                prop="dyf"
                                label="司机运费"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="tn"
                                label="税费"
                                width="80"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="pyf"
                                label="已收货主运费"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="pdyf"
                                label="已付司机运费"
                                width="130"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="cne"
                                label="司机名称"
                                width="100"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="cph"
                                label="司机电话"
                                width="130"
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
                                prop="qzte"
                                label="装货时间"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column
                                prop="qxte"
                                label="卸货时间"
                                width="120"
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column label="操作" width="400" align="center">
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="close(scope.$index, scope.row)"
                                    >关闭订单</el-button>
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="payment(scope.$index, scope.row)"
                                    >支付运费</el-button>
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="rectify(scope.$index, scope.row)"
                                    >冲正运费</el-button>

                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="waybillDetails(scope.$index, scope.row)"
                                    >详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <ImportTable v-if="box2" @Refresh="Refresh" @cancel="cancel"></ImportTable>

        <detailed ref="detailed"></detailed>
        <Withdraw ref="Withdraw" @Refresh="Refresh"></Withdraw>
        <waybillDetails ref="waybillDetails" @Refresh="Refresh"></waybillDetails>
        <signing ref="signing" @open="open" @Refresh="Refresh"></signing>
        <revoke ref="revoke" @Refresh="Refresh"></revoke>
        <receipt ref="receipt" @Refresh="Refresh"></receipt>
        <close ref="close" @Refresh="Refresh"></close>
        <rectify ref="rectify" @Refresh="Refresh"></rectify>
        <payment ref="payment" @Refresh="Refresh" @open="paymentOpen"></payment>
    </div>
</template>
<script>
import encryptUtil from '../../assets/js/encryptUtil.js';
import request from '../../assets/js/request.js';
import detailed from '../popup/details.vue';
import Withdraw from '../popup/Withdraw.vue';
import waybillDetails from '../popup/waybillDetails.vue';
import signing from '../popup/signing.vue';
import revoke from '../popup/revoke.vue';
import receipt from '../popup/receipt.vue';
import close from '../popup/close.vue';
import rectify from '../popup/rectify.vue';
import payment from '../popup/payment.vue';
import ImportTable from './upload-excel.vue';

export default {
    data() {
        return {
            // box1: true,
            box2: false,
            tagsList: [],
            collapse: false,
            box1: false,
            search: '',
            restaurants: '',
            activeName1: 'first',
            activeIndex1: 0,
            activeName2: 'first',
            activeIndex2: 0,
            form1: {
                search: ''
            },
            form2: {
                search: ''
            },
            tableData: [],
            sk: '',
            waybillData: [],
            name: '',
            item: {}
        };
    },
    components: {
        detailed,
        Withdraw,
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
        this.startProvinceChange();
    },
    mounted() {
        this.sk = this.$store.state.Login.key;
        this.box1 = true;
        this.getWaybill(0);
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

        handleClick2(tab, event) {
            if (tab.label == '全部运单') {
                this.form2.search = '';
                this.activeIndex2 = 0;
                this.getWaybill(0);
            }
            if (tab.label == '待签约') {
                this.form2.search = '';
                this.activeIndex2 = 2;
                this.getWaybill(2);
            }
            if (tab.label == '待收货') {
                this.form2.search = '';
                this.activeIndex2 = 4;
                this.getWaybill(4);
            }
            if (tab.label == '待关闭') {
                this.form2.search = '';
                this.activeIndex2 = 6;
                this.getWaybill(6);
            }
        },

        add() {
            // this.$refs.addCustomer.receipt();
        },
        //获取数据
        show() {
            this.box1 = true;

            this.$refs.head.upload();
            this.getData(0);
            this.getWaybill(0);
            // console.log(this.item);
        },

        //查询运单
        async getWaybill(num) {
            let action = this.$store.state.Login.url + '/30017';
            this.item = this.$store.state.Login.item;
            // this.loginData = this.$store.state.Login.loginData;

            var bd = {
                tid: this.loginData.tid,
                st: num,
                ss: this.form2.search,
                ocd: '',
                cid: this.item.id,
                mid: '',
                opid: '',
                dsid: '',
                drid: '',
                pg: 1,
                sz: 100
            };
            var hd = {
                pi: 30017,
                si: this.loginData.si,
                sq: 9
            };
            let res = await request('/30017', hd, bd);
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
                    // this.open2('暂无数据');
                    this.waybillData = [];
                } else {
                    tableData.map((item, index) => {
                        item.index = index + 1;
                        if (item.st == 2) {
                            item.stType = '待签约';
                        }
                        if (item.st == 4) {
                            item.stType = '待收货';
                        }
                        if (item.st == 6) {
                            item.stType = '待关闭';
                        }
                        if (item.st == 7) {
                            item.stType = '已完成';
                        }
                        if (item.st == 8) {
                            item.stType = '已撤单';
                        }
                        if (item.st == 9) {
                            item.stType = '撤单待审核';
                        }
                        let startArr = item.qzte.split(' ');
                        item.qzte = startArr[0];
                        let endArr = item.qxte.split(' ');
                        item.qxte = endArr[0];
                    });

                    this.waybillData = tableData;
                    console.log(this.waybillData);
                }
            } else {
                this.open2(res.data.hd.rmsg);
            }
        },
        //运单详情弹窗
        waybillDetails(index, row) {
            this.$store.commit('setPopup', row);
            // console.log(row);
            this.$refs.waybillDetails.receipt();
        },
        //签约
        signing(index, row) {
            this.$store.commit('setPopup', row);
            // console.log(row);
            this.$refs.signing.receipt();
        },
        //运单撤单
        revoke(index, row) {
            this.$store.commit('setPopup', row);
            // console.log(row);
            this.$refs.revoke.receipt();
        },
        //收货
        receipt(index, row) {
            this.$store.commit('setPopup', row);
            // console.log(row);
            this.$refs.receipt.receipt();
        },
        //关闭订单
        close(index, row) {
            this.$store.commit('setPopup', row);
            // console.log(row);
            this.$refs.close.receipt();
        },
        //冲正运费
        rectify(index, row) {
            this.$store.commit('setPopup', row);
            // console.log(row);
            this.$refs.rectify.receipt();
        },
        //支付运费
        payment(index, row) {
            this.$store.commit('setPopup', row);
            // console.log(row);
            this.$refs.payment.receipt();
        },
        //导入
        Imports() {
            this.box1 = false;
            this.box2 = true;
        },
        //刷新页面列表
        Refresh() {
            this.getWaybill(this.activeIndex2);
        },
        cancel() {
            this.box1 = true;
            this.box2 = false;
            this.Refresh();
        },
        //重置
        reset() {
            this.form2.search = '';
            this.getWaybill(this.activeIndex2);
        },
        open(text) {
            this.$alert('确认已完成签约支付', {
                confirmButtonText: '确定',
                callback: (action) => {
                    this.Refresh();
                }
            });
        },
        paymentOpen() {
            this.$alert('确认已完成支付', {
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
            this.getWaybill(0);
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
.customerWaybill {
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
                        height: 92.5%;
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
                        height: 90.5%;
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
