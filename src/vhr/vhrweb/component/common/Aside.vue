<template>
    <div>
      <!--叶子级菜单-->
      <template v-if="menuItems.children && menuItems.children.length === 0">
        <el-menu-item :key="menuItems.id" :index="menuItems.path">
          {{menuItems.nameZh}}
        </el-menu-item>
      </template>
      <!--父级菜单-->
      <el-submenu v-else :index="menuItems.path" style="text-align: left">
      <span slot="title" style="font-size: 17px;">
        <i :class="menuItems.iconCls"></i>
        {{menuItems.nameZh}}
      </span>
        <template v-for="child in menuItems.children">
          <aside-menu v-if="child.children && child.children.length>0" :key="child.id" :menu="child"/>
          <el-menu-item v-else :key="child.id" :index="child.path">
            <i :class="child.icon"></i>
            {{child.nameZh}}
          </el-menu-item>
        </template>
      </el-submenu>
    </div>
</template>

<script>
export default {
  name: "AsideMenu",
  props: {
    menu: {
      type: Object
    }
  },
  computed:{
    menuItems:function (param) {
      return this.menu
    }
  }
}
</script>

<style scoped>

</style>