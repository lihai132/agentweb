<template>
    <div class="login-wrap">
        <div class="top">
            <div class="title">
                <img src="../../assets/img/footer-logo.png" alt />
                <!-- <img src="../../assets/img/dbg3.jpg" alt=""> -->
            </div>
        </div>
        <div class="center">
            <div class="left">
                <img src="../../assets/img/dbg5.png" alt />
            </div>
            <div class="ms-login">
                <div class="ms-title">代客下单系统</div>
                <el-form
                    :model="param"
                    :rules="rules"
                    ref="login"
                    label-width="0px"
                    class="ms-content"
                >
                    <el-form-item prop="username">
                        <el-input
                            v-model="param.username"
                            placeholder="账号"
                            size="medium"
                            :maxlength="11"
                            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                        >
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            type="password"
                            placeholder="密码"
                            v-model="param.password"
                            size="medium"
                        >
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item style="height: 60px;margin-bottom: 20px;">
                        <el-input
                            type="verification"
                            placeholder="验证码"
                            v-model="param.verification"
                            @blur="blur"
                            size="medium"
                            @keyup.enter.native="checkForm"
                        ></el-input>

                        <div class="divIdentifyingCode" @click="getIdentifyingCode(true)">
                            <img
                                id="imgIdentifyingCode"
                                style="height:32px; width: 100px; cursor: pointer;"
                                alt="点击更换"
                                title="点击更换"
                                :src="codeImg"
                            />
                        </div>
                        <div class="text" v-if="show">请输入验证码</div>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="checkForm" :disabled="loginBut">登录</el-button>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="footer">
            <foot></foot>
        </div>
    </div>
</template>

