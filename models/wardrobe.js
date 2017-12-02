module.exports = function(sequelize, DataTypes) {
  var Wardrobe = sequelize.define("Wardrobe", {
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  },
    {
      timestamps: false
  });
  
  Wardrobe.associate = function(models) {
    Wardrobe.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Wardrobe.hasMany(models.WardrobeItem, {
      onDelete: "cascade"
    });
  };

  return Wardrobe;
};
