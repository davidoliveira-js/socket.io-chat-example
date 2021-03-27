class HomeController{

    async index(req, res){
        res.send('Chat App');
    }

    async validate(req, res) {
        res.send('ok');
    }

}

module.exports = new HomeController();