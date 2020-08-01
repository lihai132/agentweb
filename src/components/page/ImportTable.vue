<template>
    <div class="box">
        <div class="box1">
            <!-- 按钮 -->
            <el-upload
                class="upload"
                action
                :multiple="false"
                :show-file-list="false"
                accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                :http-request="httpRequest"
            >
                <el-button size="small" type="primary" style="width:100px;" class="but">导入</el-button>
            </el-upload>
            <!-- 按钮 end -->
            <br />
            <!-- 列表 -->
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="序号" label="序号" width="80" align="center"></el-table-column>
                <el-table-column prop="起运地" label="起运地" align="center"></el-table-column>
                <el-table-column prop="目的地" label="目的地" align="center"></el-table-column>
                <el-table-column prop="货物名称" label="货物名称" width="100" align="center"></el-table-column>
                <el-table-column prop="期望运费" label="期望运费" width="100" align="center"></el-table-column>
                <el-table-column prop="重量" label="重量" width="100" align="center"></el-table-column>
                <el-table-column prop="体积" label="体积" width="100" align="center"></el-table-column>

                <el-table-column prop="车型" label="车型" width="100" align="center"></el-table-column>
                <el-table-column prop="车长" label="车长" width="100" align="center"></el-table-column>
                <el-table-column prop="司机名称" label="司机名称" width="100" align="center"></el-table-column>
                <el-table-column prop="司机电话" label="司机电话" width="150" align="center"></el-table-column>
                <el-table-column prop="车牌号" label="车牌号" width="150" align="center"></el-table-column>
                <el-table-column prop="datetime" label="装货日期" width="150" align="center"></el-table-column>

                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="submit(scope.$index, scope.row)"
                        >提交</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="foot">
                <el-button
                    size="mini"
                    type="primary"
                    class="goto"
                    style="width:100px;"
                    @click="goto"
                >返回</el-button>
            </div>
        </div>
        <placeOrder ref="placeOrder" @delet="delet"></placeOrder>
    </div>
</template>

<script>
import XLSX from 'xlsx';
import placeOrder from '../popup/placeOrder.vue';

export default {
    data() {
        return {
            tableData: [],
            index: ''
        };
    },
    components: {
        placeOrder
    },
    methods: {
        httpRequest(e) {
            let file = e.file; // 文件信息
            console.log('e: ', e);
            console.log('file: ', e.file);

            if (!file) {
                // 没有文件
                return false;
            } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
                // 格式根据自己需求定义
                this.$message.error('上传格式不正确，请上传xls或者xlsx格式');
                return false;
            }

            const fileReader = new FileReader();
            fileReader.onload = ev => {
                try {
                    const data = ev.target.result;
                    const workbook = XLSX.read(data, {
                        type: 'binary',
                        cellDates: true // 以字符编码的方式解析
                    });
                    const exlname = workbook.SheetNames[0]; // 取第一张表
                    const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]); // 生成json表格内容
                    // console.log(exl);
                    // 将 JSON 数据挂到 data 里
                    exl.map((item, index) => {
                        var d = new Date(item.装货日期);
                        item.datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                    });
                    // console.log(exl);
                    this.tableData = exl;
                    // document.getElementsByName('file')[0].value = '' // 根据自己需求，可重置上传value为空，允许重复上传同一文件
                } catch (e) {
                    console.log('出错了：：');
                    return false;
                }
            };
            fileReader.readAsBinaryString(file);
        },
        submit(index, row) {
            this.$store.commit('setPopup', row);
            // console.log(row);
            this.$refs.placeOrder.receipt();
            this.index = index;

            console.log(index);
            console.log(row);
        },
        goto() {
            this.$emit('cancel');
            this.$emit('Refresh');
        },
        //删除某行
        delet() {
            // delet tableData[this.index]
            this.tableData.splice(this.index, 1);
        }

        // dateFormat: function(row, column) {
        //     var date = row[column.property];
        //     if (date === undefined) {
        //         return '';
        //     }
        //     return moment(date).format('YYYY-MM-DD');
        // }
    }
};
</script>
<style lang="scss" scoped>
.upload {
    width: 600px;
    height: 160px;
    margin: auto;
    margin-top: 20px;
    .but {
        margin-top: 70px;
    }
    /deep/.el-upload--text {
        width: 600px;
        height: 160px;
    }
}
.box1 {
    .foot {
        width: 100px;
        margin: auto;
        margin-top: 20px;
    }
}
</style>