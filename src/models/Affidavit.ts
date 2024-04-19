import S from "sequelize";
import db from "../config/index";

class Affidavit extends S.Model {
  declare id: number;
  declare consmuedAlcohol: string;
  declare consumedPsychotropics: string;
  declare isDepressed: string;
}

Affidavit.init(
  {
    userId: {
      type: S.INTEGER,
      allowNull: false,
    },
    consmuedAlcohol: {
      type: S.STRING,
      allowNull: false,
    },
    consumedPsychotropics: {
      type: S.STRING,
      allowNull: false,
    },
    isDepressed: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "affidavits" }
);

export default Affidavit;
