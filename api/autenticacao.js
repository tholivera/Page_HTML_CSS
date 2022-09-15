const jwt = require("jsonwebtoken")
const { promisify } = require("util")

module.exports = {
    eAdmin: async function (req, res, next) {

        const cabecalho = req.headers.authorization

        if (!cabecalho) {
            return res.status(401).json({
                erro: true,
                mensagem: "Não autorizado"
            })
        }

        const [, token] = cabecalho.split(" ")
       
        try {
            const validarToken = await promisify(jwt.verify)(token, "D658FDS6584GFXV26DFCDDS5")
            req.userID = validarToken.id
            return next()
        } catch (err) {
            return res.status(400).json({
                erro: true,
                mensagem: "Token inválido"
            })
        }

    }
}