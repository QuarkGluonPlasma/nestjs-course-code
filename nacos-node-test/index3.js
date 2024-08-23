import Nacos from 'nacos'

const client = new Nacos.NacosNamingClient({
    serverList: ['127.0.0.1:8848'],
    namespace: 'public',
    logger: console
})

await client.ready()

const instances = await client.getAllInstances('aaaService');

console.log(instances);