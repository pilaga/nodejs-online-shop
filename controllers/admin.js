const mongodb = require('mongodb');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('./admin/edit-product', 
        { 
            pagetitle: "Add Product", 
            path: '/admin/add-product',
            editing: false
        });
}

exports.postAddProduct = (req, res, next) => {
    //retrieve data from form
    const title = req.body.title;
    const price = req.body.price;
    const image = req.body.image;
    const desc = req.body.description;
    const userId = req.user._id;
    //create and save new product
    const product = new Product(title, price, desc, image, userId, null);
    product.save()
    .then(result => {
        res.redirect('/admin/product-store');
    })
    .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
        res.render('./admin/product-store', 
            { 
                products: products,
                pagetitle: 'Product Store (Admin)', 
                path: "/admin/product-store"          
            });
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit; //always a string
    if(!editMode) {
        return res.redirect('/');
    }    
    const productId = req.params.productId; 
    Product.fetchById(productId)
    .then(product => {
        if(!product) {
            return res.redirect('/');
        }
        res.render('./admin/edit-product', 
            { 
                pagetitle: `Edit Product: ${product.title}`, 
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
    })
    .catch(err => {
        console.log(err);
    });
}

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedtitle = req.body.title;
    const updatedprice = req.body.price;
    const updatedimage = req.body.image;
    const updateddesc = req.body.description;

    let product = new Product(updatedtitle, updatedprice, updateddesc, updatedimage, productId);
    product.save()
    .then(result => {
        console.log('updated product: ', productId);
        res.redirect('/admin/product-store'); 
    })
    .catch(err => {
        console.log(err);
    });
}

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    
    Product.deleteById(productId)
    .then(() => {
        console.log('destroyed product:', productId);
        res.redirect('/admin/product-store');
    })
    .catch(err => {
        console.log(err);
    });   
}


