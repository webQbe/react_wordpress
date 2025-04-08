# React with Wordpress REST API
- You can use Wordpress as a **CMS** for your clients
- Use a **React Single Page Appication** on the frontend and connect it to the **Wordpress REST API**
- You can access all the resources Wordpress offers such as:
    - **Custom Post Types**
    - **JWT Authentication**
- Setting up Wordpress and MySQL in **Docker Containers**



## Getting Started


### 1. Set Up Wordpress on Docker in VSCode
1. Create and open a new project folder:
    ```
    mkdir react_wordpress
    cd react_wordpress
    ```
2. Create `react_wordpress/docker-compose.yml` file:
    ```
        version: '3.8'

        services:
        wordpress:
            image: wordpress:latest
            ports:
            - "8000:80"
            environment:
            WORDPRESS_DB_HOST: db
            WORDPRESS_DB_USER: wordpress
            WORDPRESS_DB_PASSWORD: wordpress
            WORDPRESS_DB_NAME: wordpress
            volumes:
            - wordpress_data:/var/www/html

        db:
            image: mysql:5.7
            environment:
            MYSQL_DATABASE: wordpress
            MYSQL_USER: wordpress
            MYSQL_PASSWORD: wordpress
            MYSQL_ROOT_PASSWORD: root
            volumes:
            - db_data:/var/lib/mysql

        volumes:
        wordpress_data:
        db_data:
    ```
3. Remove any old Docker versions (optional but recommended):
    ```
    sudo apt remove docker docker-engine docker.io containerd runc
    ```
4. Set up Docker’s official repository:
    ```
    sudo apt update
    sudo apt install \
        ca-certificates \
        curl \
        gnupg \
        lsb-release
    ```
5. Add Docker’s GPG key:
    ```
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
        sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    ```
6. Add the Docker APT repo:
    ```
    echo \
    "deb [arch=$(dpkg --print-architecture) \
    signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```
7. Update your package list: 
    ```
    sudo apt update
    ```
8. Install Docker Engine + Compose plugin:
    ```
    sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```
9. Confirm installation: 
    ```
    docker compose version
    ```
10. Run the stack:
    ```
    docker compose up -d
    ```

### 2. Install Wordpress Plugins
- Install and Activate 
    1. **JWT Authentication for WP REST API** by *tmeister*
    2. **Custom Post Type UI** by *webdevstudios*
    3. **Advanced Custom Fields (ACF)** by *WP Engine*
    4. **ACF to REST API** by *airesvsg*


### 3. Configure Wordpress
1. Run Docker: 
    ```
    docker compose up -d
    ```

2. Open WordPress installation in your browser: `http://localhost:8000/wp-admin/install.php`

    1. Add **Site Title** *(Book Reviews)*, **Username**, **Password**, Check **Confirm password**, **Your Email** *(test@test.com)*
    2. Click **Install Wordpress**
    3. Log in to Wordpress
    4. Open **Settings** (sidebar menu) > **Permalink Settings** > Select **Post name** option

3. Open `.htaccess` file on VS Code:
    1. Go to **Docker Extension** > **CONTAINERS** > `react_wordpress` > `wordpress:latest...` > `Files` > `var` > `www` > `html` > Open `.htaccess` file

    2. Add this inside the `.htaccess` file, after the default WordPress rules (above `# END JWT Auth`):
        ```
        RewriteCond %{HTTP:Authorization} ^(.*)
        RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
        SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
        ```
4. Open `wp-config.php` file from the same location
    1. Add following two lines above this `/* That's all, stop editing! Happy publishing. */` comment:
        ```
        define('JWT_AUTH_SECRET_KEY', 'your-long-random-secret-key');
        define('JWT_AUTH_CORS_ENABLE', true);
        ```
    2. Open `https://api.wordpress.org/secret-key/1.1/salt/` in the browser to generate a random secret key for `JWT_AUTH_SECRET_KEY` 

