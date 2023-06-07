const collectionList = require("../fb/collection");


async function get_revenue_factor(ad_type_id) {
  const adTypeRef = await collectionList.adTypeCollection.doc(ad_type_id).get();
  const ad_data = adTypeRef.data();
  return (
    ad_data.revenue_per_thousand_add *
    ad_data.media_type_ratio *
    ad_data.ratio_per_ad
  );
}

async function get_revenue_from_ad_units(ad_unit_list) {

  let daily_revenue = 0;
  let weekly_revenue = 0;
  let monthly_revenue = 0;
  let daily_views = 0;
  let weekly_views = 0;
  let monthly_views = 0;
  let mostReve = 0;
  let mostReveAd = "hi";
  let nAds = 0;
  for (const ad_unit of ad_unit_list) {
    const adUnitCollection = await collectionList.adUnitCollection.doc(ad_unit).get();
    const revenue_factor = await get_revenue_factor(adUnitCollection.data().ad_unit_type);

    const today_view_count = adUnitCollection.data().total_daily_view_count;
    // console.log(today_view_count)
    daily_revenue += revenue_factor * today_view_count;

    const weekly_view_count = adUnitCollection.data().total_weekly_view_count;
    // console.log(weekly_view_count)
    weekly_revenue += revenue_factor * weekly_view_count;

    const monthly_view_count = adUnitCollection.data().total_monthly_view_count;
    // console.log(monthly_view_count)
    monthly_revenue += revenue_factor * monthly_view_count;

    if (mostReve < monthly_revenue) {
      mostReveAd = adUnitCollection.data().ad_unit_name;
      mostReve = monthly_revenue;
    }

    daily_views += adUnitCollection.data().total_daily_view_count;
    weekly_views += adUnitCollection.data().total_weekly_view_count;
    monthly_views += adUnitCollection.data().total_monthly_view_count;
    nAds++;
  }
  //  console.log(daily_revenue,monthly_revenue)
  return { daily: daily_revenue, weekly: weekly_revenue, monthly: monthly_revenue, daily_views: daily_views, weekly_views: weekly_views, monthly_views: monthly_views, mostReveAd: mostReveAd, nAds: nAds };
}

async function get_revenue_from_games(game_id) {
  const gameCollection = await collectionList.gameCollection.doc(game_id).get();
  const gameData = gameCollection.data();
  return await get_revenue_from_ad_units(gameData.ad_units);
}

async function get_revenue_from_devs(game_list, isDaily) {
  const revenue = { daily: 0, weekly: 0, monthly: 0, views: {}, nAds: 0 };
  for (const element of game_list) {
    const revenue_from_games = await get_revenue_from_games(element);
    // console.log(revenue_from_games);
    revenue.daily += revenue_from_games.daily;
    revenue.weekly += revenue_from_games.weekly;
    revenue.monthly += revenue_from_games.monthly;

    revenue.daily_views = revenue_from_games.daily_views;
    revenue.weekly_views = revenue_from_games.weekly_views;
    revenue.monthly_views = revenue_from_games.monthly_views;

    revenue.mostReveAd = revenue_from_games.mostReveAd;
    revenue.nAds += revenue_from_games.nAds;

  }
  // console.log(revenue)
  return revenue;
}

async function get_games(user_data_id) {
  const developerCollection = await collectionList.developerCollection.doc(user_data_id).get();
  return developerCollection.data().games;
}


module.exports = async function get_revenue(req, res) {

  const { dev_id } = req.body; //3Asj4ijVZGTgTWZpt6PO

  try {

    // const userCollection = await collectionList.userCollection.get();
    // const user_revenue_list = await Promise.all(
    //   userCollection.docs
    //     .filter((doc) => doc.id === user_id)
    //     .map(async (doc, index) => {
    //       const data = doc.data();
    //console.log(data);
    const games = await get_games(dev_id);
    const revenue = await get_revenue_from_devs(games);

    const obj = {
      id: dev_id,
      // username: data.username,
      // profile: data.profile,
      // email: data.email,
      daily_revenue: revenue.daily.toFixed(2),
      weekly_revenue: revenue.weekly.toFixed(2),
      monthly_revenue: revenue.monthly.toFixed(2),
      daily_views: revenue.daily_views,
      weekly_views: revenue.weekly_views,
      monthly_views: revenue.monthly_views,
      mostReveAd: revenue.mostReveAd,
      nAds: revenue.nAds

    };
    // })
    // );
    // console.log(obj)
    res.send(obj);

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}