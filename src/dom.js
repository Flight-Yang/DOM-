window.dom = {
    create(string){
        //container 表示容器  template可以容纳任意一标签
        const container = document.createElement("template")
        container.innerHTML = string.trim();//trim()表示把标签两边的空格去掉
        //用template从容器里取出必须加上 .content
        return container.content.firstChild;
    },
    after(node,node2){  //节点后加入节点,过程是调用节点的父亲,用insertBefore方法把要插入的节点插入被插入节点的下一个节点的前面
        node.parentNode.insertBefore(node2,node.nextSibling);
    },
    before(node,node2){ //往前插入节点
        node.parentNode.insertBefore(node2,node);
    },
    append(parent,node){ //插入子节点
        parent.appendChild(node);
    },
    wrap(node,parent){ //插入父节点
        dom.before(node,parent); //先把节点放在子节点的前面
        dom.append(parent,node); //然后把子节点插入父节点
    },
    remove(node){ //删除节点
        node.parentNode.removeChild(node);
        return node; //为了防止node节点引用
    },
    empty(node){  //删除某节点上所有的子节点
        const array = [];
        let x = node.firstChild;
        while(x){  //如果x存在，就在dom上删除掉这个结点，并push到array数组里面
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array;
    },
    attr(node,name,value){ //修改标签属性
        if(arguments.length === 3){
            node.setAttribute(name,value);
        }else if(arguments.length === 2){
            return node.getAttribute(name)
        }
    },
    text(node,string){ //修改文本信息  重载
        if(arguments === 2){
            if('innerText' in node){
                node.innerText = string;
            }else{
                node.textContent = string;
            }
        }else if(arguments === 1){
            if('innerText' in node){
               return node.innerHTML
            }else{
                return node.textContent
            }
        }
    },
    html(node,string){ //修改标签内容 适配
        if(arguments === 2){
            node.innerHTML = string
        }else if(arguments === 1){
            return node.innerHTML; 
        }
    },
    style(node,name,value){ //改变节点样式
        if(arguments === 3){
            node.style[name] = value
        }else if (arguments === 2){
            if(typeof node === 'string'){
                return node.style[name]
            }else if(node instanceof Object){
                for(let key in node){
                    node.style[key] = node[key]
                }
            }
        }
    },
    class:{ //修改className
        add(node,className){
            node.classList.add(className)
        },
        remove(node,className){
            node.classList.remove(className)
        },
        has(node,className){ //判断node节点里是否存在这个className
            return node.classList.container(className)
        }
    },
    on(node,eventName,fn){ //添加监听
        node.addEventListener(eventName,fn)
    },
    off(node,eventName,fn){ //删除监听
        node.removeEventListener(eventName,fn)
    },
    find(selector,scope){ // 查找某节点 选择器 和范围  如果查找的结点属于哪个范围，就到scope范围里面找，如果没有，就到document里面找
        return (scope|| document).querySelectorAll(selector)
    },
    parent(node){
        return node.parentNode
    },
    children(node){
        return node.children
    },
    siblings(node){ //查找兄弟结点
        //filter 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        return Array.from(node.parentNode.children).filter(n => n!==node)
    },
    next(node){ 找结点的下一个节点
        let x = node.nextSibling
        while(x && x.nodeType === 3){ //如果节点的下个节点时空格文本，就找在下面一个节点
            x = x.nextSibling
        }
        return x
    },
    each(nodeList,fn){ //遍历所有节点
        for(let i= 0 ;i<nodeList.length;i++){
            fn.call(null,nodeList[i])
        }
    },
    index(node){//获取节点的排行
        const list = dom.children(node.parentNode); //找到父节点所有的子节点
        let i 
        for (i =0;i < list.length;i++) { //遍历父节点里所有的子节点,轮到几就是几
            if(list[i] === node){
                break
            }
        }
        return i;
    }
}