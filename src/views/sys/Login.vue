<template>
  <div class="h-full flex">
    <div class="h-full login-bg w-1/2">
      <div class="h-full pl-132px relative text-white">
        <h1 class="absolute top-0 h-80px flex items-center text-32px font-bold">
          <img src="@/assets/images/logo.png" class="size-48px" />
          <span class="ml-8px">My Project</span>
        </h1>
        <div class="h-full flex flex-wrap content-center">
          <div class="w-full">
            <img src="@/assets/svg/login-box-bg.svg" class="h-165px" />
          </div>
          <div class="w-full text-24px mt-52px">
            Vue3 + Ts + Vue-Router + Pinia + Ant-design-vue
          </div>
          <div class="w-full mt-16px">输入您的个人详细信息开始使用！</div>
        </div>
      </div>
    </div>
    <div class="h-full w-1/2">
      <div class="h-full pr-132px relative">
        <div class="h-full w-450px mx-auto flex flex-wrap content-center">
          <h2 class="w-full text-32px font-bold">登录</h2>
          <a-form class="w-full" :model="form" @submit="submit">
            <a-form-item v-bind="validateInfos.userName">
              <a-input v-model:value="form.userName" placeholder="账号" size="large"></a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.password">
              <a-input v-model:value="form.password" placeholder="密码" size="large"></a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.remember">
              <div class="flex justify-between items-center">
                <a-checkbox v-model:check="form.remember" size="large">记住我</a-checkbox>
                <a-button type="link" size="large">忘记密码</a-button>
              </div>
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
import { useAppStore } from '@/stores/app'
import type { FormProps } from 'ant-design-vue'
import { useForm } from 'ant-design-vue/es/form'
import { ref, unref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const form = ref({
  userName: '',
  password: '',
  remember: false
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
    const appStore = useAppStore()
    appStore.setToken(formValue.userName + '/' + formValue.password)
    router.push('/')
  })
}
</script>

<style scoped>
.login-bg {
  background: url('@/assets/svg/login-bg.svg') 100% / auto 100% no-repeat;
}
</style>
