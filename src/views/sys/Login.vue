<template>
  <div class="h-full flex">
    <div class="h-full login-bg w-1/2">
      <div class="h-full pl-132 relative text-white">
        <h1 class="absolute top-0 h-80 flex items-center text-32 font-bold">
          <img src="@/assets/images/logo.png" class="size-48" />
          <span class="ml-8">My Project</span>
        </h1>
        <div class="h-full flex flex-wrap content-center">
          <div class="w-full">
            <img src="@/assets/svg/login-box-bg.svg" class="h-165" />
          </div>
          <div class="w-full text-24 mt-52">Vue3 + Ts + Vue-Router + Pinia + Ant-design-vue</div>
          <div class="w-full mt-16">输入您的个人详细信息开始使用！</div>
        </div>
      </div>
    </div>
    <div class="h-full w-1/2">
      <div class="h-full pr-132 relative">
        <div class="h-full w-450 mx-auto flex flex-wrap content-center">
          <h2 class="w-full text-32 font-bold">登录</h2>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import type { FormProps } from 'ant-design-vue'
import { useForm } from 'ant-design-vue/es/form'
import { ref, unref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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

<style scoped>
.login-bg {
  background: url('@/assets/svg/login-bg.svg') 100% / auto 100% no-repeat;
}
</style>
