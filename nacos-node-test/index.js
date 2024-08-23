import Nacos from 'nacos'

const client = new Nacos.NacosNamingClient({
    serverList: ['127.0.0.1:8848'],
    namespace: 'public',
    logger: console
})

await client.ready()

const aaaServiceName = 'aaaService'

const instance1 =  {
    ip: '127.0.0.1',
    port: 8080
}

client.registerInstance(aaaServiceName, instance1)

const instance2 =  {
    ip: '127.0.0.1',
    port: 8081
}

client.registerInstance(aaaServiceName, instance2)