<script>
import AESUTIL from '../../assets/js/encryption.js';
import AESUTILNormal from '../../assets/js/AESUTILNormal';
import decryptAPIAESUTIL from '../../assets/js/decryptAPIAESUTIL';
import pwdmd5 from '../../assets/js/pwdmd5';
import CryptoJS from 'crypto-js';
import foot from './footer.vue';
import cryptoJS from '../../assets/js/encryptUtil.js';
import encryptUtil from '../../assets/js/encryptUtil.js';
import request from '../../assets/js/request.js';
export default {
    data: function () {
        return {
            loginBut: false,
            codeImg: '',
            codeID: '',
            show: false,
            param: {
                username: '',
                password: '',
                verification: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                verification: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getCode();
        // let url = 'https://trade.gdzxjy.net';
        let url = 'http://192.168.0.66:9010';
        this.$store.commit('setUrl', url);
    },
    methods: {
        getIdentifyingCode: function (bRefresh) {
            this.getCode();
        },
        //获取验证码
        getCode() {
            let requestPath = this.$store.state.Login.url + '/10003';
            // let requestPath = 'http://192.168.0.230:9010/10003';
            this.$axios
                .post(requestPath, {
                    hd: {
                        pi: 10003,
                        sq: 8
                    }
                })
                .then((res) => {
                    let rid = res.data.hd.rid;
                    if (rid >= 0) {
                        this.codeImg = `data:image/jpg;base64,${JSON.parse(res.data.bd).img}`;
                        this.codeID = JSON.parse(res.data.bd).id;
                    } else {
                        this.open2(res.data.hd.rmsg);
                    }
                })
                .catch((error) => {
                    this.open2(error);
                });
        },
        blur() {
            if (this.param.verification.length == 0) {
                this.show = true;
            } else {
                this.show = false;
            }
        },
        checkForm() {
            let action = this.$store.state.Login.url + '/10001';
            // 加密处理
            if (this.param.username.length != 11) {
                this.open2('账号必须是11位数的手机号');
                return;
            }
            var curTime = new Date().getTime();
            var hs_pwd = AESUTIL(this.param.username + '_' + this.param.password, this.param.username + '|' + curTime);
            let pwd1 = CryptoJS.enc.Utf8.parse(hs_pwd);
            if (this.param.verification.length == 0) {
                this.open2('请输入验证码');
            } else {
                var bd = {
                    ls: 10,
                    cd: hs_pwd,
                    lt: curTime,
                    an: this.param.username,
                    tt: 1,
                    vi: this.codeID,
                    vc: this.param.verification,
                    vn: '1.0.190928.1',
                    rm: 0,
                    uud: '',
                    murl: null
                };
                // post请求
                this.$axios
                    .post(action, {
                        hd: {
                            pi: 10001,
                            sq: 1
                        },
                        bd: bd
                    })
                    .then((res) => {
                        let rid = res.data.hd.rid;

                        if (rid >= 0) {
                            let loginData = JSON.parse(res.data.bd);
                            // console.log(loginData);
                            this.$store.commit('setLoginData', loginData);
                            let key = cryptoJS.md5(this.param.username + '_' + this.param.password, 3);
                            let sk = cryptoJS.decrypt(loginData.ct, key).split('|')[0];
                            this.$store.commit('setkey', sk);
                            this.setCookie('token', loginData.ct, 1);
                            this.$store.commit('setName', this.param.username);
                            this.getaddress(loginData, sk);
                            this.$router.push('/customerOrder');
                        } else {
                            this.open2(res.data.hd.rmsg);
                            this.getCode();
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            this.loginBut = true;
            setTimeout(() => {
                this.loginBut = false;
            }, 1000);
        },
        async getaddress(loginData, sk) {
            let action = this.$store.state.Login.url + '/31009';

            var storage = window.localStorage;
            let AddressList = storage.AddressList;
            let Address = storage.Address;
            var bd = {
                tid: loginData.tid,
                vn: '20190101'
            };
            let hd = {
                pi: 31009,
                sq: 9,
                si: loginData.si
            };
            let res = await request('/31009', hd, bd);
            let rid = res.data.hd.rid;

            if (rid >= 0) {
                let data = {};

                if (loginData.em == 0) {
                    data = JSON.parse(res.data.bd);
                }
                if (loginData.em == 1) {
                    let decryptData = encryptUtil.decrypt(res.data.bd, sk);
                    data = JSON.parse(decryptData);
                }
                // let tableData = data.olst;

                let assetsList = data.olst;
                if (assetsList.length == 0) {
                    this.open2('城市地址列表获取失败');
                } else {
                    let restaurants = [];
                    let restaurants1 = [];
                    assetsList.map((item) => {
                        restaurants.push({ value: item.mne, address: item.ne, id: item.id });
                        if (item.ll == 3) {
                            restaurants1.push({ value: item.mne, address: item.ne, id: item.id });
                        }
                    });
                    // console.log(restaurants)
                    storage.AddressList = JSON.stringify(restaurants);
                    // storage.Address = JSON.stringify(restaurants1);
                    this.$store.commit('setaddressList', restaurants);
                    this.$store.commit('setaddress', restaurants1);
                }
            } else {
                this.open2(res.data.hd.rmsg);
            }

            // if (AddressList.length > 0) {
            //     let restaurants = JSON.parse(AddressList);
            //     this.$store.commit('setaddressList', restaurants);
            // } else {
            //     var bd = {
            //         tid: loginData.tid,
            //         vn: '20190101'
            //     };
            //     this.$axios
            //         .post(action, {
            //             hd: {
            //                 pi: 31009,
            //                 sq: 9,
            //                 si: loginData.si
            //             },
            //             bd: bd
            //         })
            //         .then(res => {
            //             let assetsData = JSON.parse(res.data.bd);
            //             let assetsList = assetsData.olst;
            //             let restaurants = [];
            //             assetsList.map(item => {
            //                 restaurants.push({ value: item.mne, address: item.ne, id: item.id });
            //             });
            //             storage.AddressList = JSON.stringify(restaurants);
            //             this.$store.commit('setaddressList', restaurants);
            //             console.log(restaurants);
            //         })
            //         .catch(error => {
            //             console.log(error);
            //         });
            // }
        },
        open2(text) {
            // this.$message.error(text);
            this.$message({
                message: text,
                type: 'error',
                duration: 900
            });
        },
        setCookie(key, val, iDay) {
            //key：键名；val：键值；iDay：失效时间
            var now = new Date();
            now.setDate(now.getDate() + iDay);
            document.cookie = key + '=' + val + ';expires=' + now.toUTCString() + ';path=/';
        }
    },
    components: {
        foot
    }
};
</script>

<style lang="scss" scoped>
.el-input {
    height: 40px;
    /deep/.el-input__inner {
        height: 40px;
    }
}
.login-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.top {
    box-sizing: border-box;
    height: 88px;
    width: 100%;
    display: flex;
    padding: 10px 100px;
    align-items: center;
    background-color: #020429;

    .title {
        width: 50%;
        // img {
        //     height: 60px;
        //     width: 242px;
        // }
    }
}

.center {
    flex: 1;

    background-repeat: no-repeat;
    background-size: cover;

    background-image: url(../../assets/img/dbg1.jpg);
    background-size: 100% 100%;
    .left {
        // img{
        //     width: 750px;
        //     height: 564px;
        // }
        position: absolute;
        left: 15%;
        top: 20%;
    }
}

.footer {
    height: 240px;
    background: #fff;
    position: relative;
}
.ms-title {
    width: 100%;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
    background: #409eff;
    font-weight: 700;
}
.ms-login {
    position: absolute;
    right: 15%;
    top: 40%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    /* background: rgba(255, 255, 255, 1); */
    background-color: hsla(0, 0%, 100%, 0.9);
    overflow: hidden;
}
.ms-content {
    padding: 30px 40px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.divIdentifyingCode {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 5;
    width: 82px; /*设置图片显示的宽*/
    height: 40px; /*图片显示的高*/
    background: #e2e2e2;
    margin: 0;
    img {
        height: 39px !important;
    }
}
.text {
    font-size: 12px;
    line-height: 16px;
    color: #f56c6c;
}
.el-input__inner {
    height: 60px;
}
</style>