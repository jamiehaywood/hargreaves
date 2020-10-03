# <span style="color:#0F1A48"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Hargreaves_Lansdown_logo.svg/1280px-Hargreaves_Lansdown_logo.svg.png" height="22" /> UNOFFICIAL API ![](https://github.com/jamiehaywood/hl/workflows/build/badge.svg)</span>

### <span style="color:#0F1A48">This is an unofficial API to programatically access your Hargreaves Lansdown account.</span>

## <div style="color:#0F1A48">Motivation</div>

<div style="color:#0F1A48"> I wanted to programmatically access my ISA and share accounts with Hargreaves Lansdown, and they do not currently offer a developer API. This project spins up an endpoint that allows you to access your accounts in under 3 seconds</div>

## <div style="color:#0F1A48"> Quick Start </div>

Step 1:
`git clone https://github.com/jamiehaywood/hl.git`

Step 2: `npm install`

Step 3: `npm run build`

Step 4: `npm start`

Step 5: Open [Postman](https://www.getpostman.com/downloads/), and **`POST`** to `localhost:3000/` including the following in a `x-www-form-urlencoded` body:

`username`:**`<yourHLusername>`**<br/>
`password`:**`<yourHLpassword>`**<br/>
`secureNumber`:**`<yourHLsecureNumber>`** <br/>
`dateOfBirth`:**`<yourDOB>`**

## <div style="color:#0F1A48"> Future Updates </div>

I am currently working on being able to query the accounts in more depth, right down to the individual holdings, and be able to programmatically buy and sell holdings...watch this space...

## <div style="color:#0F1A48"> Contributing </div>

Please feel free to fork, contribute, rewrite etc.
