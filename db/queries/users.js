const { query } = require('express');
const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

//Get a single user from the database given their email.

const getUserWithEmail = function (email) {
  const query = 'SELECT * from users WHERE LOWER(email) = LOWER($1)';
  const values = [email];
  return db.query(query, values)
    .then(result => {
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      console.log(err.message);
    });
};

//Get a single user from the database given their id.
const getUserWithId = function (id) {
  const query = 'SELECT * from users WHERE id = $1';
  const values = [id];

  return db.query(query, values)
    .then(result => {
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      console.log(err.message);
    })
};


//Add a new user to the database.
const addUser = function (user) {
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;
  const values = [user.username, user.email, user.password];

  return db.query(query, values)
    .then(result => {
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw Error('User insertion failed.');
      }
    })
    .catch(err => {
      console.log(err.message);
    });
};



//users should be able to view all their own and all liked resources on one page ("My resources")


const getUserResources = function (user_id) {

  // // const field = ['resources.id', 'title', 'url', 'description', 'topic']
  // const query = `SELECT id, title, url, description, category FROM resources
  //  `;
  //  db.query()
  //  .then((resources) => {
  //   const allResources = resources;
  //   allResources.forEach(element => {
  //     element.likes = 0;
  //   });
  //  })
  //  .then(() => {
  //   const query2 = `SELECT resources.id FROM resources
  //   JOIN likes
  //   ON likes.resource_id = resources.id
  //   GROUP BY resources.id
  //   COUNT *;
  //   `;
  //   db.query2()
  //   .then((rows) => {
  //     allResources.forEach((resource) => {
  //       rows.forEach((row) => {
  //         if(resource.id === row.id) {
  //           resource.likes = row.count;
  //         }
  //       })
  //     })
  //   })
  //  })
  //  .then(() => {
  //   allResources.forEach((resource) => {
  //     resource.img = randomImage();
  //   })
  //   callback(allResources);
  // })
// }
  const values = [user_id];
  const query  = `SELECT
  'own' AS source,
  resources.id,
  resources.title,
  resources.description,
  resources.url,
  resources.category,
  COUNT(likes.id) AS likes_count,
  COUNT(comments.id) AS comments_count
FROM resources
LEFT JOIN likes ON resources.id = likes.resource_id
LEFT JOIN comments ON resources.id = comments.resource_id
WHERE resources.user_id = $1
GROUP BY resources.id
ORDER BY resources.id;`
  return db.query(query, values)
    .then(result => result.rows)
    .catch(err => {
      console.error(err.message);
      throw err;
    });
};


//Add resource to database//

const addResource = function (newResource, user) {
  return getUserWithId(user)
    .then((rows) => {
      if (!rows || rows.length === 0) {
        throw new Error("User not found or empty rows");
      }
      const userId = rows.id;
      newResource.user_id = userId;
      const query = `
        INSERT INTO resources (title, description, url, category, user_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const values = [newResource.title, newResource.description, newResource.url, newResource.category, userId];
      return db.query(query, values)
        .then(result => result.rows[0])
        .catch(err => {
          console.error(err.message);
          throw err;
        });
    })
    .catch(err => {
      console.error(err.message);
      throw err;
    });
};
// const addResource = function (newResource, user) {
//   console.log('function', getUserWithId(user));
//   getUserWithId(user)
//   .then((rows) => {
//     // console.log('rows', rows);
//     const userId = rows[0].id;
//     return userId;
//   })
//   .then((userId) => {
//    newResource.user_id = userId;
//    const query = `
//    INSERT INTO resources (newResource)
//    VALUES ($1)
//    RETURNING *;
//  `;
//   const values = [newResource];
//   return db.query(query, values)
//     .then(result => result.rows[0])
//     .catch(err => {
//       console.error(err.message);
//       throw err;
//     });
//   });
// };

//search



//add comments to resource

const comment = function(userId, resourceId, text, rating) {
  const query = `INSERT INTO comments (userId, resourceId, text, rating)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;
  const values = [userId, resourceId, text, rating];
  return db.query(query, values)
  .then(result => result.rows[0])
  .catch(err => {
    console.error(err.message);
    throw err;
  });
};

//like posts
const like = function (userId, resourceId) {
  const query = `INSERT INTO likes (userId, resourceId)
  VALUES ($1, $2)
  RETURNING *;
  `;
  const values = [userId, resourceId];
  return db.query(query, values)
  .then(result => result.rows[0])
  .catch(err => {
    console.error(err.message);
    throw err;
  });
}

// get user profile page

const getUser = function(user_id) {
  // console.log('user', user);
    const query = `SELECT * FROM users
    WHERE id = $1
    LIMIT 1;
    `;
    const values = [user_id];
    return db.query(query, values)
    .then(result => result.rows[0])
    .catch(err => {
      console.error(err.message);
      throw err;
    });
}

//update user profile

const updateUser = function(updatedUserInfo) {
  const query = `UPDATE users
  SET username = $1, email = $2, password = $3
  WHERE id = $4;
  `;
  const values = [updatedUserInfo.username, updatedUserInfo.email, updatedUserInfo.password, updatedUserInfo.id];
  return db.query(query, values);
}


// //Update UserInformation

// const updateUser = function (userId, newUsername, newEmail, newPassword) {
//   const query = `
//     UPDATE users
//     SET username = $2, email = $3, password = $4
//     WHERE id = $1;
//   `;
//   const values = [userId, newUsername, newEmail, newPassword];

//   return db.query(query, values)
//     .then(result => {
//       if (result.rowCount === 1) {
//         return "User information updated successfully.";
//       } else {
//         throw new Error("Update failed.");
//       }
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
// };

//Search Resources

const searchResources = function (keyword) {
  const query = `
    SELECT id, title, description
    FROM resources
    WHERE title ILIKE '%' || $1 || '%' OR description ILIKE '%' || $1 || '%';
  `;
  const values = [keyword];

  return db.query(query, values)
    .then((result) => {
      return result.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
};


module.exports = {
  getUsers,
  getUserWithEmail,
  getUserWithId,
  addUser,
  getUserResources,
  addResource,
  searchResources,
  comment,
  like,
  getUser,
  updateUser,
  searchResources,
};

