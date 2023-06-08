const FirebaseModel = require("../models/firebaseModel");

class FirebaseController {
  async updateData(req, res) {
    try {
      await FirebaseModel.updateOldData(req.query);
      return res.status(200).json({ message: "Data was successful updated." });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getCards(req, res) {
    try {
      const result = await FirebaseModel.getCards(req.query);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async claimUserRoles(req, res) {
    try {
      const result = await FirebaseModel.claimUserRoles(req.query, req.body);
      return res.status(200).json({ message: result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new FirebaseController();
