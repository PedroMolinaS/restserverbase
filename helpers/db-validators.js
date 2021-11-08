const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({ role })
    if (!existeRol) {
        throw new Error(`Rol ${role} no válido`)
    }
}

const existeEmail = async (correo = '') => {
    const existeEm = await Usuario.findOne({ correo })
    if(existeEm) {
        throw new Error(`El email ${correo} ya existe`)
    }
}

const existeUsuarioById = async(id) => {
    const existeUsu = await Usuario.findById(id)
    if(!existeUsu){
        throw new Error(`Usuario con id ${id} no existe`)
    }
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioById,
}