const collectionList = require("../fb/collection");
const db = require("../fb/initialization");
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

exports.loadGames = function (req, res) {
    // console.log('Loading games');
    //db.collection("GameCollection")
    collectionList.gameCollection
        .orderBy("rank")
        .where('rank', '>', 0)
        .get()
        .then((querySnapshot) => {
            //   console.log(querySnapshot.docs)
            res.json(
                querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
            )
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Failed to load games" });
        });
}

// exports.loadOwnGames = function (req, res) {
//     let arr = [];
//     collectionList.developerCollection.doc(req.params.devId)
//         .get()
//         .then((doc) => {
//             const gamePromises = doc.data().games.map((game) => {
//                 return db.collection("GameCollection").doc(game).get()
//             });

//             Promise.all(gamePromises)
//                 .then((gameDocs) => {
//                     arr = gameDocs.map((doc) => ({ id: doc.id, ...doc.data() }));
//                     res.json(arr);
//                 })
//                 .catch((error) => {
//                     console.error(error);
//                     res.status(500).json({ error: "Failed to load games" });
//                 });
//         })
//         .catch((error) => {
//             console.error(error);
//             res.status(500).json({ error: "Failed to load developer" });
//         });
// }


exports.deleteGames = async function (req, res) {
    await db.collection("GameCollection").doc(req.params.gameId).delete()
        .then(() => {
            db.collection("DeveloperCollection").doc(req.params.devId).update({
                games: FieldValue.arrayRemove(req.params.gameId)
            })
            res.json({ msg: "Deleted" })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Failed to delete game" });
        });
}

exports.addGame = function (req, res) {
    db.collection("GameCollection")
        .add({
            Status: req.body.Status,
            ad_cost_rate: req.body.ad_cost_rate,
            game_icon: req.body.game_icon,
            game_name: req.body.game_name,
            game_type: req.body.game_type,
            platform: req.body.platform,
            rank: req.body.rank,
        })
        .then((docRef) => {
            // db.collection("DeveloperCollection").doc(req.params.devId).update({
            //     games: FieldValue.arrayUnion(docRef.id)
            // })
            res.json({ msg: "Added" })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Failed to add game" });
        });
}