const {users} =require( '../SERVER/fackData')
const {randomBytes} =require('crypto')
const resolvers = {
    Query:{
        users:()=>users,
        // user:(_,{id})=>users.find(user=>user.id === id),
    },
    Mutation:{
        createUser:(_,{userNew})=>{
            const id = randomBytes(5).toString("hex")
            users.push({
                id,
                ...userNew
            })
            return users.find(user=>user.id === id)
        }
    }
}

module.exports=resolvers
