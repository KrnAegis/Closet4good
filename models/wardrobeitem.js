module.exports = function(sequelize, DataTypes) {
	var WardrobeItem = sequelize.define("WardrobeItem", {
		category: {
	      type: DataTypes.STRING,
	      allowNull: false,
	      validate: {
	        len: [1]
	      }
		},
		subcategory: {
	      type: DataTypes.STRING,
	      allowNull: false,
	      validate: {
	        len: [1]
	      }
		},
		count: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	},
   {
    timestamps: false
  });

	WardrobeItem.associate = function(models) {
		WardrobeItem.belongsTo(models.Wardrobe, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return WardrobeItem;
}