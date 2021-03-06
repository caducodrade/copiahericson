//index,show,store,update,destroy
const User = require('../Model/User')

module.exports = {
  //Index traz todos os registros pelo methodo Get
  async index(req,res){
    //Busca todos os registross
    let users = await User.find();
    return res.json(users);
  },

  //show traz um registro onde o id do registro é igual ao id assado na url
  async show(req, res){
    //Busca um registro no banco
    let user = await User.findOne({_id : req.params.id});
    return res.json(user);
  },

  //Store usa o methodo POST para gravar
  async store(req, res){
    //passa os dados que veio do post para uma variavel
    const nome = req.body.nome;
    const senha = req.body.senha;
    const email = req.body.email;
    const status = req.body.status;
    const idade = req.body.idade;
    //busca se ja tem algum usuaro com esse email
    let user = await User.findOne({email});
    //compara se houve resultado
    if(!user){
      //se nao houver resultado grava o novo usuario
      user = await User.create({nome,senha,email,status,idade});
    }
    return res.json(user);
  },
  
  //update pega o id, busca no banco esse registro, alreta ele no controlador e manda gravar
  async update(req, res){
    //recupero o registro
    let user = await User.findOne({_id : req.params.id});
    //edito os registros
    user.nome = "Hericson Ramos Forti";
    user.email = "sis4web@gmal.com";
    user.senha = "senha123456";
    //atualiza os dados no banco
    user = await User.update(user);
    return res.json(user);
  },

  //delete = apaga o registro de cordo com o id pasasado no parametro
  async destroy(req, res){
    let user = await User.deleteOne({_id : req.params.id});
    return res.json(user);
  }
};