import merge from 'lodash'

process.env.NODE_ENV = process.env.NODE_ENV || "developement"
const stage = process.env.stage || 'local'

let envConfig

if(stage == 'production'){
    envConfig = require('./prod').default
}else if(stage === 'testing'){
    envConfig = require('./testing').default
} else{
    envConfig = require('./local').default
}

export default merge({
    port:process.env.PORT
},envConfig)
