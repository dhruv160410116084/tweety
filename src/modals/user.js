import { Sequelize } from "sequelize";
import connection from "../dbConnection";

const User = connection.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      field: "id",
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      field: "name",
    },
    email: {
      type: Sequelize.STRING,
      field: "email",
    },
    password: {
      type: Sequelize.STRING,
      field: "password",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

let register = (obj) => {
  return User.create(obj).then((user) => {
    if (user._options.isNewRecord){
      return [{
        id:user.id,
        name: user.name,
        email:user.email,
        msg:"account created"
      }]
    } 
    else return [{ msg: "some error occured during creating your account" }];
  });
};

let login = (obj) => {
  return User.findOne({
    attributes: ["id", "name", "email"],
    where: {
      email: obj.email,
      password: obj.password,
    },
  }).then((user) => {
    return [user];
  });
};

let getUsers = (obj) => {
  return User.findAll({ attributes: ["id", "name", "email"] }, obj).then(
    (users) => {
      return users;
    }
  );
};

export { User as default, register, login, getUsers };
