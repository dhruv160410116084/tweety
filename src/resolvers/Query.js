import { login, getUsers } from "../modals/user";

import { getPost } from "..//modals/post";


const query = {
  async userLogin(parent, args, ctx) {
    return login(args);
  },


  async getAllUsers(parent, args, ctx) {
    return getUsers();
  },

  async fetchPost(parent, args, ctx) {
    let res = await getPost(args);
    console.log(res.length);
    return res.length === 0 ? [{msg : "Posts not found"}] : res; 
  },

};

export { query as default };
