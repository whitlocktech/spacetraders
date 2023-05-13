const agentDatabase = require('./agent.mongo')
require('dotenv').config()
const baseUrl = process.env.SPACETRADER_BASE_URL

async function createAgent(agent) {
    const url = `${baseUrl}/users/register`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: '{"faction": "cosmic", "symbol" ' + agent + '"}'
    }
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        if (!data.data.token)
            console.log('Error creating agent')
        else {
            const username = req.session.username
            const token = data.data.token
            agentDatabase.create({
                username,
                token
            })
            agentDatabase.save()
        }
    } catch (error) {
        console.error(error)
    }
}

async function getAgentTokenByUsername(username) {
    const agent = await agentDatabase.findOne({ username })
    return agent.token
}

async function updateAgentByUsername(username) {
    const url = `${baseUrl}/v2/my/agent`
    const token = await getAgentTokenByUsername(username)
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        await agentDatabase.findOneAndUpdate({ username }, {
            ships: data.data.ships,
            credits: data.data.credits,
            headquarters: data.data.headquarters
        })
        return data.data
    } catch (error) {
        console.error(error)
    }


}


module.exports = {
    createAgent,
    getAgentById
}
