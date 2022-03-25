const fs = require('fs')

const getFile = (fileName) => {
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, (err, data) => {
			if (err) {
				reject(err) // 调用 `reject` 会导致 promise 失败，无论是否传入错误作为参数，
				return // 且不再进行下去。
			}
			resolve(data)
		})
	})
}

getFile('/etc/passwd')
	.then((data) => console.log(data))
	.catch((err) => console.log(err))
