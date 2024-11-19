const clientController = require('../Models/models');

const userController = {

    //route root
    getRoot: async (req, res) => {
        res.status(200).json({ message: "The API is running, welcome my Server!!!" });
    },

    //Controller to list all users
    getAllUsers: async (req, res) => {
        try {
            const clients = await clientController.getAllUsers();
            res.status(200).json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de colaboradores" });
        }
    },

    //Controller to get a user by ID
    getByID: async (req, res) => {
        try {
            const sql = await clientController.getByID(req.params.id);

            if (sql.length > 0) {
                res.status(200).json(sql);
            }
            else {
                res.status(401).json({ msg: "Não existe registro no banco com este id" })
            }
        }
        catch (error) {
            return error
        }
    },

    //Controller to register a new user
    createNewUser: async (req, res) => {
        const { id, nome, sobrenome, idade } = req.body;

        try {
            const sql = await clientController.getByID(id);

            if (sql.length > 0) {
                res.status(401).json({ msg: "O ID " + id + " já está cadastrado na base de dados" });
            }
            else {
                await clientController.registerUser(id, nome, sobrenome, idade);
                res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao tentar criar um novo colaborador' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const sql = await clientController.getByID(req.params.id);

            console.log(sql);
    
            if (sql.length > 0) {
                await clientController.deleteUser(req.params.id);
                res.status(204).send(); 
            } else {
                res.status(404).json({ msg: `O  ${req.params.id} não existe na base de dados` });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao tentar deletar o usuário' });
        }
    },

    //Controller to update a specific user
    updateUser: async (req, res) => {
        const { nome, sobrenome, idade } = req.body;

        try {
            const sql = await clientController.getByID(req.params.id);

            if (sql.length > 0) {
                await clientController.updateUser(nome, sobrenome, idade, req.params.id);
                res.status(200).json({ msg: "Dados atualizados com sucesso!!!" });
            }
            else {
                res.status(401).json({ msg: "O ID " + req.params.id + " não existe na base de dados" })
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao tentar criar um novo colaborador' });
        }
    },
};

module.exports = userController;


