const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/guang');

  const PersonSchema = new mongoose.Schema({
    name: String,
    age: Number,
    hobbies: [String]
  });

  const Person = mongoose.model('Person', PersonSchema);

//   const guang = new Person();
//   guang.name = 'guang';
//   guang.age = 20;

//   await guang.save();

//   const dong = new Person();
//   dong.name = 'dong';
//   dong.age = 21;
//   dong.hobbies = ['reading', 'football']

//   await dong.save();

  const persons = await Person.find(
    {
        // $and: [{age: { $gte: 20 }}, { name: /dong/}]
        age: { $in: [20, 21]}
    }
  );
  console.log(persons);
}