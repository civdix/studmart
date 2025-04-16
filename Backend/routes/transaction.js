const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Product = require('../models/Product');
const auth = require('../middlewares/auth');

// Create new transaction
router.post('/', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.body.productId);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.seller.toString() === req.user._id.toString()) {
            return res.status(400).json({ error: 'Cannot buy your own product' });
        }

        if (product.status !== 'Available') {
            return res.status(400).json({ error: 'Product is not available' });
        }

        const transaction = new Transaction({
            buyer: req.user._id,
            seller: product.seller,
            product: product._id,
            amount: product.price,
            paymentMethod: req.body.paymentMethod,
            meetingLocation: req.body.meetingLocation,
            meetingTime: req.body.meetingTime
        });

        // Update product status
        product.status = 'Reserved';
        await product.save();

        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get transaction by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
            .populate('buyer', 'name')
            .populate('seller', 'name')
            .populate('product', 'title images');

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        if (transaction.buyer._id.toString() !== req.user._id.toString() &&
            transaction.seller._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update transaction status
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        if (transaction.buyer._id.toString() !== req.user._id.toString() &&
            transaction.seller._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        transaction.status = req.body.status;
        
        if (req.body.status === 'Completed') {
            const product = await Product.findById(transaction.product);
            product.status = 'Sold';
            await product.save();
        }

        await transaction.save();
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Add review to transaction
router.post('/:id/review', auth, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        if (transaction.status !== 'Completed') {
            return res.status(400).json({ error: 'Transaction must be completed to leave a review' });
        }

        const isBuyer = transaction.buyer._id.toString() === req.user._id.toString();
        const isSeller = transaction.seller._id.toString() === req.user._id.toString();

        if (!isBuyer && !isSeller) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        if (isBuyer) {
            transaction.buyerReview = {
                rating: req.body.rating,
                comment: req.body.comment
            };
        } else {
            transaction.sellerReview = {
                rating: req.body.rating,
                comment: req.body.comment
            };
        }

        await transaction.save();
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router; 