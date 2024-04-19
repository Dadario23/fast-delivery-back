import S from "sequelize";
const bcrypt = require("bcrypt");
import db from "../config/index";

class User extends S.Model {
  declare name: string;
  declare surname: string;
  declare email: string;
  declare password: string;
  declare isAdmin: boolean;
  declare isDisabled: boolean;
  declare salt: string;
  declare resetPasswordToken: string | null;
  declare profieImage: string;

  declare resetPasswordExpires: Date | null;

  public hash(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  public async validatePassword(password: string): Promise<boolean> {
    const currentSalt = this.getDataValue("salt");
    const newHash = await this.hash(password, currentSalt);
    return newHash === this.getDataValue("password");
  }
}

User.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    surname: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    isDisabled: {
      type: S.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    salt: {
      type: S.STRING,
    },
    resetPasswordToken: {
      type: S.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: S.DATE,
      allowNull: true,
    },
    profileImage: {
      type: S.TEXT,
      defaultValue: "",
    },
  },
  { sequelize: db, modelName: "users" }
);

User.addHook("beforeCreate", async (user: User) => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    user.setDataValue("salt", salt);
    const psw = await user.hash(user.getDataValue("password"), salt);
    user.setDataValue("password", psw);
  } catch (error) {
    throw new Error("HASHING ERROR");
  }
});

export default User;
