export class ConnectionPromise {
    constructor (conn) {
        this._conn = conn
    }

    connSize (fileUrl) {
        const _this =  this
        return new Promise(function(resolve, reject) {
            _this.conn.size(fileUrl, (err, bytes) => {
                if(!err) resolve(bytes)
                else reject(err)
            })
        })
    }
    connGet (fileUrl) {
        const _this =  this
        return new Promise(function(resolve, reject) {
            _this.conn.get(fileUrl, (err, stream) => {
                if(!err) resolve(stream)
                else reject(err)
            })
        })
    }


    get conn() {
        return this._conn
    }

}

export class StreamPromise {
    constructor(stream) {
        this._stream = stream
    }

    once(type) {
        const _this =  this
        return new Promise(function(resolve) {
            _this.stream.once(type, () => {
                resolve()
            })
        })
    }

    get stream() {
        return this._stream
    }
}