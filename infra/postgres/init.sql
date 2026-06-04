-- English Web — PostgreSQL initialisation
-- Runs once when the container is first created.

\c postgres

CREATE DATABASE englishweb_auth;
CREATE DATABASE englishweb_users;
CREATE DATABASE englishweb_content;
CREATE DATABASE englishweb_ai;
CREATE DATABASE englishweb_gamification;

-- Grant all privileges to the main user
GRANT ALL PRIVILEGES ON DATABASE englishweb_auth         TO englishweb;
GRANT ALL PRIVILEGES ON DATABASE englishweb_users        TO englishweb;
GRANT ALL PRIVILEGES ON DATABASE englishweb_content      TO englishweb;
GRANT ALL PRIVILEGES ON DATABASE englishweb_ai           TO englishweb;
GRANT ALL PRIVILEGES ON DATABASE englishweb_gamification TO englishweb;

-- Enable uuid-ossp and pgcrypto on each DB
\c englishweb_auth
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

\c englishweb_users
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

\c englishweb_content
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

\c englishweb_ai
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

\c englishweb_gamification
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
