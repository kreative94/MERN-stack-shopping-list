const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Controllers
const List = require('../../models/list');
const User = require('../../models/user');

/*===================== GET =======================*/
//Get all Lists
/*  @route /api/lists
    @desc Get the lists for user
    @access private
*/
router.get('/', auth, (req, res) => {
    List.find({})
    .sort({ date: -1 })
    .then((lists) => 
        res.json(lists))
    .catch(err => res.json(err));
});
// @route /api/lists/:id
// @desc Get Lists by Id
// @access private
router.get('/:id', auth, (req, res) => {
    List.findById(req.params.id)
    .then(list => res.json(list)); 
})

/**
 * @ route /lists/by/user
 * @ desc gets all lists from the current user
 * @ access private
 */
router.get('/by/user', auth, (req, res) => {
    const currentUser = User.findById(req.user.id);
    currentUser.then((user) => {
        if(!user) { 
            return res.status(401).json({ 
                success: false, msg: 'No user was found'
            }); 
        }
    })
    .then(() => { 
        List.find()
        .where('owner')
        .equals(req.user.id)
        .then(lists => {
            if(lists.length === 0) {
                return res.status(400).json({ 
                    success: true, 
                    msg: 'No lists were created yet'
                });
            } else {
                res.json(lists);
            }
        });
    });
    
});
/*===================== POST =======================*/

// @route /api/lists
// @desc creates a new list and saves it to the user
router.post('/', auth, (req, res) => {
        const newList = new List({
            title: req.body.title,
            date: req.body.date
        });
        newList.owner = req.user.id;
        newList.save()
        .then(( list ) => res.status(200).json(list))
        .catch(err => res.status(400).json(err)
        );
});

/*====================== PUT =======================*/

router.put('/update/:id', auth, (req, res) => {
    List.findById(req.params.id, (err, list) => {
        if(!list) 
            res.status(404).send("Data is not found");
        else
            list.title = req.body.title;

            list.save().then(list => {
                res.json({success: true, msg: 'List title successfully changed'});
            }).
            catch(err => {
                res.status(400).send({success: false, msg: 'Changes could not be made.'});
            });
    });
});

/*===================== DELETE ============================*/
router.delete('/delete/:id', (req, res) => {
    List.findById(req.params.id)
    .then((list) => list.remove().then(()=> {
        res.json({ success: true })
    }))
    .catch((err) => { 
        res.json({ success: false }) 
    })
});

module.exports = router;