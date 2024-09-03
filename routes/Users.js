const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.get('/', async(req,res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch(err){
        res.send('error'+err)
    }

})

router.post('/createUser',async(req,res) => {
    const user = new User({
        name        : req.body.name,
        age         : req.body.age,
        designation : req.body.designation
    })

    try {
        const a1 = await user.save()
        res.json(a1)
    } catch(err){
        res.send('error'+err)
    }
})

router.post('/searchByName',async(req,res) => {
    const { name } = req.body;

    try{
        const result = await User.find({ name: name })
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result)
    } catch(err){
        res.send('error'+err)
    }
})

router.post('/searchByDesignation',async(req,res) => {
    const { designation } = req.body

    try {
        const result = await User.find({ designation: designation})
        
        if(result.length == 0){
            res.json('User not Found for '+designation)
        }
        res.json(result)
    } catch(err){
        res.send('error'+err)
    }
})

router.delete('/delete', async(req, res) => {
    const { name } = req.body;

    try {
        console.log('Name received for deletion:', name);

        // Check if the name exists in the request
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const result = await User.findOne({ name: name });

        console.log('User search result:', result);

        if (!result) {
            return res.status(404).json({ message: 'User not found: ' + name });
        }

        await User.deleteOne({ name: name });

        res.json({ message: 'User deleted: ' + name });
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).json({ error: 'Error: ' + err });
    }
})

module.exports = router
