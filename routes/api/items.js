const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Models
const Item = require('../../models/Item');
const User = require('../../models/User');
const List = require('../../models/List');

// @route GET api/items
// @desc Get all items
// @access Private


// @route GET /api/items/from/:list
// @desc Gets all items from list id created by current user
// @access private
// router.get('/from/:id', (req, res, next) => {
//     // const currentUser = User.findById(req.user._id);
//     List.findById({ _id: req.params.id })
//     .then(() => {
//         Item.find(
//             { "listedIn": req.params.list },
//             'listedIn name id completed',
//             (err, items) => {
//                 if (err) throw err;
//                 res.json(items)
//             }
//         );
//     });
// });




// @route /api/items/update/:id
// @desc update an item 
router.post('/update/:id', auth, (req, res) => {
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


// @route /api/items/delete/:id
// @desc delete an item
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;