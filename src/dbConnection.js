import { Sequelize } from "sequelize";

let connection_str =  null;

if(process.argv[2] === 'local')
connection_str=`mysql://root:123456789@localhost:3306/tweety`
else if(process.argv[2] === 'container')
connection_str=`mysql://root:123456789@mysql-server:3306/tweety`

const connection = new Sequelize(
  connection_str
);

 connection.authenticate().then(msg => console.log(' DB connected')
 ).catch(err => console.log(err, '\nDb connection failed')
 )

export { connection as default };


