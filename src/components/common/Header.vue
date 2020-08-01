<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn">
            <img src="../../assets/img/footer-logo.png" alt />
        </div>
        <div class="line"></div>
        <div class="logo">代客下单系统</div>
        <div class="operation">
            <!-- <el-button size="mini" @click="replace">切换客户</el-button> -->
            <el-button type="primary" icon="el-icon-s-custom" @click="replace">切换客户</el-button>
            <span class="s1">{{name}}</span>
            <span class="s2">{{phone}}</span>
            <!-- <el-button size="mini" @click="goods">代客下单</el-button> -->
            <div class="line1"></div>
            <a href="javascript:;" class="goods" @click="goods" style="color:#fff;">
                <div class="deliverGoods">
                    <i class="el-icon-edit-outline"></i>
                    代客下单
                </div>
            </a>
            <a href="javascript:;" class="goods" @click="UploadExcel" style="color:#fff;">
                <div class="deliverGoods">
                    <i class="el-icon-upload"></i>
                    批量导入
                </div>
            </a>
            <a href="javascript:;" class="goods" @click="change" style="color:#fff;">
                <div class="deliverGoods">
                    <i class="el-icon-unlock"></i>
                    修改密码
                    <!-- <a href="javascript:;" @click="goods" v-if="show1">发货</a> -->
                    <!-- <el-button type="primary" @click="goods" icon="el-icon-edit-outline">发货</el-button> -->
                </div>
            </a>
            <a href="javascript:;" class="goods" @click="open" style="color:#fff;">
                <div class="deliverGoods">
                    <i class="el-icon-switch-button"></i>
                    退出
                </div>
            </a>

            <div class="user-avator">
                <img src="../../assets/img/img.jpg" />
            </div>
            <div class="user-name">{{loginData.name}}</div>
            <!-- <el-button size="mini" @click="UploadExcel">批量导入</el-button> -->
            <!-- <el-button size="mini" @click="add">添加客户</el-button> -->
        </div>

        <!-- <div class="header-right">
            <div class="header-user-con">
               
                <div class="user-avator">
                    <img src="../../assets/img/img.jpg" />
                </div>
                
                <div class="user-name">{{loginData.name}}</div>
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{loginData.name}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a href="javascript:;" @click="change">
                            <el-dropdown-item divided>修改密码</el-dropdown-item>
                        </a>

                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>-->
        <changePassword ref="changePassword" @logout="logout"></changePassword>
        <DeliverGoods ref="DeliverGoods" @refresh="refresh"></DeliverGoods>
        <customerList ref="customerList" @upload="upload"></customerList>
    </div>
</template>
<script>
import bus from '../common/bus';
import changePassword from '../popup/changePassword';
import cryptoJS from '../../assets/js/encryptUtil.js';
import CryptoJS from 'crypto-js';
import DeliverGoods from '../popup/DeliverGoods.vue';
import customerList from '../popup/customerList.vue';

