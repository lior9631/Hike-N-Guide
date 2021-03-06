const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
COLLECTION_NAME = 'order'
module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        const orders = await collection.find(criteria).sort({ "createAt": -1 }).toArray();
        return orders
    } catch (err) {
        console.log('ERROR: cannot find orders')
        throw err;
    }
}

async function getById(orderId) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        const order = await collection.findOne({ $elemMatch: { "_id": ObjectId(orderId) } })
        return order
    } catch (err) {
        console.log(`ERROR: while finding order ${orderId}`)
        throw err;
    }
}

async function update(order) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    order._id = ObjectId(order._id);
    order.updateAt = Date.now()
    try {
        await collection.replaceOne({ "_id": order._id }, { $set: order })
        return order
    } catch (err) {
        console.log(`ERROR: cannot update order ${order._id}`)
        throw err;
    }
}

async function remove(orderId) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        await collection.deleteOne({ "_id": ObjectId(orderId) })
    } catch (err) {
        console.log(`ERROR: cannot remove order ${orderId}`)
        throw err;
    }
}

async function add(order) {
    order.createAt = Date.now()
    order.updateAt = Date.now()
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        await collection.insertOne(order);
        return order;
    } catch (err) {
        console.log(`ERROR: cannot insert order`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    let criteria = {}
    if (filterBy.guideId) {
        criteria = { $and: [{ "guide._id": filterBy.guideId }, { "guide.isDeleted": false }] }
    }
    if (filterBy.userId) {
        criteria = { $and: [{ "buyerUser._id": filterBy.userId }, { "buyerUser.isDeleted": false }] }
    }
    return criteria
}
