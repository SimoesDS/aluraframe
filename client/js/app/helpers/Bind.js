class Bind {

    constructor(model, view, ...props) {

        view.update(model);
        return ProxyFactrory.create(
            model,
            props,
            m => view.update(m)
        );
    }
}