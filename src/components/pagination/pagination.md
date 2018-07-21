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