import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

const students = [ 
    { id: 1, name: '光光', sex: true, age: 20},
    { id: 2, name: '东东', sex: true, age: 21},
    { id: 3, name: '小红', sex: false, age: 20},
];

const teachers = [
    { 
        id: 1, 
        name: "小刚", 
        age: 30, 
        subject: ['体育', '英语'],
        students: students
    },
]

@Resolver()
export class StudentResolver {

    @Query("students")
    students() {
        return students;
    }


    @Query("teachers")
    teachers() {
        return teachers;
    }

    @Query("studentById")
    studentById(@Args('id') id) {
        return students.find(item => {
            return item.id === id
        });
    }

    @Mutation()
    addStudent(
        @Args('name') name: string, 
        @Args('age') age: number, 
        @Args('sex') sex: boolean
    ) {
        const id = Math.floor(Math.random() * 1000);
        students.push({
            id,
            name,
            age,
            sex
        });
        return {
            id,
            success: true
        }
    }

    @Mutation()
    updateStudent(
        @Args('id') id,
        @Args('name') name: string, 
        @Args('age') age: number, 
        @Args('sex') sex: boolean
    ) { 
        const index = students.findIndex(item => {
            return item.id === parseInt(id)
        });

        if(index ===-1) {
            return {
                id: null,
                success: true
            }
        }

        students[index].name = name;
        students[index].age = age;
        students[index].sex = sex;
        return {
            id,
            success: true
        }
    }

    @Mutation()
    deleteStudent(@Args('id') id) { 
        const index = students.findIndex(item => {
            return item.id === parseInt(id)
        });
        
        if(index ===-1) {
            return {
                id: null,
                success: true
            }
        }

        students.splice(index, 1);
        return {
            id,
            success: true
        }
    }
      
}
