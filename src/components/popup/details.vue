<template>
    <div class="cargoPhoto">
        <el-dialog
            title="详情"
            :visible.sync="editVisible"
            width="700px"
            class="dialog"
            :close-on-click-modal="false"
        >
            <el-container>
                <el-main>
                    <div class="head">
                        <div class="head-start">
                            <div class="start-icon">
                                <img src="../../assets/img/start.png" alt />
                            </div>
                            <div class="abbreviate">{{head.start}}</div>
                        </div>
                        <div class="head-center">
                            <div class="distance">
                                {{head.dis}}
                                <span>公里</span>
                            </div>
                            <div class="img">
                                <img src="../../assets/img/xuxian.png" alt />
                            </div>

                            <div class="cart-center">
                                <img src="../../assets/img/center.png" alt />
                            </div>
                            <div class="number">{{head.ocd}}</div>
                        </div>
                        <div class="head-end">
                            <div class="end-icon">
                                <img src="../../assets/img/end.png" alt />
                            </div>
                            <div class="abbreviate">{{head.end}}</div>
                        </div>
                    </div>
                    <div class="nav">
                        <div class="text-title1">货物信息</div>
                        <div class="news">
                            <div class="news-left" ref="copy">
                                <div class="CargoInformation">
                                    <div class="key">货物信息：</div>
                                    <div
                                        class="value"
                                    >{{news.dw?news.dw+"吨":""}}{{news.dv?news.dv+"方，":""}}{{news.on?news.on+"，":""}}{{news.qyf?news.qyf+"元，":""}}{{news.zdy?news.zdy:""}} {{news.zte?" "+news.zte:""}}</div>
                                </div>
                                <div class="VehicleDemand">
                                    <div class="key">车辆信息：</div>
                                    <div
                                        class="value"
                                    >{{news.ct?news.ct+" ":""}}{{news.cl?news.cl+"，":""}} &ensp; {{news.name?news.name+" ":""}}&ensp; {{news.phone?news.phone +" ":""}}&ensp; {{news.cartNum?news.cartNum:""}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="text-title2">交易明细</div>
                        <div class="from">
                            <div class="form">
                                <el-table :data="chatList" border class="table">
                                    <el-table-column
                                        prop="opte"
                                        label="操作员类型"
                                        width="150"
                                        align="center"
                                        :show-overflow-tooltip="true"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="opne"
                                        label="操作员名称"
                                        width="150"
                                        align="center"
                                        :show-overflow-tooltip="true"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="optm"
                                        label="成交时间"
                                        align="center"
                                        width="150"
                                        :show-overflow-tooltip="true"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="opdc"
                                        label="备注"
                                        align="center"
                                        :show-overflow-tooltip="true"
                                    ></el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </el-main>
                <el-footer style="height:50px;">
                    <el-button size="small" @click="cancel">关闭</el-button>
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
            checked: false,
            But: false,
            head: {
                start: '',
                end: '',
                dis: '',
                ocd: ''
            },
            news: {
                dw: '',
                dv: '',
                on: '',
                qyf: '',
                zdy: '',
                zte: '',
                ct: '',
                cl: '',
                name: '',
                phone: '',
                cartNum: ''
            },
            popupData: {},
            loginData: {},
            ctType: [
                '4.2米',
                '5.0米',
                '6.2米',
                '6.8米',
                '7.2米',
                '7.7米',
                '7.8米',
                '8.2米',
                '8.7米',
                '9.6米',
                '12.5米',
                '13.0米',
                '13.5米',
                '14.6米',
                '15.0米',
                '16.5米',
                '17.5米'
            ],
            clType: ['平板', '高栏', '中栏', '低栏', '高低板', '厢车', '自卸', '保温', '冷藏', '危险品', '集装箱', '特种'],
            chatList: [],
            sk: ''
        };
    },
    created() {},
    methods: {
        //点击弹窗事件
        receipt() {
            this.editVisible = true;
            this.popupData = this.$store.state.Login.popup;
            this.loginData = this.$store.state.Login.loginData;
            this.sk = this.$store.state.Login.key;
            this.ctType.map((item, index) => {
                if (this.popupData.ct == index) {
                    this.news.ct = item;
                }
            });
            this.clType.map((item, index) => {
                if (this.popupData.cl == index) {
                    this.news.cl = item;
                }
            });
            console.log(this.popupData);
            this.head.start = this.popupData.zct;
            this.head.end = this.popupData.xct;
            this.head.dis = this.popupData.dis;
            this.head.ocd = this.popupData.ocd;
            this.news.dw = this.popupData.dw;
            this.news.dv = this.popupData.dv;
            this.news.on = this.popupData.on;
            this.news.qyf = this.popupData.qyf;
            this.news.zdy = this.popupData.zdy;
            this.news.zte = this.popupData.zte;
            this.news.name = this.popupData.drne;
            this.news.phone = this.popupData.drph;
            this.news.cartNum = this.popupData.cn;

            this.Journal();
        },
        //取消事件
        cancel() {
            this.editVisible = false;
        },

        //确定事件
        determine() {},
        //运单日志记录
        async Journal() {
            let action = this.$store.state.Login.url + '/30014';
            var bd = {
                tid: this.loginData.tid,
                oid: this.popupData.oid,
                pg: 1,
                sz: 500
            };

            var hd = {
                pi: 30014,
                si: this.loginData.si,
                sq: 9
            };
            let res = await request('/30014', hd, bd);
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
                let news = data.olst;
                if (news.length > 0) {
                    news.forEach((item) => {
                        if (item.opte == 1) {
                            item.opte = '货主';
                        }
                        if (item.opte == 2) {
                            item.opte = '司机';
                        }
                        if (item.opte == 3) {
                            item.opte = '调度员';
                        }
                        if (item.opte == 4) {
                            item.opte = '客服';
                        }
                        if (item.opte == 5) {
                            item.opte = '经纪人';
                        }
                        if (item.opte == 0) {
                            item.opte = '游客';
                        }
                        if (item.opte == -1) {
                            item.opte = '交易中心';
                        }
                        if (item.opte == -2) {
                            item.opte = '运营中心';
                        }
                        if (item.opte == -3) {
                            item.opte = '运营商';
                        }
                        if (item.opte == -6) {
                            item.opte = '企业货主';
                        }
                    });
                    this.chatList = news;
                    console.log(this.chatList);
                }
            } else {
                this.open2(res.data.hd.rmsg);
            }
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
    mounted() {}
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
        height: 600px;

        .el-main {
            flex: 1;
            padding: 0;
            padding-bottom: 10px;
            position: relative;
            display: flex;
            flex-direction: column;
            .head {
                height: 120px;
                padding-bottom: 0;
                width: 100%;
                margin: auto;
                background: #009dd9;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: absolute;
                top: 0;
                left: 0;
                .head-start,
                .head-end {
                    // width: 100px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .abbreviate {
                        font-size: 16px;
                        color: #fff;
                        font-weight: 600;
                        text-align: center;
                        padding-bottom: 10px;
                    }
                    .detailed {
                        font-size: 12px;
                        line-height: 16px;
                        margin-top: 5px;
                        color: #fff;
                        margin: 0 10px;
                    }
                }
                .head-start {
                    height: 100%;
                    padding-bottom: 18px;
                    // position: relative;
                    width: 100px;
                    .abbreviate {
                        text-align: right;

                        // margin-right: 20px;
                    }
                    .start-icon {
                        text-align: center;
                    }

                    .start-icon {
                        // margin-right: 15px;
                        margin-top: 10px;
                    }
                }
                .head-end {
                    padding-bottom: 18px;
                    height: 100%;
                    width: 100px;
                    .abbreviate {
                        text-align: left;

                        // margin-left: 20px;
                    }
                    .end-icon {
                        text-align: center;
                    }

                    .end-icon {
                        // margin-left: 25px;
                        margin-top: 10px;
                    }
                }
                .head-center {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    .distance {
                        color: #fff;
                        margin-bottom: 25px;
                    }
                    .number {
                        margin-top: 5px;
                        color: #fff;
                    }
                    .type {
                        width: 101px;
                        height: 32px;
                        text-align: center;
                        font-size: 18px;
                        font-weight: 600;
                        color: #fff;
                        background: #00cc00;
                        line-height: 32px;
                        border-radius: 3px;
                        margin-right: 11px;
                    }

                    .cart-center {
                        position: absolute;
                        top: 33px;
                        left: 46.7%;
                    }
                }
            }
            .nav {
                margin-top: 120px;
                overflow: scroll;
                flex: 1;
                .text-title1 {
                    font-size: 18px;
                    line-height: 40px;
                    color: rgba($color: #000000, $alpha: 0.5);
                    text-align: center;
                }
                .text-title2 {
                    font-size: 18px;
                    line-height: 40px;
                    color: rgba($color: #000000, $alpha: 0.5);
                    text-align: center;
                }
                .news {
                    height: 122px;
                    display: flex;
                    justify-content: space-between;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    box-shadow: 0 1px 0 0 #ccc;
                    padding: 10px 0;
                    padding-left: 10%;
                    padding-right: 5%;
                    box-sizing: border-box;
                    width: 90%;
                    border-radius: 5px;
                    margin: auto;
                    margin-bottom: 20px;

                    .news-left {
                        height: 100%;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        margin-left: 10px;
                        justify-content: space-around;
                        box-sizing: border-box;
                        .CargoInformation,
                        .VehicleDemand,
                        .other {
                            display: flex;

                            .key {
                                color: rgba($color: #000000, $alpha: 0.5);
                            }
                            .value {
                                font-size: 16px;
                                color: #000;
                            }
                        }
                    }
                    .news-right {
                        height: 100%;
                        width: 270px;
                        border-left: 1px solid #ccc;
                        display: flex;
                        position: relative;

                        .cargoPicture {
                            flex: 1;
                            display: flex;
                            justify-content: space-around;

                            img {
                                width: 100px;
                                height: 100px;
                            }
                        }
                        .butCopy {
                            position: absolute;
                            top: 70px;
                            left: -58px;
                        }
                    }
                }
                .from {
                    width: 90%;
                    height: 195px;
                    border-radius: 5px;
                    margin: auto;
                    border: 1px solid #ccc;
                    display: flex;
                    flex-direction: column;
                }
            }
            .nav::-webkit-scrollbar {
                display: none;
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

