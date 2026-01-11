# Deployment (local IIS)

-   **Make sure CGI feature is enabled for Flask API**
    ![CGI feature enable screenshot](/assets/deployment/01-cgi-feature.png)
-   **Add host** <code>C:\Windows\System32\drivers\etc</code>
    ![Update host name screenshot](/assets/deployment/02-host.png)
-   **IIS Setup**
    ![IIS setup screenshot](/assets/deployment/03-iis-setup.png)
    ![App pool screenshot](/assets/deployment/04-app-pool.png)
-   **Self-signed cert** (optional)
    Update site name or validity period, and run powershell script <code>CreateSelfSignedLocalCert.ps1</code>

## Install CGI package

<code>pip install wfastcgi</code><br/>
<code>wfastcgi-enable</code>

## API

-   Add <code>TITANIC_API_KEY</code> in environment variable
-   Create and activate virtual environment <br/>
    <code>python -m venv venv</code><br/>
    <code>venv\Scripts\activate</code>
-   For web.config sample, refer to <code>deployment-package\api\web.config</code>

## Web UI

-   For web.config sample, refer to <code>deployment-package\app\web.config</code>
