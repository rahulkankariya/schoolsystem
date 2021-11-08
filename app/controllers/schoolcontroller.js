const mangose = require("mongoose");
const Joi = require("joi");
const School = require("../model/school.model");
const Classname = require("../model/class.model");
const Subject = require("../model/subject.model");
const Section = require("../model/section.model");

exports.School = async (req, res) => {
  try {
    const { registrationNumber } = req.body;
    const { error } = schoolValidation(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: "mandatory field error",
        data: error.details[0].message,
      });
    } else {
      const existingSchoolRegitrationNo = await School.countDocuments({
        registrationNumber,
      });
      if (existingSchoolRegitrationNo > 0) {
        return res.status(400).send({
          success: false,
          message: "School Registration Number is Already Exist",
          data: null,
        });
      } else {
        const SchoolName = new School({
          _id: new mangose.Types.ObjectId(),
          name: req.body.name,
          registrationNumber,
          affiliated: req.body.affiliated,
          medium: req.body.medium,
          type: req.body.type,
          area: req.body.area,
          street: req.body.street,
          landmark: req.body.landmark,
          pincode: req.body.pincode,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
          telephoneNumber: req.body.telephoneNumber,
          email: req.body.email,
          educationTypes: req.body.educationTypes,
          shift: req.body.shift,
        });
        SchoolName.save().then((result) => {
          res.status(200).send({
            success: true,
            message: "School Information records can inserted",
            data: result,
          });
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "School Inforamtion Cannot Inserted" + error,
      data: error,
    });
    // console.log(error);
  }
};
exports.className = async (req, res) => {
  try {
    const { error } = classValidation(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: "mandatory field error",
        data: error.details[0].message,
      });
    } else {
      const name = req.body.name.toLowerCase();
      const { schoolId } = req.body;
      const existingClassName = await Classname.findOne({ name });
      const existingSchoolId = await School.findOne({ _id:schoolId });
      const Class = new Classname({
        _id: new mangose.Types.ObjectId(),
        name,
        schoolId,
      });
      if (!existingSchoolId) {
        res.status(400).send({
          success: false,
          message: "School is not Exist",
          data: null,
        });
      } else {
        if (!existingClassName) {
          Class.save().then((result) => {
            res.status(200).send({
              success: true,
              message: "Class records can inserted",
              data: result,
            });
          });
        } else {
          res.status(400).send({
            success: false,
            message: "Class Already Exist",
            data: null,
          });
        }
      }
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Class cannot Insert " + error,
      data: null,
    });
    // console.log(error);
  }
};
exports.subject = async (req, res) => {
  try {
    const { error } = subjectValidation(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: "mandatory field error",
        data: error.details[0].message,
      });
    } else {
      const { code, classNameId } = req.body;
      const existingSubjectCode = await Subject.findOne({
        code
      });
      const existingClassID = await Classname.findOne({ _id: classNameId });
      // console.log(existingClassID);
      if (!existingClassID) {
        res.status(400).send({
          success: false,
          message: "Class is Not Exist",
          data: null,
        });
      } else {
        if (!existingSubjectCode) {
          const subject = new Subject({
            _id: new mangose.Types.ObjectId(),
            code,
            subjectName: req.body.subjectName,
            classNameId,
          });
          subject.save().then((result) => {
            res.status(200).send({
              success: true,
              message: "Subject  can inserted",
              data: result,
            });
          });
        } else {
          res.status(400).send({
            success: false,
            message: "Subject is Already Exist",
            data: null,
          });
        }
      }
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Subject Cannot Insert " + error,
      data: error,
    });
    // console.log(error);
  }
};
exports.section = async (req, res) => {
  try {
    const { error } = sectionValidation(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: "mandatory field error",
        data: error.details[0].message,
      });
    } else {
      const name = req.body.name.toLowerCase();
      const { classNameId } = req.body;
      const ExistingClass = await Classname.findOne({ _id: classNameId });
      const ExistingSection = await Section.findOne({ classNameId, name });
      const section = new Section({
        _id: new mangose.Types.ObjectId(),
        classNameId,
        name,
      });
      if (!ExistingClass) {
        res.status(400).send({
          success: false,
          message: "Class is Not Exist",
          data: null,
        });
      } else {
        if (!ExistingSection) {
          section.save().then((result) => {
            res.status(200).send({
              success: true,
              message: "Section  records can inserted",
              data: result,
            });
          });
        } else {
          res.status(400).send({
            success: false,
            message: "Section Already Alloted",
            data: null,
          });
        }
      }
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Class cannot Insert " + error,
      data: null,
    });
    // console.log(error);
  }
};

// validation

function schoolValidation(validData) {
  const schema = {
    name: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a School Name",
        };
      }),
    registrationNumber: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a School Registration Number",
        };
      }),
    affiliated: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a School Afalited ",
        };
      }),
    medium: Joi.array()
      .required()
      .error(() => {
        return {
          message: "Please Enter a School Medium ",
        };
      }),

    type: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter School Type",
        };
      }),
    area: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a School Adress Area",
        };
      }),
    street: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a School Adress Street",
        };
      }),
    landmark: Joi.string(),
    pincode: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a Pincode",
        };
      }),
    city: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a City",
        };
      }),
    state: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a State",
        };
      }),
    country: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a Country",
        };
      }),
    telephoneNumber: Joi.array()
      .required()
      .error(() => {
        return {
          message: "Please Enter a Telephone Number",
        };
      }),
    email: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a Email",
        };
      }),
    educationTypes: Joi.array()
      .required()
      .error(() => {
        return {
          message: "Please Enter a Education Types",
          // primary,sec,sr sec,Tertiary
        };
      }),
    shift: Joi.array()
      .required()
      .error(() => {
        return {
          message: "Please Enter Shift Name",
        };
      }),
  };
  return Joi.validate(validData, schema);
}

function classValidation(validData) {
  const schema = {
    name: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a Class Name",
        };
      }),
      schoolId: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a School ID",
        };
      }),
  };
  return Joi.validate(validData, schema);
}

function subjectValidation(validData) {
  const schema = {
    code: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a  Subject Code",
        };
      }),
    subjectName: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a  Subject Name",
        };
      }),
      classNameId: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a Class Id ",
        };
      }),
  };
  return Joi.validate(validData, schema);
}

function sectionValidation(validData) {
  const schema = {
    classNameId: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a Class Id",
        };
      }),
    name: Joi.string()
      .required()
      .error(() => {
        return {
          message: "Please Enter a Section",
        };
      }),
  };
  return Joi.validate(validData, schema);
}
