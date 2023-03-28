import USER from "../databaseSchema/userCollection.mjs";

const deleteSubscribes = async() => {
    let now = new Date;
    await USER.updateMany({ "userSubscription.endDate" : {$lt : now}},{
        $pull: {
            userSubscription : {
                endDate : {$lt : now}
            }
        }
    })

    return true;
}

export default deleteSubscribes;