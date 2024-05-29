<template>
  <div class="login-com relative h-full px-16">
    <div class="h-full mx-auto relative" xl="w-1280">
      <AppLogo class="xl:hidden" />
      <div class="h-full">
        <div class="h-full flex">
          <div class="hidden" xl="flex h-full w-1/2 text-white">
            <AppLogo />
            <div class="h-full flex flex-wrap content-center">
              <div class="w-full">
                <img src="@/assets/svg/login-box-bg.svg" class="h-165" />
              </div>
              <div class="w-full text-24 mt-52">Vue3 + Ts + Vue-Router + Pinia + Ant-design-vue</div>
              <div class="w-full mt-16">输入您的个人详细信息开始使用！</div>
            </div>
          </div>
          <div class="size-full flex" xl="w-1/2">
            <div class="rounded-3xl w-full mx-auto my-auto bg-white px-20 py-32" md="w-1/2" xl="flex-1 ml-64 mr-100">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLogo from './login/AppLogo.vue'
import LoginForm from './login/LoginForm.vue';
</script>

<style lang="less" scoped>
.login-com {
  @media (max-width: 1280px) {
    background: #293146;
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    margin-left: -48%;
    background: url('@/assets/svg/login-bg.svg') 100% / auto 100% no-repeat;

    @media (max-width: 1280px) {
      display: none;
    }
  }
}
</style>
