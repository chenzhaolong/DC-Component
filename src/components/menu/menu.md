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