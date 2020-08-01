<template>
    <div class="cargoPhoto">
        <el-dialog
            title="发货"
            :visible.sync="editVisible"
            width="700px"
            class="dialog"
            :close-on-click-modal="false"
        >
            <el-container>
                <el-main>
                    <div class="address">
                        <div class="title">地址信息</div>
                        <el-form
                            :model="form"
                            :rules="rules"
                            ref="form"
                            label-width="100px"
                            class="demo-ruleForm form"
                        >
                            <div class="row">
                                <el-form-item label="起运地" prop="start" style="width:350px;">
                                    <el-col :span="50">
                                        <el-autocomplete
                                            class="inline-input"
                                            v-model="form.start"
                                            :fetch-suggestions="querySearch"
                                            placeholder="请输入内容"
                                            :trigger-on-focus="false"
                                            @select="startChang"
                                            style="width:260px;"
                                        ></el-autocomplete>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="发货人" prop="consignor" style="width:250px;">
                                    <el-input v-model="form.consignor" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                            <el-form-item label="详细地址" prop="startAddress" style="width:600px;">
                                <el-input v-model="form.startAddress" :maxlength="64"></el-input>
                            </el-form-item>
                            <!-- <div class="line"></div> -->

                            <div class="row">
                                <el-form-item label="目的地" prop="end" style="width:350px;">
                                    <el-col :span="50">
                                        <el-autocomplete
                                            class="inline-input"
                                            v-model="form.end"
                                            :fetch-suggestions="querySearch"
                                            placeholder="请输入内容"
                                            :trigger-on-focus="false"
                                            @select="endChang"
                                            style="width:260px;"
                                        ></el-autocomplete>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="收货人" prop="consignor" style="width:250px;">
                                    <el-input v-model="form.Receipt" :maxlength="16"></el-input>
                                </el-form-item>
                            </div>
                            <el-form-item label="详细地址" prop="startAddress" style="width:600px;">
                                <el-input v-model="form.endAddress" :maxlength="64"></el-input>
                            </el-form-item>
                            <el-form-item label="距离" style="width:568px;">
                                <el-input v-model="form.dis" disabled>
                                    <i slot="suffix" style="font-style:normal" class="metre">公里</i>
                                </el-input>
                            </el-form-item>
                            <!-- <div class="line"></div> -->
                        </el-form>
                    </div>
                    <div class="cargoInformation">
                        <div class="title">货物信息</div>
                        <el-form
                            :model="form"
                            :rules="rules"
                            ref="form"
                            label-width="100px"
                            class="demo-ruleForm form"
                        >
                            <div class="row">
                                <el-form-item label="货物名称" prop="goodsName" style="width:300px;">
                                    <el-input v-model="form.goodsName" :maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="装货日期" style="width:300px;" required>
                                    <el-date-picker
                                        v-model="form.time"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                        style="width:200px;"
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
                        </el-form>
                        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                            <el-form-item label="重量" required>
                                <el-col :span="9" prop="weight">
                                    <el-input-number
                                        v-model="form.weight1"
                                        controls-position="right"
                                        :min="1"
                                        :max="9999"
                                        style="width:95%;"
                                        :precision="2"
                                    ></el-input-number>
                                </el-col>
                                <el-col class="line" :span="3" style="text-align: center;">至</el-col>
                                <el-col :span="9">
                                    <el-input-number
                                        v-model="form.weight2"
                                        controls-position="right"
                                        :min="1"
                                        :max="9999"
                                        style="width:95%;"
                                        prop="weight"
                                        :precision="2"
                                    ></el-input-number>
                                </el-col>吨
                            </el-form-item>
                            <el-form-item label="体积" p>
                                <el-col :span="9">
                                    <el-input-number
                                        v-model="form.volume1"
                                        controls-position="right"
                                        :min="1"
                                        :max="9999"
                                        style="width:95%;"
                                        :precision="2"
                                    ></el-input-number>
                                </el-col>
                                <el-col class="line" :span="3" style="text-align: center;">至</el-col>
                                <el-col :span="9">
                                    <el-input-number
                                        v-model="form.volume2"
                                        controls-position="right"
                                        :min="1"
                                        :max="9999"
                                        style="width:95%;"
                                        :precision="2"
                                    ></el-input-number>
                                </el-col>方
                            </el-form-item>
                            <el-form-item label="期望运费" style="width:300px;" required>
                                <el-input-number
                                    v-model="form.price"
                                    controls-position="right"
                                    :min="0"
                                    :max="999999"
                                    style="width:99%;"
                                ></el-input-number>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="vehicleInformation">
                        <div class="title">车辆信息</div>
                        <el-form
                            :model="form"
                            :rules="rules"
                            ref="form"
                            label-width="100px"
                            class="demo-ruleForm form"
                        >
                            <div class="row">
                                <el-form-item label="车型" prop="ct" style="width:300px;">
                                    <el-select
                                        v-model="form.ct"
                                        @change="changeCT"
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="item in options1"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="车长" prop="cl" style="width:300px;">
                                    <el-select
                                        v-model="form.cl"
                                        @change="changeCL"
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="item in options2"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="row">
                                <el-form-item label="司机名称" prop="name" style="width:300px;">
                                    <el-input v-model="form.name" :maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="司机电话" prop="phone" style="width:300px;">
                                    <el-input
                                        v-model="form.phone"
                                        :maxlength="11"
                                        oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <el-form-item label="车牌号" prop="vehicle" style="width:300px;">
                                <el-input v-model="form.vehicle" :maxlength="7"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-main>
                <el-footer style="height:50px;">
                    <el-button
                        size="small"
                        style="width:100px;"
                        @click="place"
                        :disabled="goodsBut"
                    >发货</el-button>
                    <el-button size="small" @click="cancel" style="width:100px;">取消</el-button>
                </el-footer>
            </el-container>
        </el-dialog>
    </div>
