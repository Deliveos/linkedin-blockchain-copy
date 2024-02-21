/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users (
  address VARCHAR(255) PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  image TEXT,
  latest_job_title VARCHAR(255) NOT NULL,
  latest_company VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS friends_requests (
  sender_address VARCHAR(255) NOT NULL,
  receiver_address VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT PK_friends_requests PRIMARY KEY (sender_address, receiver_address),
  FOREIGN KEY (sender_address) REFERENCES users(address),
  FOREIGN KEY (receiver_address) REFERENCES users(address)
);

CREATE TABLE IF NOT EXISTS friends (
  user_address VARCHAR(255) NOT NULL,
  friend_address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT PK_friends PRIMARY KEY (user_address, friend_address),
  FOREIGN KEY (user_address) REFERENCES users(address),
  FOREIGN KEY (friend_address) REFERENCES users(address)
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_address VARCHAR(255) NOT NULL,
  is_edited BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_address) REFERENCES users(address)
);