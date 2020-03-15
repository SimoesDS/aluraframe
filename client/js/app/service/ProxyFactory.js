class ProxyFactrory {
    
    static create(objeto, props, acao){
        
        return new Proxy(objeto, {
            get(target, prop, receiver) {
                if(props.includes(prop) && ProxyFactrory._isFunction(target[prop])) {
                    return function() {
                        Reflect.apply(target[prop], receiver, arguments);
                        return acao(target);
                    };
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                let returnValue = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop))
                    acao(arguments[0]);
                return returnValue
                
            }
        });
    }

    static _isFunction(func){
        return typeof func === 'function';
    }
}