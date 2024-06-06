<template>
  <div>
    <h2 class="font-bold" text="center 8 xl:left">登录</h2>
    <a-form class="w-full" :model="form" @submit="submit">
      <a-form-item v-bind="validateInfos.userName">
        <a-input v-model:value="form.userName" placeholder="账号" size="large"></a-input>
      </a-form-item>
      <a-form-item v-bind="validateInfos.password">
        <a-input v-model:value="form.password" placeholder="密码" size="large"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="w-full" size="large">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import type { FormProps } from 'ant-design-vue'
import { useForm } from 'ant-design-vue/es/form'
import { ref, unref } from 'vue'
import { useRouter } from 'vue-router'

const form = ref({
  userName: '',
  password: ''
})
const rules = ref({
  userName: [
    {
      required: true,
      message: '请输入账号'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ]
})

const router = useRouter()

const { validate, validateInfos } = useForm(form, rules)

const submit: FormProps['onSubmit'] = () => {
  validate().then(() => {
    // TODO：登录接口
    const formValue = unref(form)
    const userStore = useUserStore()
    userStore.setToken(formValue.userName + '/' + formValue.password)
    router.push('/')
  })
}
</script>

<style scoped></style>