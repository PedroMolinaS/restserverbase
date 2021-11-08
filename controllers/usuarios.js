const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('./../models/usuario')

const getUsuarios = async (req = request, res = response) => {

    // const { id, fech, token, page = "1", limit = "10" } = req.query
    const { limite = 5, desde = 0 } = req.query
    const query = {estado: true}

    // const usuarios = await Usuario.find(query)
    //     .limit(Number(limite))
    //     .skip(Number(desde))
    // const total = await Usuario.countDocuments(query)

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .limit(Number(limite))
        .skip(Number(desde))
    ])

    res.status(200).json({
        ok: true,
        total,
        usuarios
    })

}

const putUsuaiors = async (req, res) => {

    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body

    // Encriptar la contraseña
    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }
    // Validar contra BD
    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        ok: true,
        usuario,
    })
}

const postUsuarios = async (req, res) => {

    const { nombre, correo, password, role } = req.body
    const usuario = new Usuario({ nombre, correo, password, role })

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)


    // Guardar en BD
    await usuario.save()

    res.status(201).json({
        ok: true,
        msg: 'post API - Controlador',
        usuario
    })
}

const deleteUsuarios = async(req, res) => {

    const {id} = req.params

    // NO RECOMENDABLE:Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id)

    // SI RECOMENDABLE
    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false})

    res.json({
        ok: true,
        usuario
    })
}

const patchUsuarios = (req, res) => {
    res.json({
        ok: true,
        msg: 'patch API - Controlador'
    })
}


module.exports = {
    getUsuarios,
    putUsuaiors,
    postUsuarios,
    deleteUsuarios,
    patchUsuarios,
}