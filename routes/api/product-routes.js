const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    // Find all products
    // Include associated Category and Tag data
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }]
    });

    // Return the products in the response
    res.json(products);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed to get products' });
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Find one product by its `id` value
    // Include associated Category and Tag data
    const product = await Product.findByPk(productId, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }]
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Return the product in the response
    res.json(product);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed to get product' });
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const { product_name, price, stock, tagIds } = req.body;

    // Create a new product
    const product = await Product.create({ product_name, price, stock });

    if (tagIds && tagIds.length) {
      // Create product tags if there are any
      const productTagIdArr = tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    // Return the created product in the response
    res.status(201).json(product);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const { product_name, price, stock, tagIds } = req.body;

    // Update product data
    const updatedProduct = await Product.update(
      { product_name, price, stock },
      { where: { id: productId } }
    );

    if (tagIds && tagIds.length) {
      // Get the current product tags
      const productTags = await ProductTag.findAll({
        where: { product_id: productId }
      });

      // Create filtered list of new tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: productId,
            tag_id,
          };
        });

      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    // Return a success message in the response
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Delete one product by its `id` value
    await Product.destroy({ where: { id: productId } });

    // Return a success message in the response
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
