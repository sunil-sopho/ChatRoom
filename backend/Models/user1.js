var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');

var sequelize = new Sequelize('chatRoom','root','PASSWORD',{
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});

var User = sequelize.define('users', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
    // ,
    // facebook :{
    // 	id :{
    // 		type:Sequelize.STRING,
    // 		allowNull: true
    // 	},
    // 	token : {
    // 		type:Sequelize.STRING,
    // 		allowNull: true
    // 	},
    // 	email : {
    // 		type:Sequelize.STRING,
    // 		allowNull:true
    // 	},
    // 	name : {
    // 		type:Sequelize.STRING,
    // 		allowNull :true
    // 	}
    // },
    // google :{
    // 	id :{
    // 		type:Sequelize.STRING,
    // 		allowNull: true
    // 	},
    // 	token : {
    // 		type:Sequelize.STRING,
    // 		allowNull: true
    // 	},
    // 	email : {
    // 		type:Sequelize.STRING,
    // 		allowNull:true
    // 	},
    // 	name : {
    // 		type:Sequelize.STRING,
    // 		allowNull :true
    // 	}
    // },
    // twitter :{
    // 	id :{
    // 		type:Sequelize.STRING,
    // 		allowNull: true
    // 	},
    // 	token : {
    // 		type:Sequelize.STRING,
    // 		allowNull: true
    // 	},
    // 	displayName : {
    // 		type:Sequelize.STRING,
    // 		allowNull:true
    // 	},
    // 	name : {
    // 		type:Sequelize.STRING,
    // 		allowNull :true
    // 	}
    // }
	}, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }    
});

User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      }

  sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = User;