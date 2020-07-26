import { GraphQLServer } from 'graphql-yoga'
import Query from './src/resolvers/Query'
import Mutation from './src/resolvers/Mutation'
import jwt from 'jsonwebtoken'



const auth = async (resolve,root,args,context,info)=>{
    let res = null
    if(info.fieldName === 'registerUser' || info.fieldName === "userLogin"){
        
        res = await resolve(root,args,context,info)
        if(res === null){
            res={}
             res.msg = "authentication error !, please check your credentials." 

        }
        else{

            res.token = jwt.sign({data:args},"dhruvTweety")
            if(res.msg === null)
            res.msg="authenticated!"
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
                    if(!Array.isArray(res))
                    res={msg:"Please provide valid auth token!"}
                    else
                    res=[{msg:"Please provide auth token!"}]
                    
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
