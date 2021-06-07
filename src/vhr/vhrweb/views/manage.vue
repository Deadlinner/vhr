<template>
  <div id="manage-ctx">
    <el-container>
      <el-aside width="12%">
        <el-menu unique-opened background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 @select="clickMenuItem">
          <aside-menu v-for="(menu1,i) in menus" :key="i" :menu="menu1"></aside-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <com-head></com-head>
        </el-header>
        <el-main>
          <el-tabs v-model="editableTabsValue" type="card" closable @tab-click="handleTabsClick" @edit="handleTabsEdit">
            <el-tab-pane
                :key="item.name"
                v-for="(item, index) in editableTabs"
                :label="item.title"
                :name="item.name">
              <!-- 失活的组件将会被缓存！-->
<!--              <keep-alive>-->
                <component v-bind:is="currentTabComponent">1</component>
<!--              </keep-alive>-->
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
const AsideMenu = () =>  import('../component/common/Aside')
const ComHead = () =>  import('../component/common/Head')
import menu from '../../../mock/MenuNav'

export default {
  name: "manage",
  components:{
    AsideMenu,
    ComHead
  },
  data(){
    return {
      menus: menu,
      editableTabsValue: '1',
      editableTabs: [{
        title: '控制台',
        name: 'platform',
        content: 'platform'
      }],
      tabIndex: 2,
      currentTabComponent: '',
      arrTabComponent: []
    }
  },
  methods:{
    /*菜单点击事件
    * 只有叶子节点的菜单被点击时才会触发此事件
    * index： 受点击菜单的 index值
    * indexPath: 受点击菜单的路径及其所有父级菜单的路径 de 数组*/
    /* 这里触发异步加载组件逻辑*/
    clickMenuItem(index, indexPath){
      //判断index的组件是否已经加载
      //如果是用promise的话，就不用判断是否加载了

      let ActiveCp = () => ({
        component: import("." + index)
            .then(function (res) {
            //   if (curCp.newComponentName) {
            //   res.default.name = curCp.newComponentName
            // } ;
              console.log(res)
              return res.default;
            })
            .catch(function (e) {
            }),
        delay: 200,
        timeout: 30000,
      });

      this.currentTabComponent = ActiveCp
      this.arrTabComponent[index] = ActiveCp
      let isExist = this.editableTabs.some( item =>
        item.name == index
      )
      if(isExist){
        this.editableTabsValue = index;
        this.currentTabComponent = this.arrTabComponent[index]
      }else{
        this.handleTabsEdit(index, 'add')
      }
    },
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        //需要获取targetName所代表的菜单中文名
        let targetNameZH = this.getTargetNameZH((this.menus), targetName)
        if(this.editableTabs)
        this.editableTabs.push({
          title: targetNameZH,
          name: targetName
        });
        this.currentTabComponent = this.arrTabComponent[targetName]
        this.editableTabsValue = targetName;
      }
      if (action === 'remove') {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
    handleTabsClick(tab){
      this.currentTabComponent = this.arrTabComponent[tab.name]
    },

    getTargetNameZH(menus, targetName) {
      let targetNameZH

      for (let i in menus) {
        if(menus[i].path == targetName){
          targetNameZH = menus[i].nameZh

        }else if(menus[i].children != null){
          let tempName = this.getTargetNameZH(menus[i].children, targetName)
          if(!!tempName){
            targetNameZH = tempName
          }
        }
      }
      return targetNameZH
    }
  }
}
</script>

<style scoped>

</style>