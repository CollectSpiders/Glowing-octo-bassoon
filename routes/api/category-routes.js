const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // finds all categories
    const categories = await Category.findAll({
      // include associated products
      include: { model: Product },
    });
    req.statusCode(200).json(categories);
  } catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a category by its id value
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId, {
      // include associated products
      include: Product,
    });
    if (!category){
      res.status(404).json({ message: 'No category found with this id' });
    } else {
      res.status(200).json(category);
    }
  } catch (err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new category
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err){
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
