const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
      const categoryData = Category.findAll({
    include: [{model: Category}, {model: Product}]
  });
  res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {  const categoryData = Category.findByPk(req.params.id , {
    include: [{model: Category}, {model: Product}]
  })
  if (!categoryData) {
    res.status(404).json({ message: 'No category found with that id!' });
    return;
  }
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

// create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body)
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const categoryData = Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
