const User =require("./model")

const resolvers = {
    Query:{
        users:async ()=> await User.find(),
        user:async (_,{id})=> await User.findById(id),
    },
    Mutation:{
        createUser:async (_,{userNew})=>{
            console.log("userNew-->",userNew);
            const user = await User.findOne({email:userNew.email})
            if(user){
                throw new Error("User already exists with that email")
            }
            const newUser =  new User({
                ...userNew
            });

            return newUser.save();
        },
        deleteUser: async (_,{removeUser})=>{
            console.log("removeUser-->",removeUser);
            const user = await User.findById(removeUser.id)
            if(!user){
                throw new Error("User Not found!")
            }
            await User.findByIdAndDelete(removeUser.id)
            return removeUser
        },
        updateUser:async (_,{editUser})=>{
            console.log("editUser-->",editUser)
            const user = await User.findById(editUser.id)
            if(!user){
                throw new Error("User Not found!")
            }
            const data = await User.findByIdAndUpdate({_id : editUser.id}, editUser);
            return editUser
        }
    }
}

module.exports=resolvers
