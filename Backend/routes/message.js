const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middlewares/auth');

// Get messages between users for a specific product
router.get('/:recipientId/:productId', auth, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user._id, recipient: req.params.recipientId, product: req.params.productId },
                { sender: req.params.recipientId, recipient: req.user._id, product: req.params.productId }
            ]
        }).sort({ createdAt: 1 });

        // Mark messages as read
        await Message.updateMany(
            { recipient: req.user._id, sender: req.params.recipientId, read: false },
            { read: true }
        );

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Send a new message
router.post('/', auth, async (req, res) => {
    try {
        const message = new Message({
            sender: req.user._id,
            recipient: req.body.recipientId,
            product: req.body.productId,
            content: req.body.content
        });

        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get unread message count
router.get('/unread/count', auth, async (req, res) => {
    try {
        const count = await Message.countDocuments({
            recipient: req.user._id,
            read: false
        });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all conversations
router.get('/conversations', auth, async (req, res) => {
    try {
        const conversations = await Message.aggregate([
            {
                $match: {
                    $or: [
                        { sender: req.user._id },
                        { recipient: req.user._id }
                    ]
                }
            },
            {
                $group: {
                    _id: {
                        product: '$product',
                        otherUser: {
                            $cond: {
                                if: { $eq: ['$sender', req.user._id] },
                                then: '$recipient',
                                else: '$sender'
                            }
                        }
                    },
                    lastMessage: { $last: '$$ROOT' }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id.otherUser',
                    foreignField: '_id',
                    as: 'otherUser'
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id.product',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $sort: { 'lastMessage.createdAt': -1 }
            }
        ]);

        res.json(conversations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 