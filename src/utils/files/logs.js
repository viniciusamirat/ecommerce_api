const { appendFile } = require('fs')

const writeLog = (fileName, content)=>{
  const utcDate = new Date().toUTCString()

  const newContent = `"${content}" - ${utcDate}\n`

  return new Promise((resolve, reject)=>{

    appendFile(`./src/logs/${fileName}`, newContent, (err)=>{

      if (err) return reject(err)

      return resolve()

    })

  })

}

module.exports = {
  writeLog
}