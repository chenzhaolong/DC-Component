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