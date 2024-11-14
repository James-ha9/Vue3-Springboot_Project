<template>
  <div class="custom-pagination">
    <div class="pagination-wrapper">
      <div class="total-info">
        共 {{ total }} 件展品
      </div>
      <div class="page-controls">
        <button 
          class="page-btn" 
          :disabled="currentPage === 1"
          @click="handlePrevPage"
        >
          <el-icon><ArrowLeft /></el-icon>
        </button>
        
        <div class="page-numbers">
          <span 
            v-for="page in displayPages" 
            :key="page"
            class="page-number"
            :class="{ active: page === currentPage }"
            @click="handlePageClick(page)"
          >
            {{ page }}
          </span>
        </div>
        
        <button 
          class="page-btn" 
          :disabled="currentPage === totalPages"
          @click="handleNextPage"
        >
          <el-icon><ArrowRight /></el-icon>
        </button>
      </div>
      
      <div class="page-size-selector">
        <span>每页显示：</span>
        <el-select 
          v-model="localPageSize" 
          @change="handleSizeChange"
          size="small"
        >
          <el-option
            v-for="size in pageSizes"
            :key="size"
            :label="`${size}件`"
            :value="size"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';

const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  },
  pageSizes: {
    type: Array,
    default: () => [12, 24, 36, 48]
  }
});

const emit = defineEmits(['update:currentPage', 'update:pageSize', 'size-change', 'current-change']);

const localPageSize = ref(props.pageSize);

const totalPages = computed(() => Math.ceil(props.total / props.pageSize));

const displayPages = computed(() => {
  const current = props.currentPage;
  const total = totalPages.value;
  const pages = [];
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    }
  }
  
  return pages;
});

const handlePageClick = (page) => {
  if (page !== '...') {
    emit('update:currentPage', page);
    emit('current-change', page);
  }
};

const handlePrevPage = () => {
  if (props.currentPage > 1) {
    handlePageClick(props.currentPage - 1);
  }
};

const handleNextPage = () => {
  if (props.currentPage < totalPages.value) {
    handlePageClick(props.currentPage + 1);
  }
};

const handleSizeChange = (size) => {
  emit('update:pageSize', size);
  emit('size-change', size);
};

watch(() => props.pageSize, (newSize) => {
  localPageSize.value = newSize;
});
</script>

<style scoped>
.custom-pagination {
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.total-info {
  color: #666;
  font-size: 0.9rem;
}

.page-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-btn {
  background: transparent;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:not(:disabled):hover {
  background: #f0f7ff;
  border-color: #409eff;
  color: #409eff;
}

.page-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.page-numbers {
  display: flex;
  gap: 4px;
}

.page-number {
  min-width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
}

.page-number:not(.active):hover {
  background: #f0f7ff;
  color: #409eff;
}

.page-number.active {
  background: #4caf50;
  color: white;
}

.page-size-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.page-size-selector :deep(.el-select) {
  width: 100px;
}

@media (max-width: 768px) {
  .pagination-wrapper {
    flex-direction: column;
    gap: 1rem;
  }
  
  .page-controls {
    order: 1;
  }
  
  .total-info {
    order: 2;
  }
  
  .page-size-selector {
    order: 3;
  }
}
</style> 