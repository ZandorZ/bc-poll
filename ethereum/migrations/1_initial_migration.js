const Migrations = artifacts.require("PollContract");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
