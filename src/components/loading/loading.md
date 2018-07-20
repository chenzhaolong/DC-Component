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