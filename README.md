##**DC-ant**
````
简介：
    DC-ant是基于React的一套UI组件库,内部主要包含两部分：一部分是UI组件库；另一部分是基于该组件库的工具库。
````
####Button组件
````
1，介绍：主要适用于用户点击行为，随机触发业务功能；

2，固定属性： 
           type：              组件类型（'default', 'primary', 'dashed', 'danger'）

           icon：              图标
           
           disabled：          是否禁用
           
           className：         外部类选择器
           
           onClick：           点击事件
````


####Row和Col组件

````
介绍：布局的栅栏化系统

Row组件固定属性：
           className：         外部类名
           
           margin：            外边距（marginTop，marginBottom，marginLeft，marginRight）
           
           padding：           内边距（paddingTop，paddingBottom，paddingLeft，paddingRight）
           
           mode：              布局模式，已有的是flex弹性布局
           
Col组件固定属性：
           className:          外部类名
           
           span：              占几格
           
           order：             该行第几个          
````


####Icon组件

````
1，介绍：展示图标

2，固定属性：
          type：               图标类型
          
          width：              宽度
          
          height：             高度
````


####Pop组件

````
1，介绍：主要适用气泡效果类的弹层

2，固定属性：

           trigger:    触发方式，默认是hover；

           title:      气泡中的标题；

           content:    气泡主题内容；

           placement:  气泡显示位置；
````

####Modal组件
````
1，介绍：在处理事务中如果希望跳转页面以致打断工作流程时，可以使用Modal在当前页面正中打开一个浮层，承载相应的操作。
        并且通过confirm方法提供了五种不同的消息提示。

2，固定属性：

           visible（require）：         控制Modal是否展示

           musk:                       是否展示背景颜色，默认是true

           content（require）：         对话框正文

           title：                     对话框标题

           onCancel（require）：        取消回调

           onSure（require）：          确认回调

           confirmLoading：            确认后是否显示加载logo

           text：                      自定义取消和确认按钮文案

           confirm（spec）：            返回一个消息对话框

           spec：
                musk；content；title；onCancel；onSure；type：  success，error，info，question，warning
````

####Switch组件

````
1，介绍：表示需要开关状态/两种状态之间的切换时采用

2，固定属性：

          defaultChecked（require）：      默认值

          onChange：                      点击切换时触发的事件

          checkTxt：                      自定义打开时文案

          unCheckTxt：                    自定义关闭时文案
````

####Tab组件

````
介绍： 适用于根据选项切换不同的内容组件

Tabs组件固定属性：
               effectType：              tab组件的类型，background和slider两种类型
               
               activeId：                默认选中ID
               
               onChange：                切换tab时触发事件
               
               createTabPanel：          获取TabPanel组件
               
               activedColor：            选中tab的文字颜色
               
TabPanel组件固定属性：
               name：                    tab的内容
               
               order：                   tab的序号
               
               disabled：                tab是否禁止
````

####Transverter组件
````
1，介绍：数据转换器，适用于将不同类型的数据结构转换成指定组件内容适用的数据结构

2，固定属性：
           inputSource：           要转换的数据来源
           
           mapper：                转换的数据映射表，是一个数组，source表示要转换的字段名，targe表示目标字段名
           
           puppetmainsource：      如果该数据结构是二层数据结构，则需要将该数据中药转换的属性名赋予给太属性
           
           Puppet：                指定组件的构造器
           
           puppetmainprops：       指定组件接受外界数据的唯一接口
           
           puppetothersource：     指定组件其他与外界交互的属性
           
注意：该组件是适用于最多两层的数据结构，
    eg:  一层数据结构 {a:1,b:2}  不需要puppetmainsource属性
         二层数据结构 {a:1, b:{c:1}} 或者 {a:1,b:[{c:1}]} 需要puppetmainsource属性且为b
         
demo：
const personData = {
    code: 100,
    msg: 'success',
    show: {
        personName:'dragon',
        personage:"23",
        persondata: '2017.02.12',
        persontel: '2193213213',
        school: 'jnu',
        id: 1,
    }
};

const personMap = [
    {source: 'personName', target: 'name'},
    {source: 'personage', target: 'age'},
    {source: 'persondata', target: 'date'},
    {source: 'persontel', target: 'tel'},
    // {source: 'school', target: 'school'},
]

 <Transverter
  inputSource={personData}
  mapper={personMap}
  puppetmainsource="show"
  puppetmainprops="obj"
  puppetothersource={{className:"test-demo"}}
  Puppet={Test}
