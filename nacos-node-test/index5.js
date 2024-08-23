import { NacosConfigClient } from 'nacos'

const client = new NacosConfigClient({
    serverAddr: 'localhost:8848',
})

const content = await client.publishSingle('config', 'DEFAULT_GROUP', '{"host":"127.0.0.1","port":8848}')

client.subscribe({ dataId: 'config', group: 'DEFAULT_GROUP' },
    content => {
        console.log(content)
    }
)

setTimeout(() => {
    client.publishSingle('config', 'DEFAULT_GROUP', '{"host":"127.0.0.1","port":5000}')
}, 3000)

// await client.remove('config', 'DEFAULT_GROUP')

// const config = await client.getConfig('config', 'DEFAULT_GROUP')

// console.log(config)


