// 1
{
    // 1.1
    type UserID = (string | number)

    interface User {
        id: UserID,
        name: string,
        age: number,
        email?: string
    }

    interface Admin extends User{
        permissions: string[]
    }
    
    // 1.2
    function createUser(name?: string, age?: number, email?: string): User{
        // some code

        return {
            id: "",
            name: name??"",
            age: age??0,
            email: email??""
        }
    }

    function deleteUser(obj: User): void{
        // const userName = prompt("Input, please, your name")
        console.log(`${obj.name} has been deleted.`);

        // some code
    }

    // 1.3
    let users: Array<User>

    function logAllUsersNames(users: Array<any>){
        console.log(...users)
    }

    // 1.4
    function logSomething<A, B>(a:any, b:any): [A, B]{
        return [a, b]
    }
    interface Object{
        [propName: string]: any
    }
    function getProperty<T>(obj: Object, keyword: string): T{
        return obj[keyword]

    }
}










// 2
{
    interface User{
        id: number,
        username: string,
        email: string,
        password: string
    }

    class UserRegistration{
        public userList: User[] = []
        constructor(){}

        registerUser(user: User): void{
            this.userList.push(user)
        }

        getUserById(id: number): User | undefined{
            for(let u of this.userList){
                if(u.id === id){
                    return u
                }
            }
            return undefined
        }

        getUserByEmail(email: string): User | undefined{
            for(let u of this.userList){
                if(u.email === email){
                    return u
                }
            }
            return undefined
        }
    }
}
