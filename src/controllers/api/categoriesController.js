const { Category } = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const CATEGORIES = await Category.findAll();
            
            const RESPONSE = {
                endpoint: "/category",
                data: CATEGORIES,
                total: CATEGORIES.length 
            };

            res.status(200).json(RESPONSE);

        } catch (error) {
            res.status(500).send(error);
        }
    },
    detail: async (req, res) => {
        const CATEGORY_ID = req.params.id;
        try {
            const CATEGORY = await Category.findByPk(CATEGORY_ID, {
                include: [{association: "subcategories"}]
            });

            if(CATEGORY !== null) {
                const RESPONSE = {
                    endpoint: `/category/${CATEGORY_ID}`,
                    data: CATEGORY
                };
    
               return res.status(200).json(RESPONSE);
            }

            return res.status(400).json(`La categoria con id: ${CATEGORY_ID} no existe`)
            
        } catch (error) {
            res.status(500).send(error);           
        }
    },
}