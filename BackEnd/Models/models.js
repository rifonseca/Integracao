const connection = require('../config/db');

const userModel = {
    getAllUsers: async () => {
        const [result] = await connection.query("SELECT * FROM registrarcolaboradores")
            .catch(erro => console.log(erro));
        return result
    },

    getByID: async (id) => {
        const [result] = await connection.query("SELECT * FROM registrarcolaboradores WHERE id=?", [id])
            .catch(erro => console.log(erro));
        return result
    },

    registerUser: async (id, nome, sobrenome, idade) => {
        const [result] = await connection.query("INSERT INTO registrarcolaboradores values(?,?,?,?)", [id, nome, sobrenome, idade])
            .catch(erro => console.log(erro));
        return result
    },

    deleteUser: async (id) => {
        const [result] = await connection.query("DELETE FROM registrarcolaboradores WHERE id = ?", [id])
        .catch(erro => console.log(erro));
        return result;
    },

    updateUser: async (nome, sobrenome, idade, id) => {
        const [result] = await connection.query("UPDATE registrarcolaboradores SET nome = ?, sobrenome = ?, idade = ? WHERE id = ?", [nome, sobrenome, idade, id])
            .catch(erro => console.log(erro));
        return result
    },
};

module.exports = userModel;

