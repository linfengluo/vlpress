# vlpress
long press for vue

# intro
vue 自定义指令 - 长按

# use

```
npm i vlpress -S

import vlpress from 'vlpress'
import Vue from 'vue'

Vue.use(vlpress, options)

<div v-longPress="Callback Function">长按</div>
```

# options

```
defaultOptions = {
    interval: 1000,                         //长按间隔时间 毫秒
    autoHandle: true,                       //自动触发长按回调
    isHideDefaultMenu: true,                //隐藏长按菜单
}
```