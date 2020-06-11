const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get all items
// @access 
router.get('/', async(req, res) => {
    //Display message "No items were found." if there are no items.
    Item.find()
    .sort({ date: -1 })
    .populate('user', 'email')
    .exec()
    .then(items => res.json(items))
});

// @route POST api/items
// @desc post a new item
// @access
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        date: req.body.date,
        user: req.body.user
    });

    newItem.save().then(item => res.json(item));

});

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


router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;