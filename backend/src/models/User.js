const knex = require('../database/connection');
const bcrypt = require('bcryptjs');

class User{

    async findAll() {
        try {
            let result = await knex.select([
                'users.id',
                'users.username',
                'users.role',
            ])
                .table('users')

            return result;
        } catch(err) {
            return []
        }
    }

    async findById(id) {
        try {
            let result = await knex.select([
                'users.id',
                'users.username',
                'users.role',
            ])
                .table('users')
                .where('users.id', id)
            
            return result;
            
        } catch(err) {
            return {status: false, error: err};
        }
    }

    async findByName(username) {
        
        try {
            let result = await knex.select([
                'users.id',
                'users.username',
                'users.password',
                'users.role',

            ])
                .table('users')
                .where('users.username', username)
            
            if (result.length > 0) {
                return {success: true, user: result};
            } else {
                return false;
            }

        } catch(err) {
            return {status: false, error: []};
        }
    }

    async new(username, password, role) {

        try {
        	let user = await this.findByName(username)
        	if(user){
        		return {status:false,error:'Usuário já	existe'}
        	}
            let hash = await bcrypt.hash(password, 10);
            let result = await knex.insert({username: username, password: hash, role: role}).table('users');
            return result
            
        } catch(err) {
            return {status: false, error: err};
        }
        
    }

    async update(id, username) {
		try{
            var user = await this.findById(id);
		}catch(e){
			return {status:false, error: 'Usuário não existe'}
		}

        if (user.length != 0) {

            let editedUser = {};
            let result = await this.findByName(username);

            if(username != undefined && username != user.username && result == false) {
                editedUser.username = username;
            }
                try {
                    await knex.update(editedUser).where({id: id}).table('users');
                    return {status: true};
            } catch(err) {
                return {status: false, error: 'Algo deu errado'};
            }

        } else {
            return {status: false, error: 'Usuário não existe'}
        }
    }

    async delete(id) {

        try {
            let user = await this.findById(id);

            if (user.length != 0) {
                await knex.delete().where({id: id}).table('users');
                return {status: true};
            } else {
                return {status: false, error: 'Usuário não existe.'}
            }

        } catch(err) {
            return {status: false, error: 'Algo deu errado'} 
        }        
    }
    
}

module.exports = new User();