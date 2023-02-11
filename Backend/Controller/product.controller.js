const db = require("../Model");
const Product = db.product;
const User = db.user;


// Create and Save a new Product
exports.addProduct = (req, res, next) => {
    console.log(req.file);
    // console.log(req.body);
    // Validate request
    if (!req.body.timeStamp) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
console.log(req.body);
    // Create a Product
    const product = new Product({
        timeStamp: req.body.timeStamp,
        image: req.file.path,
    });

    // Save Product in the database
    product
        .save(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        });
};

exports.getProducts = (req, res) => {
    Product.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
}
exports.addUser = (req, res) => {
    console.log(req.body);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        pin: req.body.pin,
    });
    user.save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        });
}

exports.getUsers = (req, res) => {
    User.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
}