<template>
  <div class="h-full">
    <a-button type="primary" @click="add">Add</a-button>
    <a-button type="primary" @click="remove">Remove</a-button>
    <a-table
      :data-source="dataSource"
      :columns="columns"
      :pagination="pagination"
      :scroll="{ y: 'calc(100vh - 140px)' }"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      @change="change"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button type="primary" @click="edit(record)">Edit</a-button>
        </template>
      </template>
    </a-table>
    <a-modal :open="open" @cancel="cancel" @ok="ok">
      <a-form :model="form">
        <a-form-item label="姓名">
          <a-input v-model:value="form!.name" />
        </a-form-item>
        <a-form-item label="年龄">
          <a-input v-model:value="form!.age" />
        </a-form-item>
        <a-form-item label="住址">
          <a-input v-model:value="form!.address" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type {
  TableColumnProps,
  TablePaginationConfig,
  TableProps,
  ButtonProps,
  ModalFuncProps,
  FormProps
} from 'ant-design-vue'
import type { Key, TableRowSelection } from 'ant-design-vue/es/table/interface'

const columns = ref<TableColumnProps[]>([
  { title: '操作', key: 'action', dataIndex: 'action', align: 'center' },
  { title: '姓名', key: 'name', dataIndex: 'name', align: 'center' },
  { title: '年龄', key: 'age', dataIndex: 'age', align: 'center' },
  { title: '住址', key: 'address', dataIndex: 'address', align: 'center' }
])
let dataSource = ref<TableProps['dataSource']>([])

const pagination = ref<TablePaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0
})

onMounted(() => {
  dataSource.value = Array.from({ length: 100 }, (_, index) => ({
    key: index,
    name: 'name' + index,
    age: index,
    address: 'address' + index
  }))
  pagination.value.total = dataSource.value.length
})

const selectedRowKeys = ref<Key[]>([])

const add: ButtonProps['onClick'] = () => {
  open.value = true
}

const remove: ButtonProps['onClick'] = () => {
  dataSource.value = dataSource.value!.filter((v) => !selectedRowKeys.value.includes(v.key))
  pagination.value.total = dataSource.value.length
}

const edit: ButtonProps['onClick'] = (row) => {
  open.value = true
  form.value = Object.assign({}, form.value, row)
}

const change: TableProps['onChange'] = (p) => {
  pagination.value = p
}

const onSelectChange: TableRowSelection['onChange'] = (keys) => {
  selectedRowKeys.value = keys
}

const open = ref(false)

const form = ref<FormProps['model']>({})

const cancel: ModalFuncProps['onCancel'] = () => {
  open.value = false
}

const ok: ModalFuncProps['onOk'] = () => {
  if (form.value!.key !== 'undefined' && form.value!.key !== null) {
    const index = dataSource.value?.findIndex((v) => v.key === form.value!.key)!
    dataSource.value?.splice(index, 1, form.value)
  } else {
    dataSource.value?.unshift(form.value)
  }
  open.value = false
}
</script>

<style scoped></style>
