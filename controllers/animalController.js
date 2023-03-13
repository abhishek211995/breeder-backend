// Controllers
const {
  RegisterAnimal,
  getBreed,
  getAnimalCount,
  getAnimals,
} = require("../Models/Animal");

const registerAnimal = (req, res) => {
  try {
    let count = 0;
    const array = req.body;
    let i = 0;
    let array_mapped = array.length;
    array.forEach((element) => {
      const {
        pet_name,
        pet_breed,
        pet_color,
        pet_marking,
        pet_dob,
        gender,
        owner_id,       // going to get from cookie or local storage
        animal_id,
        breed_id,
        father_id,
        mother_id,
      } = element;

      // owner_id = localStorage.getItem("user_id");
      getAnimalCount((data) => {
        try {
          if (data) {
            count = data.length;
            array_mapped--;

            // register no = this year + breed id + (count of animal + 1)
            var RegisterNo =
              new Date().getFullYear() + "/" + breed_id + "/" + (count + 1 + array_mapped);
            
            RegisterAnimal(
              {
                RegisterNo,
                pet_name,
                pet_breed,
                pet_color,
                pet_marking,
                pet_dob,
                gender,
                owner_id,
                animal_id,
                breed_id,
                father_id,
                mother_id,
              },
              (data) => {
                console.log(data);
                if (data) {
                  console.log("i " + i);
                  i++;
                  if (i == array.length) {
                    res
                      .status(200)
                      .send({ message: "Animal registered sucessfully" });
                  }
                } else {
                  res
                    .status(400)
                    .send({ message: "Error in registering animal" });
                }
              }
            );
            console.log("i out " + i);
          } else {
            res
              .status(400)
              .send({ message: "Error in generating registerNo of animal" });
          }
        } catch (err) {
          console.log(err);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getAnimalBreed = (req, res) => {
  try {
    const { animal_id } = req.body;
    getBreed(animal_id, (data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).send({ message: "Error in getting animal breed" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// get all animal
const getAllAnimal = (req, res) => {
  try {
    getAnimals((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).send({ message: "Error in getting all animal" });
      }
    });
  } catch (error) {
    res.status(400).send({ message: "Error in getting all animal" });
  }
}
    


module.exports = { registerAnimal, getAnimalBreed,getAllAnimal };