</template>
<script>
import encryptUtil from '../../assets/js/encryptUtil.js';
import request from '../../assets/js/request.js';
export default {
    data() {
        return {
            editVisible: false,
            rules: {
                start: [
                    { required: true, message: '请输入起运地', trigger: 'blur' },
                    { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
                ],
                end: [
                    { required: true, message: '请输入目的地', trigger: 'blur' },
                    { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
                ],
                consignor: [
                    { required: true, message: '请输入收货人', trigger: 'blur' },
                    { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
                ],
                startAddress: [
                    { required: false, message: '请输入起运地', trigger: 'blur' },
                    { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
                ],
                goodsName: [
                    { required: true, message: '请输入货物名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
                ],
                weight: [{ required: true, message: '请输入重量', trigger: 'blur' }],
                price: [
                    { required: false, message: '请输入运费', trigger: 'blur' },
                    { min: 0, max: 7, message: '长度在 0 到 7 个字符', trigger: 'blur' }
                ],
                name: [
                    { required: false, message: '请输入司机名称', trigger: 'blur' },
                    { min: 0, max: 16, message: '长度在 0 到 16 个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: false, message: '请输入司机号码', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度为 11 位数字字符', trigger: 'blur' }
                ],
                vehicle: [
                    { required: false, message: '请输入车牌号', trigger: 'blur' },
                    { min: 7, max: 7, message: '长度为 7 位字符', trigger: 'blur' }
                ],
                ct: [{ required: true, message: '请选择车型', trigger: 'blur' }],
                cl: [{ required: true, message: '请选择车长', trigger: 'blur' }]
            },
            form: {
                start: '',
                consignor: '',
                Receipt: '',
                startAddress: '',
                startId: '',
                end: '',
                endAddress: '',
                endId: '',
                goodsName: '',
                time: '',
                weight1: '',
                weight2: '',
                volume1: '',
                volume2: '',
                price: '',
                name: '',
                phone: '',
                vehicle: '',
                ct: '',
                cl: '',
                dis: ''
            },

            labelPosition: 'right',
            restaurants: [],

            options1: [
                {
                    value: '平板',
                    label: '平板'
                },
                {
                    value: '高栏',
                    label: '高栏'
                },
                {
                    value: '中栏',
                    label: '中栏'
                },
                {
                    value: '低栏',
                    label: '低栏'
                },
                {
                    value: '高低板',
                    label: '高低板'
                },
                {
                    value: '厢车',
                    label: '厢车'
                },
                {
                    value: '自卸',
                    label: '自卸'
                },
                {
                    value: '保温',
                    label: '保温'
                },
                {
                    value: '冷藏',
                    label: '冷藏'
                },
                {
                    value: '危险品',
                    label: '危险品'
                },
                {
                    value: '集装箱',
                    label: '集装箱'
                },
                {
                    value: '特种',
                    label: '特种'
                }
            ],

            options2: [
                {
                    value: '4.2米',
                    label: '4.2米'
                },
                {
                    value: '5.0米',
                    label: '5.0米'
                },
                {
                    value: '6.2米',
                    label: '6.2米'
                },
                {
                    value: '6.8米',
                    label: '6.8米'
                },
                {
                    value: '7.2米',
                    label: '7.2米'
                },
                {
                    value: '7.7米',
                    label: '7.7米'
                },
                {
                    value: '7.8米',
                    label: '7.8米'
                },
                {
                    value: '8.2米',
                    label: '8.2米'
                },
                {
                    value: '8.7米',
                    label: '8.7米'
                },
                {
                    value: '9.6米',
                    label: '9.6米'
                },
                {
                    value: '12.5米',
                    label: '12.5米'
                },
                {
                    value: '13.0米',
                    label: '13.0米'
                },
                {
                    value: '13.5米',
                    label: '13.5米'
                },
                {
                    value: '14.6米',
                    label: '14.6米'
                },
                {
                    value: '15.0米',
                    label: '15.0米'
                },
                {
                    value: '16.5米',
                    label: '16.5米'
                },
                {
                    value: '17.5米',
                    label: '17.5米'
                }
            ],
            loginData: {},
            sk: '',
            item: {},
            goodsBut: false
        };
    },
    created() {
        this.sk = this.$store.state.Login.key;
        this.loginData = this.$store.state.Login.loginData;
        this.startProvinceChange();
    },
    methods: {
        //点击弹窗事件
        receipt() {
            this.editVisible = true;
            this.item = this.$store.state.Login.item;
            this.form.consignor = this.item.ne;
        },

        //取消事件
        cancel() {
            this.editVisible = false;
            this.form = {
                start: '',
                consignor: '',
                Receipt: '',
                startAddress: '',
                startId: '',
                endAddress: '',
                endId: '',
                goodsName: '',
                time: '',
                weight1: '',
                weight2: '',
                volume1: '',
                volume2: '',
                price: '',
                name: '',
                phone: '',
                vehicle: '',
                ct: '',
                cl: '',
                dis: ''
            };
        },
        //地址搜索
        startProvinceChange() {
            // var storage = window.localStorage;
            // let AddressList = JSON.parse(storage.AddressList);
            this.restaurants = this.$store.state.Login.address;
            // console.log(this.$store.state.Login.address);
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
        async startChang(item) {
            this.form.startId = item.id + '';
            // console.log(this.loginData);
            if (this.form.startId.length > 0 && this.form.endId > 0) {
                let action = this.$store.state.Login.url + '/10016';
                var bd = {
                    zid: this.form.startId,
                    xid: this.form.endId,
                    tid: this.loginData.tid
                };
                var hd = {
                    pi: 10016,
                    si: this.loginData.si,
                    sq: 9
                };
                let res = await request('/10016', hd, bd);
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
                    data.dis = Math.round(data.dis);
                    if (data.dis < 10) {
                        data.dis = 10;
                    }
                    this.form.dis = data.dis;
                } else {
                    this.open2(res.data.hd.rmsg);
                }
            }
        },
        async endChang(item) {
            this.form.endId = item.id + '';
            // console.log(this.form.startId);
            // console.log(this.form.startId);
            if (this.form.startId.length > 0 && this.form.endId.length > 0) {
                let action = this.$store.state.Login.url + '/10016';

                var bd = {
                    tid: this.loginData.tid,
                    zid: this.form.startId,
                    xid: this.form.endId
                };
                var hd = {
                    pi: 10016,
                    si: this.loginData.si,
                    sq: 9
                };
                let res = await request('/10016', hd, bd);
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
                    data.dis = Math.round(data.dis);
                    if (data.dis < 10) {
                        data.dis = 10;
                    }
                    this.form.dis = data.dis;
                } else {
                    this.open2(res.data.hd.rmsg);
                }
            }
        },
        loadAll() {
            return this.restaurants;
        },
        //车长
        changeCL(num) {
            // this.form.ct = num;
            // console.log(num);
        },
        //车型
        changeCT(data) {
            // let cl = data;
            // this.form.cl = cl;
            // console.log(data);
        },
        //发货
        async place() {
            let action = this.$store.state.Login.url + '/20001';

            //数据校验
            if (this.form.startId.length == false || this.form.start.length <= 0) {
                this.open2('起运地不能为空');
                // console.log(333);
                return;
            }
            if (this.form.endId.length == false || this.form.end.length <= 0) {
                this.open2('目的地不能为空');
                this.goodsBut = true;
                setTimeout(() => {
                    this.goodsBut = false;
                }, 1000);
                return;
            }
            if (this.form.consignor.length == 0) {
                // console.log(333);
                this.open2('发货人不能为空');
                this.goodsBut = true;
                setTimeout(() => {
                    this.goodsBut = false;
                }, 1000);
                return;
            }
            if (this.form.Receipt.length == 0) {
                // console.log(333);
                this.open2('收货人不能为空');
                this.goodsBut = true;
                setTimeout(() => {
                    this.goodsBut = false;
                }, 1000);
                return;
            }
            if (this.form.goodsName.length == 0) {
                // console.log(333);
                this.open2('货物名称不能为空');
                this.goodsBut = true;
                setTimeout(() => {
                    this.goodsBut = false;
                }, 1000);
                return;
            }
            if (this.form.time.length == 0) {
                // console.log(333);
                this.open2('装货日期不能为空');
                this.goodsBut = true;
                setTimeout(() => {
                    this.goodsBut = false;
                }, 1000);
                return;
            }
            if (this.form.weight1 == false || this.form.weight1 <= 0 || this.form.weight1 == undefined) {
                // console.log(333);
                this.open2('请填写一个范围内的重量');
                this.goodsBut = true;
                setTimeout(() => {
                    this.goodsBut = false;
                }, 1000);
                return;
            }
            if (this.form.weight2 == false || this.form.weight2 <= 0 || this.form.weight2 == undefined) {
                // console.log(333);
                this.open2('请填写一个范围内的重量');
                this.goodsBut = true;
                setTimeout(() => {
                    this.goodsBut = false;
                }, 1000);
                return;
            }
            if (this.form.ct.length == false) {
                // console.log(333);
                this.open2('请选择车型');
                this.goodsBut = true;
                setTimeout(() => {
                    this.goodsBut = false;
                }, 1000);
                return;
            }
            if (this.form.cl.length == false) {
                // console.log(333);
                this.open2('请选择车长');
                this.goodsBut = true;
                setTimeout(() => {
                    this.goodsBut = false;
                }, 1000);
                return;
            }
            if (this.form.price <= 0||this.form.price ==""||this.form.price ==undefined) {
                // console.log(333);
                this.open2('请输入期望运费');
                this.goodsBut = true;
                setTimeout(() => {
                    this.goodsBut = false;
                }, 1000);
                return;
            }

            if (this.form.vehicle) {
                // console.log(333);
                if (this.isVehicleNumber(this.form.vehicle) == true) {
                    console.log('BBB');
                } else {
                    this.open2('车牌号不规范');
                    console.log('cccccccccc');
                    this.goodsBut = true;
                    setTimeout(() => {
                        this.goodsBut = false;
                    }, 1000);
                    return;
                }
            }

            let weight = '';
            if (this.form.weight1 == this.form.weight2) {
                weight = this.form.weight2;
            } else {
                weight = this.form.weight1 + '-' + this.form.weight2;
            }

            let volume = '';
            if (this.form.weight1 == this.form.weight2) {
                volume = this.form.volume2;
            } else {
                volume = this.form.volume1 + '-' + this.form.volume2;
            }

            var bd = {
                tid: this.loginData.tid,
                on: this.form.goodsName,
                te: 1,
                // pte: this.radio == '平台代付' ? 1 : 2,
                zxte: 1,
                ct: this.form.ct,
                cl: this.form.cl,
                dw: weight,
                dv: volume,
                zdy: this.form.time,
                zte: '0:00-24:00',
                qyf: this.form.price,
                yft: 1,
                ismf: 1,
                dis: this.form.dis,
                zid: this.form.startId,
                zad: this.form.startAddress,
                xid: this.form.endId,
                xad: this.form.endAddress,
                com: this.item.com,
                cid: this.item.id,
                fhr: this.form.consignor,
                fhrp: this.item.ph,
                shr: this.form.Receipt,
                shrp: '',
                odc: '',
                dc: '',
                isin: 1,
                drne: this.form.name,
                drph: this.form.phone,
                cn: this.form.vehicle
            };
            var hd = {
                pi: 20001,
                si: this.loginData.si,
                sq: 9
            };
            let res = await request('/20001', hd, bd);
            let rid = res.data.hd.rid;
            if (rid >= 0) {
                this.open1('发货成功');
                this.cancel();

                var timestamp = Date.parse(new Date());
                this.$store.commit('setRefresh', timestamp);
            } else {
                this.open2(res.data.hd.rmsg);
            }

            this.goodsBut = true;
            setTimeout(() => {
                this.goodsBut = false;
            }, 1000);

            //车长车型装卸方式
        },
        open1(text) {
            this.$message({
                message: text,
                type: 'success',
                duration: 900
            });
        },
        open2(text) {
            // this.$message.error(text);
            this.$message({
                message: text,
                type: 'error',
                duration: 900
            });
        },
        isVehicleNumber(vehicleNumber) {
            var result = false;
            if (vehicleNumber.length == 7) {
                var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
                result = express.test(vehicleNumber);
            }
            return result;
        }
    },
    mounted() {},
    watch: {
        'form.weight1': function (newVal) {
            if (newVal > this.form.weight2) {
                this.form.weight2 = newVal;
            }
        },
        'form.weight2': function (newVal) {
            if (newVal < this.form.weight1) {
                this.form.weight1 = newVal;
            }
        },

        'form.volume1': function (newVal) {
            if (newVal > this.form.volume2) {
                this.form.volume2 = newVal;
            }
        },
        'form.volume2': function (newVal) {
            if (newVal < this.form.volume1) {
                this.form.volume1 = newVal;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.dialog {
    /deep/.el-dialog__body {
        padding: 0 !important;
    }

    /deep/ .el-dialog__header {
        padding: 6px 10px !important;
        background: #409eff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /deep/.el-dialog__title {
            line-height: 20px;
            font-size: 16px;
        }
        /deep/.el-dialog__title {
            color: #fff;
        }
        /deep/.el-dialog__headerbtn {
            top: 8px !important;
        }
    }

    /deep/.el-icon-close:hover {
        background: #eee;
        color: #fff;
    }

    /deep/.el-dialog__headerbtn .el-dialog__close {
        color: #fff !important;
    }

    /deep/.pswp,
    .pswp--supports-fs,
    .pswp--open,
    .pswp--animate_opacity,
    .pswp--notouch,
    .pswp--css_animation,
    .pswp--svg,
    .pswp--zoom-allowed,
    .pswp--visible,
    .pswp--zoom-allowed,
    .pswp--animated-in,
    .pswp--has_mouse {
        z-index: 9999 !important;
    }

    /deep/.pswp__bg {
        background: rgba($color: #000000, $alpha: 0.6) !important;
    }

    .el-container {
        height: 680px;
        /deep/.el-form-item__label {
            width: 100px !important;
        }

        .el-main {
            flex: 1;
            padding: 0;
            padding-bottom: 10px;
            padding-left: 20px;
            padding-right: 20px;
            .address,
            .cargoInformation,
            .vehicleInformation {
                .title {
                    font-size: 18px;
                    line-height: 18px;
                    color: rgba($color: #000000, $alpha: 0.5);
                    padding-top: 10px;
                    padding-bottom: 10px;
                    text-align: center;
                    // border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
                    margin: 0 20px;
                }
                .form {
                    margin-top: 10px;

                    .row {
                        display: flex;
                        .el-form-item {
                            margin-bottom: 18px;
                        }
                    }
                    .line {
                        height: 1px;
                        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
                        width: 90%;
                        margin: auto;
                    }
                }
                border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
            }
            .vehicleInformation {
                border-bottom: none;
            }
        }

        .el-footer {
            text-align: center;
            border-top: 1px solid #aaaaaa;
            background: #f8f8f8;
            line-height: 50px;
        }
    }

    .el-main::-webkit-scrollbar {
        display: none;
    }
}
</style>

