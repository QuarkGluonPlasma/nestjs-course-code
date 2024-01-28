const OSS = require('ali-oss')

const client = new OSS({
    region: 'oss-cn-beijing',
    bucket: 'guang-666',
    accessKeyId: '',
    accessKeySecret: '',
});

async function put () {
  try {
    const result = await client.put('smile.png', './smile.png');
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

// put();

async function get() {
    await client.get('smile.png', '666.png');
}

get();