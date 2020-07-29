import { GraphQLServer } from 'graphql-yoga'
import Query from './src/resolvers/Query'
import Mutation from './src/resolvers/Mutation'
import jwt from 'jsonwebtoken'



const auth = async (resolve,root,args,context,info)=>{
    let res = null
    if(info.fieldName === 'registerUser' || info.fieldName === "userLogin"){
        
        res = await resolve(root,args,context,info)
        console.log(res);
        if(res[0] === null){
            res=[{msg:"User not found!"}]
            console.log(res)
        }
        else if(res.length === 0 ){
            res[0]={}
             res[0].msg = "authentication error !, please check your credentials." 

        }
        else{

            res[0].token = jwt.sign({data:args},"dhruvTweety")
            if(res[0].msg === null)
            res[0].msg="authenticated!"
        }        
    }
    else{
            if(args.token   ){
                try {
                    // console.log("----in else condition----");
                    let auth =await jwt.verify(args.token,"dhruvTweety")
                    // console.log('-----',auth,'-----');
                    if(auth){
                        res = await resolve(root,args,context,info)
                        // console.log('----res----')
                        console.log(res);
                        // res = res[0]
                    }
                } catch (error) {
                    res=[{msg:error.toString()}]
                }
            }else{
                res=[{msg:"Please provide auth token!"}]
            }
    }
    return res
}

const server = new GraphQLServer({
    typeDefs:'./schema.graphql',
    resolvers:{
            Query,
            Mutation,
            PostResult: {
                __resolveType: obj => {
                    if(obj.id)
                        return 'Post'
                    if(obj.msg)
                        return 'Msg'
                    return null
                }
            },
            ListUserResult:{
                __resolveType: obj =>{
                    if(obj.id)
                        return 'User'
                    if(obj.msg)
                        return 'Msg'
                }
            },
            CredentialResult:{
                __resolveType: obj =>{
                   
                    if(obj.id)
                        return 'Auth'
                    if(obj.msg)
                        return 'Msg'
                }
            }
    },
    middlewares:[{
        Query:auth,
        Mutation:auth
    }]
})



server.start({endpoint:"/app"},() => {
    console.log('The server is up!')
})

let bookTicket = (obj)=>{
    let res =async Flight.find(obj.flight_id)

    if(!res){
        let result =async Flight.Book(obj)

        if(result === true)
            return {msg : "book flight successfully"}
        else
            return {msg : " some error occurred"}
    }

}


let book = (obj)=>{
    if(obj in book.list)
        return {msg : "already booked"}
    else {
        book.list.add(obj)
        return {msg : "booked"}
    }
}

