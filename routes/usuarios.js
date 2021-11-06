
const { Router } = require('express')
const { getUsuarios, putUsuaiors, postUsuarios, deleteUsuarios, patchUsuarios } = require('../controllers/usuarios')

const router = Router()

router.get('/', getUsuarios )

router.post('/', postUsuarios) 

router.put('/:id/:form', putUsuaiors)

router.patch('/', patchUsuarios)

router.delete('/', deleteUsuarios)


module.exports = router