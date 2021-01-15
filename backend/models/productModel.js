import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    name: {type: String, required: true},
    rating: { type: Number, required: true},
    comment: {type: String, required: true}
}, {
    timestamps: true
})

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],//it is an array of objects and this reviewSchema can be written in different file as it is not big we mananged here. Here The reviewSchema is a seperate model which has name and individual rating and comments
    rating: { //this rating is average of all ratings
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema);

export default Product;