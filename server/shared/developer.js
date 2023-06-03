const collectionList = require("../../service/Collections");


async function get_developer_games(user_data_id){
    const developerRef = await collectionList.developerCollection.doc(user_data_id).get();
    const game_ids = developerRef.data().games;
    console.log(developerRef.data());
    const gamelist = [];

    for (const game_id of game_ids) {
        const gameRef = await collectionList.gameCollection.doc(game_id).get();
        const game_data = gameRef.data();
        game_data.game_id = gameRef.id;
        gamelist.push( game_data);
    }

    return gamelist;

}

async function get_developer_ad_units(game_id){
    const gameRef = await collectionList.gameCollection.doc(game_id).get();
    const ad_unit_ids = gameRef.data();
    console.log(ad_unit_ids);
    // const ad_unit_list = [];

    // for (const ad_unit_id of ad_unit_ids) {
    //     const adUnitRef = await collectionList.adUnitCollection.doc(ad_unit_id).get();
    //     const adUnitData = adUnitRef.data();
    //     ad_unit_list.push(adUnitData);
    // }

     return "ad_unit_list";
}

module.exports = {get_developer_games, get_developer_ad_units};