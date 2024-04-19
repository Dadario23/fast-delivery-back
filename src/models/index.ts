import Affidavit from "./Affidavit";
import Package from "./Package";
import User from "./User";

User.hasMany(Package, {});
Package.belongsTo(User, {});
Affidavit.belongsTo(User, { foreignKey: "userId" });
export { User, Package };
