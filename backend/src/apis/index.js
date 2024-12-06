const registerEndPoint = require('./register')
const loginEndPoint = require('./login')
const messageEndPoint = require('./message')
const userEndPoint = require('./user')
const chatbotEndpoint = require('./chatbot')

function api(app) {

    app.post('/api/v1/register', registerEndPoint)
    
    app.post('/api/v1/login', loginEndPoint)
    app.get('/api/v1/login', loginEndPoint)

    app.use('/api/v1/message', messageEndPoint)

    app.use('/api/v1/user', userEndPoint)

    app.use('/api/v1/chatbot', chatbotEndpoint)
}

module.exports = api