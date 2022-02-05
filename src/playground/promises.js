const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve({
        //     name: 'franchise',
        //     age: 10
        // })
        reject('something went wrong')
    },2000)
})

console.log('before')

promise.then((data) => {
    console.log(data)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('this is my second promise call')
        },2000)
    })
}).then((str)=> {
    console.log('does this run', str)
}).catch((error) => {
    console.log('error:', error)
})

console.log('after')
