import { Sequelize } from "sequelize";
import connection from "../dbConnection";

const Post = connection.define(
  "posts",
  {
    id: {
      type: Sequelize.INTEGER,
      field: "id",
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      field: "user_id",
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "content",
    },
    date_time: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
      field: "date_time",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

let create = (obj) => {
  return Post.create(obj).then((post) => {
    if (post._options.isNewRecord) return { msg: "post created" };
    else return { msg: "some error occured" };
  });
};

let getPost = (obj) => {
  if (obj.me) {
    return Post.findAll({
      where: { user_id: obj.user_id },
    }).then((post) => {
      return post;
    });
  } else {
    return Post.sequelize
      .query(
        `select * from posts where user_id in (select follower_id from followers where user_id=${obj.user_id});`
      )
      .then((data) => {
        return data[0];
      });
  }
};

export { Post as default, create, getPost };
