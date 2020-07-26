import { Sequelize } from "sequelize";
import connection from "../dbConnection";

const Follow = connection.define(
  "followers",
  {
    user_id: {
      type: Sequelize.INTEGER,
      field: "user_id",
      primaryKey: true,
      allowNull: false,
    },
    follower_id: {
      type: Sequelize.INTEGER,
      field: "follower_id",
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

let follow = (obj) => {
  return Follow.create(obj).then((data) => {
    if (data._options.isNewRecord)
      return {
        msg: ` user id: ${obj.user_id} followed user_id : ${obj.follower_id} `,
      };
    else return { msg: "some error occured!" };
  });
};

export { Follow as default, follow };
