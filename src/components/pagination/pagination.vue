<template>
  <div class="pagination-container">
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
    background-color: #31755d !important; //修改默认的背景色
  }
}

.el-pagination {
  --el-pagination-hover-color: #31755d;
}
</style>  