const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
 // find all tags
  // be sure to include its associated Product data
router.get('/', (req, res) => {
 try {
  const tagData = Tag.findAll({
    include: [{model: Product}]
  });
  res.status(200).json(tagData)
 } catch (err) {
  res.status(400).json(err)
 }
});

  // find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', (req, res) => {
  try {
    const tagData = Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    res.status(200).json(tagData)
  } catch (err) {
    res.status(400).json(err)
  }
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tag) => {
    res.status(200).json(tagData)
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body)
  .then((tag) => {
    res.status(200).json(tagData);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const tagData = Tag.destroy({
      where: {
        id: req.params.id
      }
    });
  if (!tagData) {
    res.status(404).json({message: 'No tag found with that id!'})
    return;
  }
  res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
