<template>
    <div class="app-container">
        <upload-excel-component
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            @setCustomData="getCustomData"
        />
        <el-table :data="tableData" border style="width: 100%;margin-top:20px;">
            <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" :show-overflow-tooltip="true" align="center" />
            <el-table-column label="操作" width>
                <template slot-scope="scope">
                    <el-button
                        @click="submit(scope.$index, scope.row)"
                        type="success"
                        size="small"
                    >发货</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="foot">
            <el-button size="mini" type="primary" class="goto" style="width:100px;" @click="goto">返回</el-button>
        </div>

        <placeOrder ref="placeOrder" @delet="delet"></placeOrder>
    </div>
</template>

<script>
import UploadExcelComponent from '../UploadExcel/index.vue';
import placeOrder from '../popup/placeOrder.vue';
export default {
    name: 'UploadExcel',
    components: { UploadExcelComponent, placeOrder },
    data() {
        return {
            tableData: [],
            tableHeader: [],
            customData: ''
        };
    },
    methods: {
        beforeUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 1;

            if (isLt1M) {
                return true;
            }

            this.$message({
                message: '请不要上传大于1m的文件',
                type: 'warning'
            });
            return false;
        },
        handleSuccess({ results, header }) {
            this.tableData = results;
            this.tableHeader = header;
            // console.log(results);
        },
        getCustomData(arg) {
            this.customData = arg;
        },
        submit(index, row) {
            this.$store.commit('setPopup', row);
            this.$refs.placeOrder.receipt();
            this.index = index;
        },
        //删除某行
        delet() {
            // delet tableData[this.index]
            this.tableData.splice(this.index, 1);
        },
        goto(){
            this.$emit("cancel")
        }
    }
};
</script>
<style lang="scss" scoped>
.foot{
    text-align: center;
    margin-top: 20px;
}

</style>