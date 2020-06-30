const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

//Controllers
const ListController = require('../../controllers/list');
const List = require('../../models/List');
const User = require('../../models/User');
const Item = require('../../models/Item');
const authController = require('../../controllers/auth');

/*===================== GET =======================*/
//Get all Lists
/*  @route /api/lists
    @desc Get the lists for user
    @access private
*/
router.get('/', auth, (req, res) => {
    List.find({})
    .sort({ date: -1 })
    .populate('listItems')
    .exec((err, lists) => {
        if(err) throw err;
        res.json(lists);
    });
});

// Get Lists by Id
router.get('/:id', (req, res) => {
    List.findById()
    .sort({ date: -1 })
    .then(list => res.json(list)); 
})

// @route /;id/listitems
// @desc get all items from a list
// router.get('/:id/items', (req, res) => {
//     // const currentUser = User.findById(req.user._id);
//     const selectedList = List.findById({ _id: req.params.id });
//     selectedList.distinct("listItems", {name: req.body.name} )
//         .then(listItems => {
//             if(listItems.length === 0){ res.json({ success: true, 'msg': 'No items added yet'})};
//             res.json(listItems);
//         })
//         .catch(err => {
//             res.status(400).json({ 
//                 success: false, 
//                 err: 'Unable to find list items.'
//         });
//     });
// });

router.get('/:id/items', (req, res) => {
    const selectedList = List.findById(req.params.id)
    selectedList.then((list) =>  {
        if(!list) {
            return res.status(401)
            .json({ 
                success: false, 
                msg: 'No lists with that id was found'});
        }
    })
    .then(() => {
        Item.find()
        .where('listedIn')
        .equals(req.params.id)
        .then((items) => {
            if(items.length === 0) {
                return res.json({ 
                    listedIn: req.params.id,
                    success: true, 
                    msg: 'No items were created yet'
                });
            } else {
                res.json(items);
            }
        })
    })
});
// @router /api/items/all
// @desc gets all items 
router.get('/items/all', async(req, res) => {
    //Display message "No items were found." if there are no items.
    Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
});

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
                return res.json({ 
                    user: req.user.id,
                    success: true, 
                    msg: 'No lists were created yet'});
            } else{
                res.json(lists);
            }
        });
    });
    
});
/*===================== POST =======================*/

// @route /api/lists
// @desc creates a new list and saves it to the user
router.post('/', auth, (req, res, next) => {
    User.findById(req.user._id).then((user) => {
        if(!user) { return res.status(401); }
        return user;
    })
    .then(() => {
        const newList = new List({
            title: req.body.title,
            date: req.body.date,
        });
        newList.owner = req.user.id;
        newList.save();
        User.findByIdAndUpdate( 
                { "_id": req.user.id }, 
                { $addToSet: { "lists": newList }},
                { safe: true, upsert: true },
                (err, newList) => {
                    if (err) return res.status(400).json({ success: false, msg: 'Unable to save list to user'});
                    res.status(200).json(newList);
                }
            )
    }).catch(next);
});

// @route POST api/items/to/:list
// @desc create a new list to user 
// @access private
router.post('/add-item/to/:list', auth, (req, res, next) => {
    const foundUser = User.findById(req.user._id);
    const foundList = List.find({ _id: req.params.list });
    foundUser.then((user) => {
        if(!user) { return res.status(401); }
        foundList;
    })
    .then(() => {
        const newItem = new Item({
            name: req.body.name,
            date: req.body.date
        });
        newItem.listedIn = req.params.list;
        newItem.user = req.user.id;
        newItem.save()
        .then(() => {
            List.findByIdAndUpdate( { "_id": req.params.list }, 
                { $addToSet: { "listItems": newItem }},
                { safe: true, upsert: true },
                function(err, item) {
                    if (err) { return res.json(err); }
                    res.json(item);
            })
        })
        .catch(next);
    });
});

/*====================== PUT/PATCH =======================*/

router.post('/update-item/:id', auth, (req, res) => {
    Item.findById(req.params.id, (err, item) => {
        if(!item) 
            res.status(404).send("Data is not found");
        else
            item.name = req.body.name;

            item.save().then(item => {
                res.json({success: true});
            }).
            catch(err => {
                res.status(400).send({success: false});
            });
    });
});

/*===================== DELETE ============================*/
router.delete('/delete-list/:id', (req, res) => {
    const foundList = List.findById(req.params.id);
    foundList.then()
    .then(list => list.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

router.delete('/delete-item/:id', auth, (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});


module.exports = router;