5. Restart Docker:
    - Stop:
        ```
        docker compose down
        ```
    - Start:
        ```
        docker compose up -d
        ```
    
### 4. Add a new post type
1. See the list created posts: 
    1. Open `http://localhost:8000/wp-admin/` 
    2. Open **Posts** from the sidebar menu
    
2. Add a new post type:
    1. Open **CPT UI** > **Add/Edit Post Types** from the sidebar menu
    2. Add **Post Type Slug** *(books)*
    3. Add **Plural Label** *(Books)*
    4. Add **Singular Label** *(Book)*
    5. Add **REST API base slug** *(books)*
    6. In **Supports** section: Check **Excerpt** and **Author**
    7. Open **Books** from the sidebar menu > **Add new Book**
    8. Add book title, description, excerpt, and featured image > **Publish**

### 5. Add a new field group
1. Open **ACF** > **Field Groups** from the sidebar menu 
2. Click **Add New** > **Add New Field Group** > `Books`
3. **Settings** > **Location Rules** > **Show this field group if** > **Post Type** > **is equal to** > ***`Book`***
4. Click **Add Field** > **Field Label** > **`Publisher`** > **Save Changes**
5. Open **Book One** you created > Go to **Publisher** field > Enter `publisher name` > **Save**


### 6. Test API Requests with Thunder Client

1. Install **Thunder Client** VS Code extension 
2. Send a GET request to `http://localhost:8000/wp-json`
3. Check for the response with site name

#### Fetch posts
1. Send a GET request to `http://localhost:8000/wp-json/wp/v2/posts`
2. Check for response array of posts with unique id

#### Fetch users
1. Send a GET request to `http://localhost:8000/wp-json/wp/v2/users/1`
2. Check response with your user data

#### Fetch books
1. Send a GET request to `http://localhost:8000/wp-json/wp/v2/books`
2. Check response object with the book data
3. Limit results to 1 book per page: 
    1. Send a GET request to `http://localhost:8000/wp-json/wp/v2/books?per_page=1`
    2. Check for one item in the response
4. Fetch book by id:
    1. Send a GET request to `http://localhost:8000/wp-json/wp/v2/books/8`
    2. Check for the item with the id in the response
    3. Check for newly added publisher field 



#### Get a JWT Token
1. Send a POST request to `http://localhost:8000/wp-json/jwt-auth/v1/token`
2. Add a **HTTP Header**: Set key `Content-Type` and value `application/json`
3. Add request **Body**: 
    ```
        {
            "username": "your_username",
            "password": "your_password"
        }
    ```
4. Check the response object with a token string

#### Add a new post
1. Get a JWT token
2. Send a POST request to `http://localhost:8000/wp-json/wp/v2/posts`
3. Add a **HTTP Headers**:
    1. Set key `Content-Type` and value `application/json`
    2. Set key `Authorization` and value `Bearer 'jwt_token_string_from_the_response'`
    3. Add request **Body**: 
        ```
            {
                "title": "Post One",
                "content": "This is post one",
                "status": "publish"
            }
        ```
4. Check for **201 Created** response 


### 7. Create React App

1. Download and Install **Node.js**
2. Open project folder in VSCode Integrated Terminal
3. Install Vite on terminal:
    - Run `npm create vite@latest .`
    - Select `React` & Enter
    - Select `JavaScript` & Enter
4. Update `vite.config.js` file:
    - Add `server: { port: 3000, }` in `defineConfig()`
5. Install dependencies:
    - Open terminal and run `npm install`
6. Delete: `public/vite.svg`, `src/assets`, `src/index.css`
    1. Remove `import './index.css'` from `src/main.jsx`
    2. Modify `src/App.jsx` and Remove:
        ```
        import reactLogo from './assets/react.svg'
        import viteLogo from '/vite.svg'
        ```
    3. Clear contents in `src/App.css`

7. Install NPM packages : 
    ```
    npm i axios react-router-dom prop-types
    ```
8. Start Development Server: 
    ```
    npm run dev 
    ```
