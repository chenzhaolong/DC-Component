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