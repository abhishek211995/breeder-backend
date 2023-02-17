// Create tables


createTables();

// Insert data
const insertOwner = (name) => {
  connection.query(
    `INSERT INTO breeder.owner (name) VALUES ("${name}")`,
    function (err, res) {
      if (err) throw err;
      console.log(res);
    }
  );
};

// insertOwner("Ram");
// insertOwner("Shyam");

const insertPets = ({ name,father_id,mother_id, breed, owner_id }) => {
  connection.query(
    `INSERT INTO pets (name,father_id,mother_id, breed, owner_id) VALUES ("${name}","${father_id}","${mother_id}", "${breed}", ${owner_id})`,
    function (err, res) {
      if (err) throw err;
      console.log(res);
    }
  );
};

// insertPets({
//   name: "Tommy",
//   father_id: 0,
//   mother_id: 0,
//   breed: "Pug",
//   owner_id: 1,
// });
// insertPets({
//   name: "Bobby",
//   father_id: 0,
//   mother_id: 0,
//   breed: "Pug",
//   owner_id: 1,
// });
// insertPets({
//   name: "Scooby",
//   father_id: 1,
//   mother_id: 2,
//   breed: "Pug",
//   owner_id: 2,
// });
// insertPets({
//   name: "Dobby",
//   father_id: 1,
//   mother_id: 2,
//   breed: "Pug",
//   owner_id: 2,
// });

// Select data
const selectOwner = (owner_id) => {
  connection.query(
    `SELECT owner.name as owner_name,pets.name as pet_name FROM owner INNER JOIN pets ON owner.id = pets.owner_id WHERE owner.id = ${owner_id}`,
    function (err, res) {
      if (err) throw err;
      console.log(res);
    }
  );
};

// selectOwner(1);
// selectOwner(2);

// Select data of pets until father_id is 0 and mother_id is 0
const selectPets = (pet_id) => {
  connection.query(
    `WITH RECURSIVE pets_path (id, name, path) AS
    (
      SELECT id, name, name as path
        FROM pets
        WHERE father_id != 0
      UNION ALL
      SELECT c.id, c.name, CONCAT(cp.path, ' > ', c.name)
        FROM pets_path AS cp JOIN pets AS c
          ON cp.id = ${pet_id}
    )
    SELECT * FROM pets_path
    ORDER BY path`,
    function (err, res) {
      if (err) throw err;
      console.log(res);
    }
  );


};

selectPets(4);

// Update data
const updateOwner = (owner_id, name) => {
  connection.query(
    `UPDATE owner SET name = "${name}" WHERE id = ${owner_id}`,
    function (err, res) {
      if (err) throw err;
      console.log(res);
    }
  );
};

// updateOwner(1, "Ramesh");

// Delete data
const deletePet = (pet_id) => {
  connection.query(
    `DELETE FROM pets WHERE id = ${pet_id}`,
    function (err, res) {
      if (err) throw err;
      console.log(res);
    }
  );
};

// deletePet(4);