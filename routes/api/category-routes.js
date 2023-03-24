const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//console.log(projectsData);
// const projects = projectsData.map((project) => project.get({ plain: true }));
// console.log(projects);
// res.render('homepage', { projects });

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      // JOIN with Products
      include: [{ model: Product }],
    });

    if (!categoriesData) {
      res.status(404).json({ message: "No Category found with this id!" });
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const categoriesData = await Category.create(req.body);
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  /* req.body should look like this...
    {
      "category_name": "Coats"
    }
  */
  try {
    const categoriesData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Category has been updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoriesData) {
      res.status(404).json({ message: "No Category found with this id!" });
      return;
    }

    res
      .status(200)
      .json(
        `message:  The category with the ID of ${req.params.id} has been deleted. `
      );
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
