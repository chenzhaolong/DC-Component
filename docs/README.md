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
####Condition组件
````
1，介绍：主要适用于条件判断；

2，固定属性： 
          createCondition：        函数，返回If和Else组件，spec={value},value是条件值
          If                       value为true时展示子组件
          Else                     value为false时展示子组件
````
####Fa-Icon组件
````
1，介绍：主要适用于图标；

2，固定属性： 
           icon：              图标类型

           color：             颜色
           
           fontSize：          大小
           
           className：         外部类选择器
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
````
####Loading组件
````
1，介绍：加载组件，一般用于加载或者等待异步请求返回的数据内使用，有两种模式，一种是给定的加载样式，一种是自定义加载样式

Loading的属性：
               type：         给定的加载样式的类型，总共有三种类型提供给使用哲使用：‘default’，‘jump’, 'flexible';
               
                   default: {
                       icon:     加载的图标，现在提供五种类型的图标：loading-one至loading-five,默认是loading-one;
                       txt：     自定义加载的文案
                   }
                  Demo：
                  <Loading 
                    type='default' 
                    icon='loading-two' 
                    txt='你好'
                    show={this.state.loadingDiv}
                  />   
                                  
                  jump: {
                      bollColor:  球的颜色(十六进制)；
                      speed：     弹跳的速度；
                  }
                  
                  Demo：
                  <Loading 
                     type='jump' 
                     bollColor='#123'
                     speed='12'
                      show={this.state.loadingDiv}
                   /> 
                  
                  注意：如果使用局部加载，则该类型必须要在至少大于300pd的高度使用才不会出现弹跳的球超出加载范围；
                  
                  Flexible： {
                      outerRadius： 外圈半径
                      innerRadius： 内圈半径
                      speed:        速度
                  }  

                  Demo：
                  <Loading 
                      outerRadius=‘12px’
                      innerRadius='8px'
                      speed='3'
                   /> 
               
               conponent:     自定义加载图案
               show:          是否展示加载组件
               beforeLoading：生命周期函数，加载前触发
               afterLoading： 生命周期函数。加载后触发
               
               局部加载：      必须在Loading的子元素中的根元素加上‘loading’的id值
               <Loading>
                  <div id='loading'>xxxx
               </Loading>
`````   

####Pop组件

````
1，介绍：主要适用气泡效果类的弹层

2，固定属性：

           trigger:    触发方式，默认是hover；

           title:      气泡中的标题；

           content:    气泡主题内容；

           placement:  气泡显示位置；

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
####Pagination组件
````    
1，介绍：只要用来翻页操作。

2，固定属性：
            total：           总页数
            pageSize：        每页大小
            changePage：      翻页时触发的事件
            pageNo：          页数
            layout：          布局，现在只支持‘total,jumper’
            showLongPage：    页数过长时展示，现在只支持‘scroll’
            cancelRelevance： pageNo改变时是否触发changePage事件，默认是true（废弃）
            
 demo：
             <Pagination
                         total='255'
                         pageSize='10'
                         changePage={page => console.log('pageNo', page)}
                         pageNo={this.state.pageNo}
                         layout="total,jumper"
                         showLongPage='scroll'
                         cancelRelevance={false}
                     />
         
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
               
     
````
####Step组件
````  

1，介绍：使用于动态变化的一系列状态节点；

Steps属性：
          curStatus:          当前节点状态
          direction:          状态表的展示方向
          curNodeName:        当前节点名
          statusMap:          状态映射表，{success: string || array, progress: 同左, error: 同左}
          distance:           状态线的长度
          onComplete:         整个状态表完成时的回调函数
          arriveSomeStep:     指定某个节点被成功激活时的回调，{nodeName: 节点， effect：回调函数，参数是当前节点的状态}
          changeStep:         每个节点变化时的回调，参数是curStatus, curNodeName
  
Step属性：
          nodeName:           该节点名
          title：             该节点的标题
          description:        该节点的描述
          
Demo:
                 <Steps
                             curStatus={this.state.step.status}
                             curNodeName={this.state.step.node}
                             statusMap={statusMap}
                             // direction='vertical'
                             distance='70'
                             onComplete={() => {
                                 console.log('complete');
                             }}
                             arriveSomeStep={{
                                 nodeName: 'a5',
                                 effect: (status) => {
                                     console.log('status', status);
                                 }
                             }}
                             changeStep={(a, b) => {
                                 console.log('a', a);
                                 console.log('b', b);
                             }}
                         >
                             <Step title='状态1状态' nodeName='a1' description='描述描述'/>
                             <Step title='状态2状态' nodeName='a2' description='描述描述'/>
                             <Step title='状态3状态' nodeName='a3' description='描述描述'/>
                             <Step title='状态4状态' nodeName='a4' description='描述描述'/>
                             <Step title='状态5状态' nodeName='a5' description='描述描述'/>
                         </Steps>
`````      
 ####Progress组件
 ````         
 1, 介绍：动态进度条（目前只有线条状）
 
 2，固定属性：
           precent：       当前进度数  
           width：         当前宽度
           height：        当前高度
           colors：        各状态的颜色值{success, error, progress, dangerous},只支持16进制
           isError：       进度是否出错
           textInside：    是否将文字放在进度条里面
           type：          line类型（line和circle）
           onSuccess：     到达100%时的回调
           iconSize：      icon的面积(只针对circle类型)
 
 demo：
             <Progress precent='70'
                       width='300px'
                       height='20px'
                       colors={{progress: 'yellow'}}
                       isError={false}
                       textInside={true}
             />
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