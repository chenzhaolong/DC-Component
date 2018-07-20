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