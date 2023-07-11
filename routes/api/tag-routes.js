const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tags
    // Include associated Product data
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    });

    // Return the tags in the response
    res.json(tags);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed to get tags' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;

    // Find one tag by its `id` value
    // Include associated Product data
    const tag = await Tag.findByPk(tagId, {
      include: [{ model: Product, through: ProductTag }]
    });

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    // Return the tag in the response
    res.json(tag);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed to get tag' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { tag_name } = req.body;

    // Create a new tag
    const tag = await Tag.create({ tag_name });

    // Return the created tag in the response
    res.status(201).json(tag);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const { tag_name } = req.body;

    // Update a tag's name by its `id` value
    const updatedTag = await Tag.update(
      { tag_name },
      { where: { id: tagId } }
    );

    if (updatedTag[0] === 0) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    // Return a success message in the response
    res.json({ message: 'Tag updated successfully' });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed to update tag' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;

    // Delete one tag by its `id` value
    await Tag.destroy({ where: { id: tagId } });

    // Return a success message in the response
    res.json({ message: 'Tag deleted successfully' });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

module.exports = router;
