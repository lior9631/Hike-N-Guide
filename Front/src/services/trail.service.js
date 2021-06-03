import HttpService from './http.service';

const END_POINT = 'trail';

export default {
  query,
  getById,
  remove,
  add,
  edit,
  getMiniTrailObj,
};

function query() {
  return HttpService.get(END_POINT);
}

function getById(trailId) {
  return HttpService.get(`${END_POINT}/${trailId}`);
}

function remove(id) {
  return HttpService.delete(`${END_POINT}/${id}`);
}

async function add(trail) {
  const addedTrail = await HttpService.post(END_POINT, trail);
  return addedTrail;
}

async function edit(trail) {
  trail.isEditMode = false;
  const trailToEdit = await HttpService.put(`${END_POINT}/${trail._id}`, trail);
  return trailToEdit;
}

function getMiniTrailObj(trail) {
  const { _id, name } = trail;
  const miniTrail = {
    _id,
    name,
  };
  return miniTrail;
}
