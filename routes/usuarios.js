
const { Router } = require('express')
const { check } = require('express-validator')
const { getUsuarios, putUsuaiors, postUsuarios, deleteUsuarios, patchUsuarios } = require('../controllers/usuarios')
const { esRoleValido, existeUsuarioById, existeEmail } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

router.get('/', getUsuarios)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    // check('role','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
], postUsuarios)

router.put('/:id',[
    check('id','ID no es válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('role').custom(esRoleValido),
    validarCampos
], putUsuaiors)

router.patch('/', patchUsuarios)

router.delete('/:id', [
    check('id','Id no es válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], deleteUsuarios)


module.exports = router