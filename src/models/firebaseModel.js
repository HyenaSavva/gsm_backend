const { db, auth } = require("../db");
const fs = require("fs");
const { Timestamp } = require("firebase-admin/firestore");
const { executeScrapper } = require("../scrapper/index");
const { app } = require("firebase-admin");

class FirebaseModel {
  async updateOldData(query) {
    try {
      const items = await executeScrapper();
      const result = items.map(async (item) => {
        const docRef = db.collection("spyShopItems").doc();
        const newDocument = docRef.create({
          ...item,
          itemId: docRef.id,
          createdAt: Timestamp.now(),
          magazine: "spy-shop",
          type: "camera",
        });
        return await newDocument;
      });

      return await Promise.all(result);
    } catch (err) {
      return err;
    }
  }

  async getCards({ query }) {
    const cards = [];
    try {
      const something = fs.readFileSync("src/scrapper/data/data.json", {
        encoding: "utf-8",
      });

      if (something.length === 0) {
        const items = await db.collection(query).limit(5).get();
        items.forEach((item) => cards.push(item.data()));
      }

      fs.writeFileSync("src/scrapper/data/data.json", JSON.stringify(cards));

      return { message: "Success" };
    } catch (err) {
      return err;
    }
  }

  async claimUserRoles({ userId }, appendRoles) {
    try {
      return await auth.setCustomUserClaims(userId, appendRoles);
    } catch (err) {
      return err;
    }
  }
}

module.exports = new FirebaseModel();
