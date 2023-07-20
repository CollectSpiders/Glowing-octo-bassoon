const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    // Include Product data associated with the tags through the ProductTag model
    include: [{ model: Products, through: ProductTag }],
  })
  .then((tags) => res.json(tags))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    // finds the tag with the given id
    where: { id: req.params.id },
    // include Product data associated with the tag through the ProductTag model
    include: [{ model: Product, through: ProductTag}]
  })
  .then((tag) =>{
    if (!tag){
      //if the tag is not found return a 404 error
      res.status(404).json({ message: 'no tag found with this id' })
      return:
    }
    res.json(tag);
  })
  .catch((err) =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  // create a new tag with the data from req.body
  Tag.create(req.body)
  // Respond with the created tag data
  .then((tag) => res.status(200).jdon(tag))
  .catch((err) =>{
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      // update the tag with the given id
      id: req.params.id,
    },
  })
  .then((updateTag) => res.json(updatedTag))
  .catch((err =>{
    console.log(err);
    res.status(400).json(err);
  }));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    // delete a tag wth given id
    where: { id: req.params.id },
  })
  .then ((deletedTag =>{
    if(!deletedTag){
      // if tag isn't found return 404 error
      res.status(404).json({ message: 'no tag found with this id' })
      return;
    }
    res.json(deletedTag);
  }))
  .catch((err) =>{
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
