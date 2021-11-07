const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('./../models/usuario')

const getUsuarios = (req = request, res = response) => {

    const { id, fech, token, page = "1", limit = "10" } = req.query

    res.status(200).json({
        ok: true,
        msg: 'get API - Controlador',
        id,
        fech,
        token,
        page,
        limit
    })

}

const putUsuaiors = (req, res) => {

    const { id, form } = req.params

    res.status(201).json({
        ok: true,
        msg: 'put API - Controlador',
        id,
        form
    })
}

const postUsuarios = async (req, res) => {

    const { nombre, correo, password, role } = req.body
    const usuario = new Usuario({ nombre, correo, password, role })

    // Verficiar si el correo ya existe
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        return res.status(400).json({
            msg: 'Correo ya registrado'
        })
    }


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

const deleteUsuarios = (req, res) => {
    res.json({
        ok: true,
        msg: 'delete API - Controlador'
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