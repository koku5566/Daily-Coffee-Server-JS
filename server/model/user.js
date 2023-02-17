import {Sequelize} from 'sequelize';

import sequelize from '../utiils/db.js';

const User = sequelize.define('user',{
    userID:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    name:{
        type: Sequelize.STRING.INTEGER
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    }
})

export default User;