const { request, response } = require('express')

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

const postUsuarios = (req, res) => {

    const { nombre, edad } = req.body

    res.status(201).json({
        ok: true,
        msg: 'post API - Controlador',
        nombre,
        edad
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