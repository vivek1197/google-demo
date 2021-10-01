const fs = require("fs");
const { google } = require("googleapis");
const KEY_FILE_PATH = "./foodie.json";
const SCOPES = ["https://www.googleapis.com/auth/drive"];

exports.createAndUploadFile = async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE_PATH,
      scopes: SCOPES,
    });
    const driveService = google.drive({ version: "v3", auth });

    let fileMetaData = {
      name: req.body.name,
      parents: ["17_JCU2kY286eOna3DWlXguvJGjK3SpFc"],
      //here parents is the id of folder that is shared with google service account
      // and id can be found by list down all folder in service account
      // service account is treat as own google drive account
      //first create any folder on personal google drive
      //now share it with google service account email.email can be found at service credential jspn file
      //list all folder using code and pick id of shared folder

      //Note google service account not have user interface hence if we want to see content in serviec account
      //then share folder with service account and upload file in it
    };

    let media = {
      MimeType: "image/png",
      body: fs.createReadStream(req.body.img_path),
    };

    let response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      fields: "id",
    });

    // here we only fetching id of uploaded image but we can get other info also just change fields:'*'
    //after we got id then to use it, as image hosted on server,
    // we can find it by id refer below url and replace xxx with id of uploaded image
    //  https://drive.google.com/uc?export=view&id=XXX

    switch (response.status) {
      case 200:
        console.log(response);
        res.status(200).json({
          id: response.data.id,
          link: `https://drive.google.com/uc?export=view&id=${response.data.id}`,
        });
        break;
    }
  } catch (e) {
    res.status(500).json({ data: e });
    console.log(e);
  }
};

//following is code for show list of images in service  account
//************************************************************************************************************************* */

// const { google } = require('googleapis');
// const fs = require('fs');
// const key = require('./foodie.json');

// const drive = google.drive('v3');
// const jwtClient = new google.auth.JWT(
//     key.client_email,
//     null,
//     key.private_key,
//     ['https://www.googleapis.com/auth/drive'],
//     null
// );

// jwtClient.authorize((authErr) => {
//     if (authErr) {
//         console.log(authErr);
//         return;
//     }

//     // Make an authorized requests

//     // List Drive files.
//     drive.files.list({ auth: jwtClient }, (listErr, resp) => {
//         if (listErr) {
//             console.log(listErr);
//             return;
//         }
//         console.log(resp.data.files);

//         resp.data.files.forEach((file) => {
//             console.log(`${file.name} (${file.mimeType})`);
//         });
//     });
// });
