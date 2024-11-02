const Store = require("../model/Store");
const Barber = require("../model/Barber");
const User = require("../model/User");

exports.setStore = async (req, res, next) => {
  req.barber = await Barber.findById(req.params.id);
  next();
};

exports.oneStore = async (req, res) => {
  //problem
  try {
    const store = await Store.findById(req.params.id);

    console.log(store);

    res.status(200).json({
      status: "success",
      data: {
        data: store,
      },
    });
  } catch (err) {
    console.log(err);
  }

  //problem
  // res.render('store/index')
};

exports.buildStore = async (req, res) => {
  // const newbuildstore= new Store({
  //     name: req.body.name,
  //     location: req.body.location,
  //     address: req.body.address,
  //     mainBarber: req.body.mainBarber,
  //     barberId:req.userId
  // })
  // newbuildstore.save()

  const newbuildstore = await Store.create({ ...req.body });
  const barber = await User.findByIdAndUpdate(newbuildstore.mainBarber, {
    storeId: newbuildstore.id,
  });

  res.status(200).json({
    status: "success",
    data: {
      data: newbuildstore,
      data2: barber,
    },
  });
};

exports.sendRequestToBarber = async (req, res) => {
  //finding main barber by store
  // const store= await Store.findById(req.params.id)
  const store = await Store.findByIdAndUpdate(req.params.id, {
    $push: { request: { person: req.body.barber, permission: "faild" } },
  });

  res.status(200).json({
    status: "success",
    data: {
      data: store,
    },
  });
};

exports.addToStore = async (req, res) => {
  //test
  const mainbarber = await User.findById(req.body.mainbarberid);
  console.log(mainbarber);
  if (req.body.accept === "accept") {
    //finding store and adding barberid
    await Store.findByIdAndUpdate(mainbarber.storeId, {
      $push: { barber: req.body.userId },
    });
    //finding store and deleting request
    await Store.findByIdAndUpdate(
      mainbarber.storeId,
      { $pull: { request: { person: req.body.userId } } }
      //   { arrayFilters: [{ "outer.person": req.body.userId }] }
    );
    //finding barber and adding request
    // const barber = await Barber.findByIdAndUpdate(req.body.userId, {
    //   $push: { "request.$": { store: store.id, permission: "accept" } },
    // });
    res.status(200).json({
      status: "success",
      data: {
        data: 'success',
      },
    });
  } else {
    //finding store and deleting request
    console.log(4);
    const store = await Store.findByIdAndUpdate(
      mainbarber.storeId,
      { $pull: { "request.$[outer].person": req.body.userId } },
      { arrayFilters: [{ "outer.person": req.body.userId }] }
    );
    console.log(5);
    //finding barber and change request.permission to "faild"
    const barber = await Barber.findByIdAndUpdate(req.body.userId, {
      $push: {
        "request.$": { store: store.id, "request.permission": "faild" },
      },
    });
    console.log(6);
    res.status(200).json({
      status: "success",
      data: {
        data: store,
      },
    });
  }
};
