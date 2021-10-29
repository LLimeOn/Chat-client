const express = require('express')
const app = express()

const PORT = process.env.PORT || 8080

app.use(express.static(__dirname + '/public')); //__dir and not _dir

app.listen(PORT, () => {
	console.log("server has been started...")
})