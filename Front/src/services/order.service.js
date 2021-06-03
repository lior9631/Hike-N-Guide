import HttpService from './http.service';

const END_POINT = 'order';

export default {
  query,
  save,
  remove,
  getById,
};

function query(filter = null) {
  let queryStr = '?';
  if (filter.guideId) queryStr += `guideId=${filter.guideId}`;
  else if (filter.userId) queryStr += `userId=${filter.userId}`;

  return HttpService.get(END_POINT + queryStr);
}

function save(order) {
  if (order._id) {
    return HttpService.put(`${END_POINT}/${order._id}`, order);
  }
  return HttpService.post(`${END_POINT}`, order);
}

function remove(orderId) {
  return HttpService.delete(`${END_POINT}/${orderId}`);
}

function getById(orderId) {
  return HttpService.get(`${END_POINT}/${orderId}`);
}
