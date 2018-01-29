#DC-ant
###简介
略

###Button组件

```


###Row和Col组件

```


###Icon组件

```


###Pop组件

```
1，介绍：主要适用气泡效果类的弹层

```
2，固定属性：

```
           trigger:    触发方式，默认是hover；

           ```
           title:      气泡中的标题；

           ```
           content:    气泡主题内容；

           ```
           placement:  气泡显示位置；

           ```
###Modal组件

```
1，介绍：在处理事务中如果希望跳转页面以致打断工作流程时，可以使用Modal在当前页面正中打开一个浮层，承载相应的操作。
        并且通过confirm方法提供了五种不同的消息提示。

```
2，固定属性：

```
           visible（require）：         控制Modal是否展示

           ```
           musk:                       是否展示背景颜色，默认是true

           ```
           content（require）：         对话框正文

           ```
           title：                     对话框标题

           ```
           onCancel（require）：        取消回调

           ```
           onSure（require）：          确认回调

           ```
           confirmLoading：            确认后是否显示加载logo

           ```
           text：                      自定义取消和确认按钮文案

           ```
           confirm（spec）：            返回一个消息对话框

           ```
           spec：

           ```
                musk

                ```
                content

                ```
                title

                ```
                onCancel

                ```
                onSure

                ```
                type：  success，error，info，question，warning

                ```