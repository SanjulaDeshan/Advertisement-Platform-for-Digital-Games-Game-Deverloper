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
    const user_id = req.params.devId;
    const game_id = req.params.gameId;

    try {
        const GameRef = await collectionList.gameCollection.doc(game_id).delete();
        const UserRef = await collectionList.developerCollection.doc(user_id).get();
        const game_list = UserRef.data().games;
        game_list.splice(game_list.indexOf(game_id), 1)
        await collectionList.developerCollection.doc(user_id).update({
            games: game_list,
        });
        res.status(204).send("Game has been deleted successfully!");

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

exports.addGame = async function (req, res) {
    try {
        const { user_id, game_name, platform } = req.body;
        const data = {
            game_name,
            game_icon: 0,
            published_date: new Date(),
            platform,
            rank: 0,
            status: "pending",
            ad_cost_rate: 0,
            ad_units: [],
        };
        const GameRef = await collectionList.gameCollection.add(data);
        const game_id = GameRef.id;

        const userRef = await collectionList.developerCollection.doc(user_id).get();
        const game_list = userRef.data().games;
        game_list.push(game_id);
        await collectionList.developerCollection.doc(user_id).update({
            games: game_list,
        });

        console.log(game_id);
        res.status(201).send("Game has been created successfully!");
        // res.send(game_list);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

exports.getAdTypes = function (req, res) {
    collectionList.adTypeCollection
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

exports.addAdUnit = async function (req, res) {

    const { ad_unit_name, ad_unit_type, game_id } = req.body;
    const data = {
        ad_unit_name,
        ad_unit_type,
        no_of_req_ad_daily: 0,
        no_of_req_ad_monthly: 0,
        created_date: new Date(),
        total_daily_view_count: 0,
        total_weekly_view_count: 0,
        total_monthly_view_count: 0,
    }

    try {
        const AdUnitRef = await collectionList.adUnitCollection.add(data);
        const ad_unit_id = AdUnitRef.id;
        const GameRef = await collectionList.gameCollection.doc(game_id).get();
        const ad_unit_list = GameRef.data().ad_units;
        ad_unit_list.push(ad_unit_id);
        const UpdateGameRef = await collectionList.gameCollection.doc(game_id).update({
            ad_units: ad_unit_list,
        });
        console.log(ad_unit_id);
        res.status(204).send("Ad Unit has been added successfully!");


    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}


exports.delete_ad_unit = async function (req, res) {
    const { game_id, ad_unit_id } = req.body;

    try {
        const AdUnitRef = await collectionList.adUnitCollection.doc(ad_unit_id).delete();
        const GameRef = await collectionList.gameCollection.doc(game_id).get();
        const ad_unit_list = GameRef.data().ad_units;
        ad_unit_list.splice(ad_unit_list.indexOf(ad_unit_id), 1)
        await collectionList.gameCollection.doc(game_id).update({
            ad_units: ad_unit_list,
        });
        res.status(204).send("Ad Unit has been deleted successfully!");

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}