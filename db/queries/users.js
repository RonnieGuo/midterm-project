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


const getUserResources = function (user_id, limit = 10) {
  const query = `
    SELECT
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
    ORDER BY resources.id
    LIMIT $2;

    UNION ALL

    SELECT
      'liked' AS source,
      resources.id,
      resources.title,
      resources.description,
      resources.url,
      resources.category,
      COUNT(likes.id) AS likes_count,
      COUNT(comments.id) AS comments_count

    FROM resources
    JOIN likes ON resources.id = likes.resource_id
    LEFT JOIN comments ON resources.id = comments.resource_id
    WHERE likes.user_id = $1
    GROUP BY resources.id
    ORDER BY resources.id
    LIMIT $2;
  `;
  const values = [user_id, limit];

  return db.query(query, values)
    .then(result => result.rows)
    .catch(err => {
      console.error(err.message);
      throw err;
    });
};


//Add resource to database//

const addResource = function (newResource, user) {
  getUserWithId(user)
  .then((rows) => {
    const userId = rows[0].id;
    return userId;
  })
  .then((userId) => {
   newResource.user_id = userId;
   const query = `
   INSERT INTO resources (newResource)
   VALUES ($1)
   RETURNING *;
 `;
  const values = [newResource];
  return db.query(query, values)
    .then(result => result.rows[0])
    .catch(err => {
      console.error(err.message);
      throw err;
    });
  });
};

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

module.exports = {
  getUsers,
  getUserWithEmail,
  getUserWithId,
  addUser,
  getUserResources,
  addResource,
  comment,
  like,
};

