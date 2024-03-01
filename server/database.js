const pg = require('pg');

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY address ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createUser = async (request, response) => {
    const { address, name, surname, country, city, image, latest_job_title, latest_company } = request.body
    var res = await pool.query('INSERT INTO users (address, name, surname, country, city, image, latest_job_title, latest_company, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *', [address, name, surname, country, city, image, latest_job_title, latest_company])
    return response.status(201).json(res.rows[0])
}

const getUserById = async (request, response) => {
    const address = request.params.address
    const res = await pool.query('SELECT * FROM users WHERE address = $1', [address]);
    if (res.rows.length === 0) {
        return response.status(404).json({message: 'User not found'});
    }
    return response.status(200).json(res.rows[0]);
}

const updateUser = async (request, response) => {
    const address = request.params.address
    const { name, surname, country, city, image, latest_job_title, latest_company } = request.body
    const res = await pool.query('UPDATE users SET name = $1, surname = $2, country = $3, city = $4, image = $5, latest_job_title = $6, latest_company = $7 WHERE address = $8', [name, surname, country, city, image, latest_job_title, latest_company, address])
    if (res.rowCount === 0) {
        return response.status(404).json({message: 'User not found'});
    }
    return response.status(200).json(res.rows[0]);
}

const deleteUser = async (request, response) => {
  const address = request.params.address
  await pool.query('DELETE FROM users WHERE address = $1', [address])
  return response.status(200);
}

const createFriendsRequests = async (request, response) => {
  const address = request.params.address
  const { receiver_address } = request.body
  var res = await pool.query('INSERT INTO friends_requests (sender_address, receiver_address, status, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *', [address, receiver_address, 'pending'])
  return response.status(201).json(res.rows[0])
}

const getFriendsRequests = async (request, response) => {
  const address = request.params.address
  const res = await pool.query('SELECT * FROM friends_requests WHERE receiver_address = $1 AND status = $2', [address, 'pending']);
  return response.status(200).json(res.rows);
}

const updateFriendRequest = async (request, response) => {
  const address = request.params.address
  const { sender_address, status } = request.body
  const res = await pool.query('UPDATE friends_requests SET status = $1 WHERE sender_address = $2 AND receiver_address = $3', [status, sender_address, address])
  if (status === 'accepted') {
    await pool.query('INSERT INTO friends (user_address, friend_address, created_at) VALUES ($1, $2, NOW())', [sender_address, address])
    await pool.query('INSERT INTO friends (user_address, friend_address, created_at) VALUES ($1, $2, NOW())', [address, sender_address])
  }
  if (res.rowCount === 0) {
      return response.status(404).json({message: 'Friend request not found'});
  }
  return response.status(200).json(res.rows[0]);
}

const getFriends = async (request, response) => {
  const address = request.params.address
  const res = await pool.query(`
  (SELECT sender.* FROM friends_requests fr
  INNER JOIN users sender ON sender.address = fr.sender_address
  WHERE fr.receiver_address = $1 AND fr.status = 'accepted')
  
  UNION ALL
  
  (SELECT receiver.* FROM friends_requests fr
  INNER JOIN users receiver ON receiver.address = fr.receiver_address
  WHERE fr.sender_address = $1 AND fr.status = 'accepted')
  `, [address]);
  return response.status(200).json(res.rows);
}

const deleteFriend = async (request, response) => {
  const address = request.params.address
  const { friend_address } = request.body
  console.log('DELETE FROM friends WHERE user_address = $1 AND friend_address = $2', [address, friend_address]);
  console.log('DELETE FROM friends WHERE user_address = $1 AND friend_address = $2', [friend_address, address]);
  await pool.query('DELETE FROM friends WHERE user_address = $1 AND friend_address = $2', [address, friend_address])
  await pool.query('DELETE FROM friends WHERE user_address = $1 AND friend_address = $2', [friend_address, address])
  await pool.query('DELETE FROM friends_requests WHERE sender_address = $1 OR receiver_address = $1 AND sender_address = $2 OR receiver_address = $2', [address, friend_address])
  console.log('DELETE FROM friends_requests WHERE sender_address = $1 OR receiver_address = $1 AND sender_address = $2 OR receiver_address = $2', [address, friend_address])
  return response.status(200).json({message: 'Friend deleted'});
}

const getPosts = async (request, response) => {
  const results = await pool.query('SELECT * FROM posts');
  response.status(200).json(results.rows);
}

const getPostsByAddress = async (request, response) => {
  const address = request.params.address
  const results = await pool.query('SELECT * FROM posts WHERE user_address=$1', [address]);
  response.status(200).json(results.rows);
}


const createPost = async (request, response) => {
  const post = request.body;
  const res = await pool.query('INSERT INTO posts(user_address, title, content) VALUES ($1, $2, $3) RETURNING *', [post.userAddress, post.title, post.content]);
  return response.status(201).json(res.rows[0]);
}

const updatePost = async (request, response) => {
  const id = request.params.id
  const post = request.body;
  const res = await pool.query('UPDATE posts SET title=$1, content=$2 WHERE id=$3', [post.title, post.content, id]);
  return response.json(res.rows[0]);
}

const deletePost = async (request, response) => {
  const id = request.params.id
  const res = await pool.query('DELETE FROM posts WHERE id=$1', [id]);
  return response.json(res.rows[0]);
}

const addComment = async (request, response) => {
  const id = request.params.id;
  const comment = request.body;
  const res = await pool.query('INSERT INTO comments(post_id, user_address, content) VALUES ($1, $2, $3) RETURNING *', [id, comment.userAddress, comment.content])
  return response.json(res.rows[0]);
}

const getComments = async (request, response) => {
  const id = request.params.id;
  const res = await pool.query('SELECT * FROM comments WHERE post_id=$1', [id]);
  return response.json(res.rows);
}

const updateComment = async (request, response) => {
  const id = request.params.id;
  const content = request.body;
  const res = await pool.query('UPDATE comments SET content=$2 WHERE id=$1 RETURNING *', [id, content.content]);
  return response.json(res.rows[0]);
}

const deleteComment = async (request, response) => {
  const id = request.params.id;
  const res = await pool.query('DELETE FROM comments WHERE id=$1 RETURNING *', [id]);
  return response.json(res.rows[0]);
}

const addLike = async (request, response) => {
  const id = request.params.id;
  const like = request.body;
  const res = await pool.query('INSERT INTO likes(post_id, user_address) VALUES ($1, $2) RETURNING *', [id, like.userAddress])
  return response.json(res.rows[0]);
}

const getLikes = async (request, response) => {
  const id = request.params.id;
  const res = await pool.query('SELECT * FROM likes WHERE post_id=$1', [id]);
  return response.json(res.rows);
}

const deleteLike = async (request, response) => {
  const id = request.params.id;
  const like = request.body;
  const res = await pool.query('DELETE FROM likes WHERE post_id=$1 AND user_address=$2', [id, like.userAddress]);
  return response.json(res.rows[0]);
}

module.exports = {
    pool,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createFriendsRequests,
    getFriendsRequests,
    updateFriendRequest,
    getFriends,
    deleteFriend,
    getPosts,
    getPostsByAddress,
    createPost,
    updatePost,
    deletePost,
    addComment,
    getComments,
    updateComment,
    deleteComment,
    addLike,
    deleteLike,
    getLikes
};