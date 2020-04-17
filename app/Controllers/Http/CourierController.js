const CourierModel = use("App/Models/Courier");
const CourierTransformer = use("App/Transformers/CourierTransformer");

class CourierController {
  dummy({ response }) {
    return response.json({
      stuart: "hello",
      version: 1,
    });
  }

  // @ts-ignore
  async update({ request, transform }) {
    const { id, max_capacity } = request.only(["id", "max_capacity"]);

    const user = await CourierModel.findOrFail(id);

    if (user.max_capacity !== max_capacity) {
      user.max_capacity = max_capacity;
      user.capacity_updated_at = new Date();
      await user.save();
    }

    return transform.item(user, CourierTransformer);
  }

  // @ts-ignore
  async lookup({ request, transform }) {
    const { capacity_required } = request.only(["capacity_required"]);

    let query = CourierModel.query();

    if (capacity_required) {
      query.withCapacityFor(capacity_required);
    }

    const users = await query.paginate(request.input("page"));

    return transform.paginate(users, CourierTransformer);
  }
}

module.exports = CourierController;
