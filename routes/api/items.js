const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Models
const Item = require('../../models/Item');
const User = require('../../models/User');
const List = require('../../models/List');

/*======================== GET ===============*/

/**
 * @ route /api/items/from/:id
 * @ desc gets all the list items that matches the request list id
 * @ access private
 */
router.get('/from/:id', (req, res, next) => {
    const selectedList = List.findById(req.params.id)
    selectedList.then((list) =>  {
        if(!list) {
            return res.status(404)
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
                res.json(items)
        })
    }).catch(next);
});

/*=================POST==================*/

router.post('/add-to/:id', auth, (req, res, next) => {
        const newItem = new Item({
            name: req.body.name,
            date: req.body.date
        });
        newItem.listedIn = req.params.id;
        newItem.owner = req.user.id;
        newItem.save()
        .then(item => res.json(item))
        .catch(err => res.json(err));
});

router.post('/add', auth, (req, res, next) => {
    const newItem = new Item({
        name: req.body.name,
        date: req.body.date
    });
    newItem.listedIn = req.params.listedIn;
    newItem.owner = req.user.id;
    newItem.save()
    .then(item=> res.json(item))
    .catch(err => res.json(err));
});

/*==============PATCH/PUT================*/
// @route /api/items/update/:id
// @desc update an item 
router.put('/update/:id', auth, (req, res) => {
    Item.findById(req.params.id, (err, item) => {
        if(!item) 
            res.status(404).send("Data is not found");
        else
            item.name = req.body.name;
            item.save().then(item => {
                res.json({success: true, msg: 'Item successfully updated'});
            }).
            catch(err => {
                res.status(400).send({success: false});
            });
    });
});

/*==============DELETE================*/
// @route /api/items/delete/:id
// @desc delete an item
router.delete('/delete/:id', auth, (req, res) => {
    Item.findById(req.params.id)
    .then((item, err) => {
        if( err ) throw err;
        List.update({ "_id": item.listedIn },
        { $pull: { 'listItems': { "_id": req.params.id }}})
        item.remove().then(() => res.json({success: true}))
    });
    // .catch(err => res.status(404).json({success: false}));
});

// router.delete('/delete/:id', auth, (req, res) => {
//     Item.findById(req.params.id)
//     .then((item, err) => {
//         const itemList = Item.findById(req.params.id)
//         .where("listedIn")
//         .equals(req.params.id);

//         if( err ) throw err;
        
//         else 
//             List.update({ "_id": itemList },
//             { $pull: { 'listItems': { "_id": req.params.id }}},
//                 item.remove().then(() => res.json({success: true}))
//             )
//     });
//     // .catch(err => res.status(404).json({success: false}));
// });

// .then(item => item.remove().then(() => res.json({success: true})))
    // .catch(err => res.status(404).json({success: false}));

// router.delete('/delete/:list/:id', auth, (req, res) => {
//     // const foundUser = User.findById(req.user._id);
//     const foundList = req.params.list;
//     const foundItem = req.params.id;

//     List.findByIdAndUpdate( {"_id": foundList}, 
//         { $pull: { 'listItems': { "_id": foundItem } } },
//         function(err, foundItem) {
//             if(err) {
//                 res.json(err);
//             }
//             foundItem.remove().then(() => res.json({ success: true }))
//         });
// });
    

module.exports = router;