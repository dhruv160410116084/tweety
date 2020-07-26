import { register } from "../modals/user";
import { create } from "../modals/post";
import { follow } from "../modals/follow";

const mutation = {
  async registerUser(parent, args, ctx) {
    return register(args);
  },

  async createPost(parent, args, ctx) {
    let data = create(args);
    return data;
  },

  async followUser(parent, args, ctx) {
    return follow(args);
  },
};

export { mutation as default };
