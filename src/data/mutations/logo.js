import AWS from 'aws-sdk';
import LogoType from '../types/LogoType';
import { auth } from '../../config';

const bucketName = 'dudetruck-logos';
const bucketRegion = 'us-west-1';

const rotateArray = (arr, count) => {
  arr.push(...arr.splice(0, arr.length * Math.floor(count / arr.length)));
  return arr;
};

const mangleName = str => {
  let newStr = '';
  const cleanStr = str.replace(/-/g, '');
  for (let i = 0; i < cleanStr.length; i += 1) {
    let strCode = cleanStr[i].charCodeAt(0);
    if (strCode >= 48 && strCode <= 51) {
      strCode += 6;
    } else if (strCode >= 54 && strCode <= 57) {
      strCode += 43;
    } else if (strCode >= 97 && strCode <= 102) {
      strCode -= 49;
    } else {
      continue; // eslint-disable-line no-continue
    }
    newStr += String.fromCharCode(strCode);
  }
  return rotateArray(newStr.split(''), 12).join('');
};

function upload(root, args, user) {
  if (!root.request.file) {
    console.log('No file selected for S3 upload.'); // eslint-disable-line no-console
    return null;
  }

  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = auth.aws.accessKeyId;
  AWS.config.secretAccessKey = auth.aws.secretAccessKey;
  AWS.config.region = bucketRegion;
  const s3 = new AWS.S3({
    params: {
      Bucket: bucketName,
    },
  });

  const fileExt = root.request.file.originalname.substr(
    root.request.file.originalname.length - 4,
  );
  const params = {
    Key: `logos/${mangleName(user.id)}${fileExt}`,
    Body: root.request.file.buffer,
    ACL: 'public-read',
    'Content-Type': root.request.file.mimetype,
  };

  const s3UploadPromise = new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

  return s3UploadPromise
    .then(data => ({ logo: data.Location }))
    .catch(error => {
      console.log('S3 Upload Error: ', error); // eslint-disable-line no-console
      return null;
    });
}

const logo = {
  type: LogoType,
  resolve: (root, args, { user }) => upload(root, args, user),
};

export default logo;
