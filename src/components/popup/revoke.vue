<template>
    <div class="Withdraw">
        <el-dialog
            title="申请撤单"
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
                        </div>
                        <div class="head-end">
                            <div class="end-icon">
                                <img src="../../assets/img/end.png" alt />
                            </div>
                            <div class="abbreviate">{{head.end}}</div>
                        </div>
                    </div>
                    <div class="nav">
                        <div class="title">撤单理由</div>
                        <el-input
                            class="add-content"
                            type="textarea"
                            :autosize="{ minRows: 6, maxRows: 12}"
                            placeholder="请输入撤单理由"
                            v-model="textarea"
                            :maxlength="64"
                        ></el-input>
                        <!-- <el-checkbox v-model="checked">返还服务费</el-checkbox> -->
                    </div>
                </el-main>
                <el-footer style="height:50px;">
                    <el-button size="small" @click="determine" :disabled="But">确定</el-button>
                    <el-button size="small" @click="cancel">取消</el-button>
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
            But: false,
            textarea: '',
            editVisible: false,
            popupData: {},
            loginData: {},
            head: {
                start: '',
                end: '',
                dis: ''
            },
            checked: false
        };
    },
    created() {},
    methods: {
        //点击弹窗事件
        receipt(index, row) {
            this.editVisible = true;
            this.popupData = this.$store.state.Login.popup;
            this.loginData = this.$store.state.Login.loginData;
            this.head.start = this.popupData.zct;
            this.head.end = this.popupData.xct;
            this.head.dis = this.popupData.dis;
        },
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        async determine() {
            let action = this.$store.state.Login.url + '/20032';
            if (this.textarea.length == 0) {
                this.open2('撤单理由不能为空');
            } else {
                let bd = {
                    tid: this.loginData.tid,
                    wid: this.popupData.wid,
                    plt: 0,
                    dc: this.textarea
                };
                var hd = {
                    pi: 20032,
                    si: this.loginData.si,
                    sq: 9
                };
                let res = await request('/20032', hd, bd);
                let rid = res.data.hd.rid;
                if (rid >= 0) {
                    // let data = {};
                    // if (this.loginData.em == 0) {
                    //     data = JSON.parse(res.data.bd);
                    // }
                    // if (this.loginData.em == 1) {
                    //     let decryptData = encryptUtil.decrypt(res.data.bd, this.sk);
                    //     data = JSON.parse(decryptData);
                    // }
                    this.textarea = '';
                    this.cancel();
                    this.open1();
                    this.$emit('Refresh');
                } else {
                    this.open2(res.data.hd.rmsg);
                }
            }

            this.But = true;
            setTimeout(() => {
                this.But = false;
            }, 1000);
        },

        open1() {
            this.$message({
                message: '撤单成功',
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
        height: 420px;

        .el-main {
            flex: 1;
            padding: 0;
            padding-bottom: 10px;
            position: relative;
            display: flex;
            flex-direction: column;
            .head {
                box-sizing: border-box;
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

                    width: 150px;
                    .abbreviate {
                        text-align: center;

                        // margin-right: 20px;
                    }
                    .start-icon {
                        // width: 100%;
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
                    .img {
                        img {
                            width: 400px;
                        }
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
                display: flex;
                flex-direction: column;
                align-items: center;
                .title {
                    font-size: 18px;
                    line-height: 50px;
                    font-weight: 550;
                    color: rgba($color: #000000, $alpha: 0.5);
                }
                .add-content {
                    width: 90%;
                    margin-bottom: 20px;
                    /deep/textarea {
                        resize: none;
                    }
                }
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

