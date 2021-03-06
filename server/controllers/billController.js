const Bill = require("../models/BillModel");
exports.createBill = (req, res) => {
  console.log(req.body);
  const bill = new Bill({
    userId: req.body.userId,
    userName: req.body.userName,
    TotalPrice: req.body.totalPrice,
    Products: req.body.products,
    Province: req.body.province,
    Address: req.body.address,
    Area: req.body.area,
    idShipper: req.body.idShipper,
  });

  return bill
    .save()
    .then((newCourse) => {
      return res.status(201).json({
        success: true,
        message: "New cause created successfully",
        Course: newCourse,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};
// Retrieve all Courses from the database.
exports.getBill = (req, res) => {
  console.log(req.query);
  const province = req.query.province;
  const status = req.query.status;
  var x = new Date(req.query.startDate);
  var y = new Date(req.query.endDate);
  if (req.query.startDate && req.query.endDate) {
    Bill.find()
      .then((bills) => {
        let result = bills.filter(
          (item) =>
            (province == null ||
              province == "All" ||
              item.Province == province) &&
            (status == null || status == "All" || item.Status == status) &&
            item.BillDate >= x &&
            item.BillDate <= y
        );
        return res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  } else {
    Bill.find()
      .then((bills) => {
        let result = bills.filter(
          (item) =>
            (province == null ||
              province == "All" ||
              item.Province == province) &&
            (status == null || status == "All" || item.Status == status)
        );
        return res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  }
};
exports.getBillWithDateRange = (req, res) => {
  Bill.find()
    .then((bills) => {
      var x = new Date(req.query.startDate);
      var y = new Date(req.query.endDate);
      let result = bills.filter(
        (item) => item.BillDate >= x && item.BillDate <= y
      );
      return res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};

exports.getBillById = (req, res) => {
  const id = req.params.id;
  Bill.findById(id)
    .then((singleArticle) => {
      res.status(200).json(singleArticle);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This course does not exist",
        error: err.message,
      });
    });
};

exports.updateBill = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Bill.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      console.log(req.body);
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

exports.getBillOfUser = (req, res) => {
  const id = req.params.id;
  Bill.find({ userId: id })
    .then((billsOfUser) => {
      res.status(200).json(billsOfUser);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This course does not exist",
        error: err.message,
      });
    });
};

exports.deleteBillProducts = (req, res) => {
  const { id, courseId } = req.params;
  Bill.updateOne({ _id: id }, { $pull: { Products: { courseId: courseId } } })
    .then(() => {
      Bill.findById(id).then((singleArticle) => {
        res
          .status(200)
          .json({ Status: "delete item successed", singleArticle });
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again." + err,
      });
    });
};
