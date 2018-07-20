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