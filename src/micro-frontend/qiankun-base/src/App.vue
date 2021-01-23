<template>
  <div id="app">
    <el-menu :router="true" mode="horizontal">
      <el-menu-item index="/">
        Home
      </el-menu-item>
      <el-menu-item index="/vue">
        vue 子应用
      </el-menu-item>
      <el-menu-item index="/react">
        react 子应用
      </el-menu-item>
    </el-menu>
    <router-view v-show="$route.name"></router-view>
    <div v-show="!$route.name" id="vue"></div>
    <div v-show="!$route.name" id="react"></div>
  </div>
</template>

