
const { Router } = require('express')
const { check } = require('express-validator')
const { getUsuarios, putUsuaiors, postUsuarios, deleteUsuarios, patchUsuarios } = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

router.get('/', getUsuarios )

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener más de 6 caracteres').isLength({min:6}),
    check('correo','El correo no es válido').isEmail(),
    check('role','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
], postUsuarios) 

router.put('/:id/:form', putUsuaiors)

router.patch('/', patchUsuarios)

router.delete('/', deleteUsuarios)


module.exports = router