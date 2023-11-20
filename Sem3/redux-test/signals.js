
export class Signal {
    _value
    dependencies

    constructor(initValue) {
        this.dependencies = new Set()
        this._value = initValue
    }

    get value() {
        if (RUNNING) {
            this.dependencies.add(RUNNING)
        }
        return this._value
    }

    set value(newValue) {
        if (this._value === newValue) {
            return
        }
        this._value = newValue
        this.notify()
    }

    notify() {
        for (const dependency of this.dependencies) {
            dependency.update()
        }
    }
}

export class Computed {
    _value
    computeFn
    isStale

    constructor(computeFn) {
        this.computeFn = computeFn
        this.isStale = true
        runAndExtractDependencies(this)
    }

    get value() {
        if (this.isStale) {
            this._value = this.computeFn()
            this.isStale = false
        }
        return this._value
    }

    execute() {
        this.computeFn()
    }

    update() {
        this.isStale = true
    }
}

export class Effect {
    effectFn

    constructor(effectFn) {
        this.effectFn = effectFn
        runAndExtractDependencies(this)
    }

    execute() {
        this.effectFn()
    }

    update() {
        this.execute()
    }
}

let RUNNING = null

function runAndExtractDependencies(task) {
    RUNNING = task
    task.execute()
    RUNNING = null
}