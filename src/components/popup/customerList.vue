<template>
    <div class="customerList">
        <el-dialog
            title="客户列表"
            :visible.sync="editVisible"
            width="350px"
            class="dialog"
            :close-on-click-modal="false"
        >
            <el-container>
                <el-main>
                    <ul class="list">
                        <li
                            class="list-nav"
                            v-bind:class="[activeClass == index ? 'actived':'', errorClass]"
                            v-for="(item,index) in list"
                            :key="index"
                            @click="details(item,index)"
                            ref="content"
                        >
                            <a href="javascript:;">
                                <div class="title">{{item.com}}</div>
                                <div class="text">
                                    <div class="name">{{item.ne}}</div>
                                    <div class="phone">{{item.ph}}</div>
                                </div>
                            </a>
                        </li>
                    </ul>
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
            editVisible: false,
            loginData: {},
            list: [],
            errorClass: 'list-nav',
            activeClass: 0,
            item: {},
            sk: ''
        };
    },
    created() {
        this.sk = this.$store.state.Login.key;
        this.loginData = this.$store.state.Login.loginData;
        this.search();
    },
    methods: {
        //点击弹窗事件
        receipt(index, row) {
            this.editVisible = true;
        },
        //取消事件
        cancel() {
            this.editVisible = false;
            this.$store.commit('setImports', false);
        },
        //确定事件
        determine() {
            this.editVisible = false;
             this.$store.commit('setItem', this.item);
            this.$emit("upload");
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
                showClose: true,
                message: text,
                type: 'error',
                duration: 900
            });
        },
        //客户搜索
        async search() {
            let action = `${this.$store.state.Login.url}/30079`;
            var bd = {
                tid: this.loginData.tid,
                im: 1,
                ss: '',
                cte: 2,
                pg: 1,
                sz: 10
            };

            var hd = {
                pi: 30079,
                si: this.loginData.si,
                sq: 9
            };
            let res = await request('/30079', hd, bd);
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
                // console.log(data);
                let list = data.olst;
                this.list = list;
                this.item = list[0];
            } else {
                this.open2(res.data.hd.rmsg);
            }

            this.button1 = true;
            setTimeout(() => {
                this.button1 = false;
            }, 1000);
        },
        details(item, index) {
            this.activeClass = index;
            this.item = item;
            console.log(this.item)
            // this.cancel();
            // this.$emit('show');
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
            margin: auto;
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
            .list {
                .list-nav {
                    display: flex;
                    flex-direction: column;
                    border-bottom: 1px solid rgba($color: #ccc, $alpha: 0.5);
                    padding: 8px 0;
                    padding-left: 20%;
                    .title {
                        font-size: 18px;
                        font-weight: 600;
                        line-height: 38px;
                        text-align: left;
                        color: rgba($color: #000000, $alpha: 0.6);
                        width: 100%;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                    }
                    .text {
                        display: flex;
                        margin-top: 6px;
                        margin-bottom: 10px;
                        .name {
                            font-size: 16px;
                            line-height: 16px;
                            color: rgba($color: #000000, $alpha: 0.5);
                            width: 80px;
                        }
                        .phone {
                            flex: 1;
                            font-size: 16px;
                            line-height: 16px;
                            color: rgba($color: #000000, $alpha: 0.5);
                            text-align: left;
                        }
                    }
                }
                .list-nav:hover {
                    background: #ebeef5;
                }

                .actived {
                    background: #ebeef5;
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

