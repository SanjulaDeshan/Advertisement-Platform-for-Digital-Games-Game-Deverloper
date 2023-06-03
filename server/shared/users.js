const collectionList = require("../../service/Collections");

 async function get_user(user_id) {
    try {

        const userCollection = await collectionList.userCollection.get();
        const user_list = await Promise.all(
            userCollection.docs
                .filter((doc) => doc.id === user_id)
                .map(async (doc, index) => {
                    const data = doc.data();
                   
                    return {
                        id: doc.id,
                       ...data

                    };
                })
        );

        return user_list;

    } catch (error) {
        console.error(error);
    }
}

 async function get_users() {
    try {

        const userCollection = await collectionList.userCollection.get();
        const user_list = await Promise.all(
            userCollection.docs
                .map(async (doc, index) => {
                    const data = doc.data();
                   
                    return {
                        id: doc.id,
                        ...data

                    };
                })
        );

        return user_list;

    } catch (error) {
        console.error(error);
    }
}

 async function get_user_data(user_data_id, user_type) {
    try {
        let userCollection = null;
        if(user_type === "developer")
         userCollection = await collectionList.developerCollection.get();
         if(user_type === "customer")
         userCollection = await collectionList.customerCollection.get();
         if(user_type === "admin")
         userCollection = await collectionList.adminCollection.get();

        const user_list = await Promise.all(
            userCollection.docs
            .filter((doc) => doc.id === user_data_id)
                .map(async (doc, index) => {
                    const data = doc.data();
                   
                    return {
                        id: doc.id,
                        ...data

                    };
                })
        );

        return user_list;

    } catch (error) {
        console.error(error);
    }
}

module.exports = {get_user, get_users, get_user_data}

