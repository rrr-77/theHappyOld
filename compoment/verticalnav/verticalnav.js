// compoment/Verticalnav/verticalnav.js
const app = getApp()
Component({
  /*组件的属性列表*/
  properties: {},
  /*组件的初始数据*/
  data: {
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load:true
  },
  attached:function(){
    let list = [{}];
    for (let i = 0; i < 26; i++) {
      list[i] = {};
      list[i].name = String.fromCharCode(65 + i);
      list[i].id = i;
    }
    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  /*组件的方法列表*/
  methods: {
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        MainCur: e.currentTarget.dataset.id,
        VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
      })
    },
    VerticalMain(e) {
      let that = this;
      let list = this.data.list;
      let tabHeight = 0;
      if (this.data.load) {
        for (let i = 0; i < list.length; i++) {
          let view = wx.createSelectorQuery().select("#main-" + list[i].id);
          view.fields({
            size: true
          }, data => {
            list[i].top = tabHeight;
            //tabHeight = tabHeight + data.height;
            list[i].bottom = tabHeight;     
          }).exec();
        }
        that.setData({
          load: false,
          list: list
        })
      }
      let scrollTop = e.detail.scrollTop + 20;
      for (let i = 0; i < list.length; i++) {
        if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
          that.setData({
            VerticalNavTop: (list[i].id - 1) * 50,
            TabCur: list[i].id
          })
          return false
        }
      }
    }
  }
})