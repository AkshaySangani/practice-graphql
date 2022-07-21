const {User, Admin} = require("./model/model");
const jwt = require('jsonwebtoken');
const {AuthenticationError} = require("apollo-server-errors");

const resolvers = {
    Query: {
        users: async (_, {}, context) => {
            if (!context.user) throw new AuthenticationError('you must be logged in');
            return User.find()
        },
        user: async (_, {id}, context) => {
            if (!context.user) throw new AuthenticationError('you must be logged in');
            return User.findById(id)
        },
    },
    Mutation: {
        createAdmin: async (_, {newAdmin},context) => {
            if (!context.user) {
                const user = await Admin.findOne({email: newAdmin.email});
                if (user) {
                    throw new Error("Admin already exists.")
                }
                const data = {
                    email: newAdmin.email,
                    password: newAdmin.password,
                    token: await jwt.sign(newAdmin.email, 'akshay')
                };
                const newdmin = new Admin({
                    ...newAdmin
                });
                newdmin.save();
                return data;
            }
        },
        checkAdmin: async (_, {newAdmin}, context) => {
            if (!context.user) {
                console.log("newAdmin-->", newAdmin);
                const user = await Admin.findOne({email: newAdmin.email});
                const data = {
                    email: newAdmin.email,
                    password: newAdmin.password,
                    token: await jwt.sign(newAdmin.email, 'akshay')
                };
                if (user) {
                    if(user.password===newAdmin.password){
                    return data
                    }else{
                        throw new AuthenticationError('Enter correct password!');
                    }
                } else {
                    throw new Error("Admin not found.")
                }
            }
        },
        createUser: async (_, {userNew}, context) => {
            if (context.user) {
                console.log("userNew-->", userNew);
                const user = await User.findOne({email: userNew.email});
                if (user) {
                    throw new Error("User already exists with that email")
                }
                const newUser = new User({
                    ...userNew
                });

                return newUser.save()
            }
        },
        deleteUser: async (_, {removeUser}, context) => {
            if (context.user) {
                console.log("removeUser-->", removeUser);
                const user = await User.findById(removeUser.id);
                if (!user) {
                    throw new Error("User Not found!")
                }
                await User.findByIdAndDelete(removeUser.id);
                return removeUser
            }
        },
        updateUser: async (_, {editUser}, context) => {
            if (context.user) {
                console.log("editUser-->", editUser);
                const user = await User.findById(editUser.id);
                if (!user) {
                    throw new Error("User Not found!")
                }
                const data = await User.findByIdAndUpdate({_id: editUser.id}, editUser);
                return editUser
            }
        }
    }
};

module.exports = resolvers;
