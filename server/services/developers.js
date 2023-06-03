const collectionList = require("../fb/collection");

exports.get_developer_games = async function (req, res) {
const user_data_id = req.params.devId;
    const developerRef = await collectionList.developerCollection.doc(user_data_id).get();
    //console.log(user_data_id)
    const game_ids = developerRef.data().games;
   // console.log(developerRef.data());
    const gamelist = [];

    for (const game_id of game_ids) {
        const gameRef = await collectionList.gameCollection.doc(game_id).get();
        const game_data = gameRef.data();
        game_data.game_id = gameRef.id;
        gamelist.push( game_data);
    }
    gamelist.sort((a,b) => a.rank - b.rank);
    res.send(gamelist);
}

// exports.getWithdrawals = function (devId) {

//         const income = await db.collection("AdUnitCollection").get();
     

//         await db.collection("DeveloperCollection").doc(devId).collection("withdrawals")
//             .get()
//             .then((querySnapshot) => {
//                 res.json(
//                     querySnapshot.docs.map((doc) => {
                        
//                         const milliseconds = doc.data().time._seconds * 1000 + doc.data().time._nanoseconds / 1000000;
//                         let date = new Date(milliseconds);

//                         income.map((elem) => {
//                             let count = 0;
//                             elem.data().displayed.map((t) => {
//                                 let tDate = new Date(t._seconds * 1000 + t._nanoseconds / 1000000);
//                                 if (tDate <= date) count++;
//                             })
//                             tIncome += count * elem.data().value;
//                         });

//                         return { id: doc.id, ...doc.data(), time: date };
//                     }),
//                 )
//             })
//     }
// }