export default {
    data() {
        return {
            show1: false,
            title: '',
            collapse: false,
            fullscreen: false,
            websocket: null,
            message: 0,
            capital: 3,
            loginData: {},
            key: '',
            tid: '',
            order: [],
            Waybill: [],
            page: '',
            name: '',
            phone: ''
        };
    },
    created() {
        //页面刚进入时开启长连接
        this.LogingType = this.$store.state.Login.LogingType;
        this.loginData = this.$store.state.Login.loginData;

        // console.log(this.loginData);
        // this.key = this.$store.state.Login.key;
        // let tid = cryptoJS.encrypt(this.loginData.tid, this.key);
        // this.tid = encodeURIComponent(tid);
        var url = window.location.href;
        let arr = url.split('#/');
        this.page = arr[1];
    },
    mounted() {
        this.replace();
    },

    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },

    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username');
                this.$router.push('/login');
                let item = {
                    ne: '',
                    ph: ''
                };
                this.$store.commit('setItem', item);
            }
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        change() {
            this.$refs.changePassword.receipt();
        },
        replace() {
            this.$refs.customerList.receipt();
            var timestamp = Date.parse(new Date());
            this.$store.commit('setList', timestamp);
        },
        goods() {
            this.$refs.DeliverGoods.receipt();
        },
        upload() {
            this.name = this.$store.state.Login.item.ne;
            this.phone = this.$store.state.Login.item.ph;
            var timestamp = Date.parse(new Date());
            this.$store.commit('setRefresh', timestamp);
        },
        UploadExcel() {
            var timestamp = Date.parse(new Date());
            this.$store.commit('setImports', timestamp);
        },
        //刷新
        refresh() {
            this.$emit('Refresh');
        },
        logout() {
            localStorage.removeItem('ms_username');
            this.setCookie('Token', '', -1);
            this.$router.push('/login');
        },
        open() {
            this.$confirm('是否退出登录', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    localStorage.removeItem('ms_username');
                    this.$router.push('/login');
                    this.setCookie('token', '', -1);
                })
                .catch(() => {});
        },
        setCookie(key, val, iDay) {
            //key：键名；val：键值；iDay：失效时间
            console.log(1);
            var now = new Date();
            now.setDate(now.getDate() + iDay);
            document.cookie = key + '=' + val + ';expires=' + now.toUTCString() + ';path=/';
            console.log(document.cookie);
        }
    },

    components: {
        changePassword,
        DeliverGoods,
        customerList
    }
};
</script>
<style lang="scss" scoped>
.el-dropdown-menu__item--divided {
    border-top: none !important;
}
.header {
    position: relative;
    box-sizing: border-box;

    height: 70px;
    font-size: 22px;
    color: #fff;
    // background: #fff;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
    padding: 0 20px;
    box-sizing: border-box;
    .line {
        position: absolute;
        border-right: 5px solid #ffffff;
        left: 210px;
        top: 21.5px;
        height: 40%;
        margin-left: 20px;
    }
    .operation {
        float: left;
        display: flex;
        align-items: center;
        height: 70px;
        position: absolute;
        right: 2%;
        .s1 {
            font-size: 18px;
            margin-left: 15px;
        }
        .s2 {
            font-size: 18px;
            margin-left: 15px;
            margin-right: 20px;
        }

        .goods {
            display: block;
            padding: 5px;
            box-sizing: border-box;
            font-size: 16px;
            margin-right: 10px;
            .deliverGoods:hover {
                color: #409eff;
            }
        }

        .line1 {
            height: 30%;
            // margin-top: 21.5px;
            // border-right: 1px solid #ccc;
            width: 1px;
            margin-right: 10px;
            background: linear-gradient(#808080, #fff);
        }
    }
}
.collapse-btn {
    float: left;
    padding-left: 30px;
    padding-right: 30px;
    cursor: pointer;
    line-height: 69px;
    height: 69px;
    // background: #fff;

    img {
        margin-top: 13.5px;
        width: 150px;
        height: 40px;
    }
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
    margin-left: 30px;
    font-size: 24px;
    font-weight: 600;
}

.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;

    .deliverGoods {
        margin-right: 20px;
        font-size: 16px;
        a {
            color: #fff;
        }
    }
    .import {
        margin-right: 20px;
        font-size: 16px;
        a {
            color: #fff;
        }
    }

    .computer {
        margin-right: 20px;
        font-size: 16px;
        a {
            color: #fff;
        }
    }
    .website {
        margin-right: 20px;
        font-size: 16px;
        a {
            color: #fff;
        }
    }
    .locking {
        border-bottom: 1px solid #000;
    }
    .NewDriver {
        margin-right: 20px;
        font-size: 16px;
        a {
            color: #fff;
        }
    }
}

.user-name {
    margin-left: 10px;
    font-size: 16px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
    //  border-bottom: 1px solid #ccc;
}
</style>
