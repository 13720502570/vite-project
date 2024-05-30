<template>
  <div class="h-full">
    <a-space>
      <a-button type="primary" @click="testApi">testApi</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { message, type ButtonProps } from 'ant-design-vue'
import { http } from '@/utils/http'
import { rsaEncrypt } from '@/utils/rsa'

interface LoginParams {
  account: string
  loginType: string
  password: string
}

const testApi: ButtonProps['onClick'] = () => {
  const params: LoginParams = {
    account: 'fengjiangqi',
    loginType: 'NameAndPwd',
    password: rsaEncrypt('12345678')
  }
  http.post('/DxUserAccount/auth/login', params, {
    baseURL: 'http://106.52.93.192:9002'
  }).then((res) => {
    message.success('接口调用成功！')
    console.log(res, 'test')
  })
}
</script>

<style scoped></style>