/>
class Test extends Component{
    render() {
        const {obj} = this.props;
        return (
            <div className={this.props.className}>
                <p>名字{obj.show.name}</p>
                <p>年龄{obj.show.age}</p>
                <p>出生{obj.show.date}</p>
                <p>电话{obj.show.tel}</p>
                <p>学历{obj.show.school}</p>
            </div>
        )
    }
}

最终渲染的组件为:<Test obj={转换后的数据} className="test-demo">
````
####BreadCrumb组件
````
1，介绍：面包屑组件，适用于多级子路由跳转

BreadCrumb固定属性：
               mode：            面包屑组件模式选择，默认是concentrate（路由集中处理），还有distribution（路由分散式处理）
               routes：          concentrate模式下必须存在，是路由匹配映射表
                    name:         该级名称
                    component：   该级名称组件形式
                    href：        完成的url
                    path：        相对路径
                    query：       查询字符串（对象）
                    hash:         希尔值
                    prefix：      路由前缀
                    className：   该路由自定义样式类名
               createItem：       静态方法；返回Item组件

Item组件固定属性：
               href：             该路由的url
               className：        该路由自定义样式类名
               route:             路由配置对象
                    href：        完成的url
                    path：        相对路径
                    query：       查询字符串（对象）
                    hash:         希尔值
                    prefix：      路由前缀
形式：
集中式：
                     const BreadRotes = [
                         {name: "一级路由", href: 'http://127.0.0.1:8089/one', className: "one"},
                         {name: "二级路由", path: "/one/two/three", query: {a1:1, a2: 2}, hash: "123", prefix: "data", className: "three"},
                         {name: "三级路由", href: 'http://127.0.0.1:8089/one/two', className: "two"},
                     ];
                     <Breadcrumb
                         mode="concentrate"
                         routes={BreadRotes}
                     />

分散式：
                   <Breadcrumb mode="distribution">
                       <Item href="http://127.0.0.1:8089/one" className="first">第一级</Item>
                       <Item href="http://127.0.0.1:8089/one/two" className="second">第二级</Item>
                       <Item href="http://127.0.0.1:8089/data/one/two/three?a1=1&a2=2#123">第三极</Item>
                   </Breadcrumb>
                      
````
####Menu组件
````
1，介绍：菜单栏组件，使用于侧边栏导航条

Mneu属性：
               className：         Menu组件的自定义样式
               bgColor：           Menu组件的背景颜色
               defaultOrder：      Menu组件的默认选中索引
               activeColor：       MenuItem组件激颜色
               activeTxtColor：    MenuItem组件激活文字颜色
               activeClass：       MenuItem组件的激活自定义类，该属性的优先级比activeColor和activeTxtColor高
               trigger：           Menu组件的触发方式
               onChange：          Menu组件选中时的回调
               openRoute：         Menu组件是否开启路由，开启后MenuItem中的路由才有效
               width：             Menu组件的宽度
               createItem：        静态方法，返回MenuItem组件
               createSubGroup：    静态方法，返回SubGroup组件
          
MenuItem属性：
               order：             组件的索引值
               className：         组件自定义类名
               disabled：          组件是否被禁用
               route：             路由
               
SubGroup属性：
               label：             该组名称
               order：             该组索引
               
Demo：
                <Menu
                    className="dc-demo"
                    bgColor='#5d5d5d'
                    defaultOrder='2'
                    activeColor='#e7f7ff'
                    activeTxtColor='blue'
                    // activeClass='win'
                    trigger='hover'
                    onChange={order => console.log(order)}
                    openRoute={true}
                    width='275'
                >
                    <MenuItem order='1'>
                        <OptionA/>
                    </MenuItem>
                    <MenuItem order='2' className='ca'>optionB</MenuItem>
                    <MenuItem order='3' disabled={true} route='/three'>optionC</MenuItem>
                    <SubGroup label='选项一' order='4'>
                        <MenuItem order='4.1'>optionD1</MenuItem>
                        <MenuItem order='4.2'>optionD2</MenuItem>
                    </SubGroup>
                    <SubGroup label='选项' order='5'>
                        <MenuItem order='5.1'>optionE</MenuItem>
                        <MenuItem order='5.2'>optionF</MenuItem>
                        <SubGroup label='选项1' order='5.3'>
                            <MenuItem order='5.3.1'>optionF</MenuItem>
                        </SubGroup>
                    </SubGroup>
                </Menu>
