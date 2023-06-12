import Redis from "ioredis";

const redis = new Redis();

// redis.set("mykey", "value");

const res = await redis.keys('*');

console.log(res);

// , (err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result); // Prints "value"
//   }
// });

// redis.get("mykey").then((result) => {
//   console.log(result); // Prints "value"
// });

// redis.zadd("sortedSet", 1, "one", 2, "dos", 4, "quatro", 3, "three");
// redis.zrange("sortedSet", 0, 2, "WITHSCORES").then((elements) => {
//   // ["one", "1", "dos", "2", "three", "3"] as if the command was `redis> ZRANGE sortedSet 0 2 WITHSCORES`
//   console.log(elements);
// });

// // All arguments are passed directly to the redis server,
// // so technically ioredis supports all Redis commands.
// // The format is: redis[SOME_REDIS_COMMAND_IN_LOWERCASE](ARGUMENTS_ARE_JOINED_INTO_COMMAND_STRING)
// // so the following statement is equivalent to the CLI: `redis> SET mykey hello EX 10`
// redis.set("mykey", "hello", "EX", 10);